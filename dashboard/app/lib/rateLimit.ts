/**
 * In-memory rate limiter for Next.js API routes (Vercel serverless compatible).
 *
 * Uses a sliding window counter per IP address. On Vercel, each serverless function
 * invocation may use a different instance, so this provides best-effort rate limiting.
 * For strict enforcement at scale, use a Redis-backed solution (e.g., Upstash).
 *
 * OWASP Reference: https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html
 */

import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitConfig {
  /** Time window in milliseconds (default: 60000 = 1 minute) */
  windowMs?: number;
  /** Max requests per window per IP (default: 30) */
  maxRequests?: number;
  /** Custom message for 429 response */
  message?: string;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

/**
 * Creates a rate limiter function. Each call to rateLimit() creates an independent
 * limiter with its own store and configuration.
 *
 * @example
 * const limiter = rateLimit({ windowMs: 60_000, maxRequests: 5 });
 *
 * export async function POST(req: NextRequest) {
 *   const blocked = limiter(req);
 *   if (blocked) return blocked; // Returns 429 NextResponse
 *   // ... handle request
 * }
 */
export function rateLimit(config: RateLimitConfig = {}) {
  const {
    windowMs = 60_000,
    maxRequests = 30,
    message = 'Too many requests. Please try again later.',
  } = config;

  const id = `limiter_${Date.now()}_${Math.random()}`;
  stores.set(id, new Map<string, RateLimitEntry>());

  // Periodic cleanup to prevent memory leaks (every 5 minutes)
  const cleanupInterval = setInterval(() => {
    const store = stores.get(id);
    if (!store) return;
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetTime) {
        store.delete(key);
      }
    }
  }, 5 * 60_000);

  // Ensure cleanup interval doesn't prevent process exit
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return function checkRateLimit(req: NextRequest): NextResponse | null {
    const store = stores.get(id);
    if (!store) return null;

    // Extract client IP — Vercel provides x-forwarded-for, fallback to x-real-ip
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() ||
               req.headers.get('x-real-ip') ||
               'unknown';

    const now = Date.now();
    const entry = store.get(ip);

    if (!entry || now > entry.resetTime) {
      // New window
      store.set(ip, { count: 1, resetTime: now + windowMs });
      return null; // Allowed
    }

    entry.count++;

    if (entry.count > maxRequests) {
      const retryAfterMs = entry.resetTime - now;
      const retryAfterSec = Math.ceil(retryAfterMs / 1000);

      return NextResponse.json(
        {
          error: message,
          retryAfter: retryAfterSec,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSec),
            'X-RateLimit-Limit': String(maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(entry.resetTime / 1000)),
          },
        }
      );
    }

    return null; // Allowed
  };
}
