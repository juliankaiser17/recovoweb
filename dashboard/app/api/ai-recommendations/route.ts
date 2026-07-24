import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../lib/rateLimit';

export const dynamic = 'force-dynamic';

// ─── Rate Limiter: 5 requests per minute per IP ─────────────────────────────
const limiter = rateLimit({ windowMs: 60_000, maxRequests: 5 });

// ─── Input Validation ────────────────────────────────────────────────────────

const MAX_BODY_SIZE = 10_000; // 10 KB max
const ALLOWED_FIELDS = new Set(['profile', 'dailyStatus', 'workouts', 'injuries']);

function sanitizeString(val: unknown, maxLen: number = 200): string {
  if (typeof val !== 'string') return '';
  // Strip control characters, trim, and truncate
  return val.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLen);
}

function validateRequestBody(body: Record<string, unknown>): string | null {
  // Reject unexpected top-level fields
  for (const key of Object.keys(body)) {
    if (!ALLOWED_FIELDS.has(key)) {
      return `Unexpected field: ${key}`;
    }
  }

  // Validate profile shape if present
  if (body.profile && typeof body.profile !== 'object') {
    return 'profile must be an object';
  }

  // Validate arrays
  for (const field of ['dailyStatus', 'workouts', 'injuries'] as const) {
    if (body[field] !== undefined && !Array.isArray(body[field])) {
      return `${field} must be an array`;
    }
    if (Array.isArray(body[field]) && (body[field] as unknown[]).length > 100) {
      return `${field} exceeds maximum length of 100`;
    }
  }

  return null; // Valid
}

// ─── Route Handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimitResult = limiter(req);
  if (rateLimitResult) return rateLimitResult;

  try {
    // Check Content-Length before parsing
    const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Request body too large. Maximum 10KB allowed.' },
        { status: 413 }
      );
    }

    const body = await req.json();

    // Validate request body schema
    const validationError = validateRequestBody(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { profile, dailyStatus, workouts, injuries } = body;

    // ─── Check for Gemini API Key ────────────────────────────────────────────
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY environment variable is not set.');
      return NextResponse.json(
        { error: 'AI service is not configured. Please set GEMINI_API_KEY.' },
        { status: 503 }
      );
    }

    // ─── Build Sanitized Prompt ──────────────────────────────────────────────
    const sport = sanitizeString(profile?.sport, 50) || 'Unknown';
    const weight = typeof profile?.weight === 'number' ? Math.min(Math.max(profile.weight, 20), 500) : 'Unknown';
    const trainingFreq = typeof profile?.trainingFreq === 'number' ? Math.min(profile.trainingFreq, 14) : 'Unknown';
    const sleepHours = typeof profile?.sleepHours === 'number' ? Math.min(profile.sleepHours, 24) : 'Unknown';

    const latestStatus = Array.isArray(dailyStatus) ? dailyStatus[0] : null;
    const mood = typeof latestStatus?.mood === 'number' ? Math.min(Math.max(latestStatus.mood, 1), 5) : 'N/A';
    const energy = typeof latestStatus?.energy === 'number' ? Math.min(Math.max(latestStatus.energy, 1), 5) : 'N/A';
    const stress = typeof latestStatus?.stress === 'number' ? Math.min(Math.max(latestStatus.stress, 1), 5) : 'N/A';

    const activeInjuries = Array.isArray(injuries)
      ? injuries
          .filter((i: any) => i && typeof i.bodyPart === 'string')
          .map((i: any) => sanitizeString(i.bodyPart, 50))
          .slice(0, 20)
      : [];

    const prompt = `Act as an elite sports scientist and medical advisor for athletes.

Athlete Profile:
- Sport: ${sport}
- Weight: ${weight} kg
- Training Frequency: ${trainingFreq} times/week
- Average Sleep: ${sleepHours} hours

Recent Status:
- Mood: ${mood}/5
- Energy: ${energy}/5
- Stress: ${stress}/5

Active Injuries: ${activeInjuries.length > 0 ? activeInjuries.join(', ') : 'None'}

Based on this data, provide a structured JSON response with exactly these fields:
{
  "shouldRest": boolean,
  "restReason": "string (why they should rest, or empty if they shouldn't)",
  "recoveryPlan": "string (actionable recovery advice like stretching, icing)",
  "medicalAdvice": "string (whether they need to see a doctor for their injuries)"
}

Respond ONLY with valid JSON. No markdown, no code blocks, no explanations.`;

    // ─── Call Gemini API ─────────────────────────────────────────────────────
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errBody = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errBody);
      return NextResponse.json(
        { error: 'AI service returned an error. Please try again.' },
        { status: 502 }
      );
    }

    const geminiData = await geminiResponse.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { error: 'AI service returned an empty response.' },
        { status: 502 }
      );
    }

    // Parse and validate the AI response
    const recommendation = JSON.parse(rawText);

    // Ensure expected shape
    const safeRecommendation = {
      shouldRest: typeof recommendation.shouldRest === 'boolean' ? recommendation.shouldRest : false,
      restReason: sanitizeString(recommendation.restReason, 500),
      recoveryPlan: sanitizeString(recommendation.recoveryPlan, 1000),
      medicalAdvice: sanitizeString(recommendation.medicalAdvice, 500),
    };

    return NextResponse.json(safeRecommendation);
  } catch (error: any) {
    console.error('AI API Error:', error?.message || error);
    return NextResponse.json(
      { error: 'Internal server error processing AI request.' },
      { status: 500 }
    );
  }
}
