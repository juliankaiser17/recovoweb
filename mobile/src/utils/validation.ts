/**
 * Input Validation & Sanitization Module
 * ─────────────────────────────────────────────────────────────────────────────
 * Schema-based validation for all data written to Firebase.
 * Follows OWASP Input Validation Cheat Sheet best practices.
 *
 * Every validate* function returns { valid: true } on success,
 * or { valid: false, error: string } describing the first violation.
 */

// ─── Sanitization Helpers ────────────────────────────────────────────────────

/** Strip control characters, trim whitespace, and enforce max length */
export function sanitizeString(val: unknown, maxLength: number = 200): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control chars
    .replace(/<[^>]*>/g, '')          // Strip HTML tags
    .trim()
    .slice(0, maxLength);
}

/** Sanitize free-text notes (longer strings, HTML stripped) */
export function sanitizeNotes(val: unknown): string {
  return sanitizeString(val, 1000);
}

/** Validate that a value is a number within a range */
function isNumberInRange(val: unknown, min: number, max: number): val is number {
  return typeof val === 'number' && !isNaN(val) && val >= min && val <= max;
}

/** Validate that a value is one of the allowed enum values */
function isEnum<T extends string>(val: unknown, allowed: readonly T[]): val is T {
  return typeof val === 'string' && (allowed as readonly string[]).includes(val);
}

// ─── Validation Result Type ──────────────────────────────────────────────────

export type ValidationResult =
  | { valid: true }
  | { valid: false; error: string };

// ─── User Profile Validation ─────────────────────────────────────────────────

const VALID_ROLES = ['athlete', 'coach'] as const;

export function validateUserProfile(data: Record<string, unknown>): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Profile data must be an object' };
  }

  // Required fields
  if (typeof data.email !== 'string' || data.email.length === 0) {
    return { valid: false, error: 'Email is required' };
  }
  if (data.email.length > 254) {
    return { valid: false, error: 'Email exceeds maximum length (254 chars)' };
  }
  // Basic email format check (RFC 5322 simplified)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (typeof data.name !== 'string' || data.name.length === 0) {
    return { valid: false, error: 'Name is required' };
  }
  if (data.name.length > 100) {
    return { valid: false, error: 'Name exceeds maximum length (100 chars)' };
  }

  if (!isEnum(data.role, VALID_ROLES)) {
    return { valid: false, error: 'Role must be "athlete" or "coach"' };
  }

  // Optional fields with constraints
  if (data.weight !== undefined && !isNumberInRange(data.weight, 20, 500)) {
    return { valid: false, error: 'Weight must be between 20 and 500 kg' };
  }

  if (data.sport !== undefined && typeof data.sport === 'string' && data.sport.length > 50) {
    return { valid: false, error: 'Sport name exceeds maximum length (50 chars)' };
  }

  return { valid: true };
}

// ─── Daily Status Validation ─────────────────────────────────────────────────

export function validateDailyStatus(data: Record<string, unknown>): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Daily status data must be an object' };
  }

  if (!isNumberInRange(data.mood, 1, 5)) {
    return { valid: false, error: 'Mood must be between 1 and 5' };
  }
  if (!isNumberInRange(data.energy, 1, 5)) {
    return { valid: false, error: 'Energy must be between 1 and 5' };
  }
  if (!isNumberInRange(data.stress, 1, 5)) {
    return { valid: false, error: 'Stress must be between 1 and 5' };
  }
  if (!isNumberInRange(data.sleepQuality, 1, 5)) {
    return { valid: false, error: 'Sleep quality must be between 1 and 5' };
  }

  if (data.notes !== undefined && typeof data.notes === 'string' && data.notes.length > 1000) {
    return { valid: false, error: 'Notes exceed maximum length (1000 chars)' };
  }

  return { valid: true };
}

// ─── Recovery Entry Validation ───────────────────────────────────────────────

export function validateRecoveryEntry(data: Record<string, unknown>): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Recovery data must be an object' };
  }

  if (!isNumberInRange(data.hrv, 0, 300)) {
    return { valid: false, error: 'HRV must be between 0 and 300 ms' };
  }
  if (!isNumberInRange(data.rhr, 20, 250)) {
    return { valid: false, error: 'Resting heart rate must be between 20 and 250 bpm' };
  }
  if (!isNumberInRange(data.sleepHours, 0, 24)) {
    return { valid: false, error: 'Sleep hours must be between 0 and 24' };
  }
  if (!isNumberInRange(data.sleepQuality, 0, 100)) {
    return { valid: false, error: 'Sleep quality must be between 0 and 100' };
  }
  if (!isNumberInRange(data.recoveryScore, 0, 100)) {
    return { valid: false, error: 'Recovery score must be between 0 and 100' };
  }
  if (!isNumberInRange(data.painScore, 0, 100)) {
    return { valid: false, error: 'Pain score must be between 0 and 100' };
  }

  return { valid: true };
}

// ─── Pain Marker (Injury) Validation ─────────────────────────────────────────

const VALID_PAIN_TYPES = ['sharp', 'dull', 'burning', 'aching'] as const;
const VALID_SIDES = ['left', 'right', 'center'] as const;

export function validatePainMarker(data: Record<string, unknown>): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Pain marker data must be an object' };
  }

  if (typeof data.bodyPart !== 'string' || data.bodyPart.length === 0) {
    return { valid: false, error: 'Body part is required' };
  }
  if (data.bodyPart.length > 100) {
    return { valid: false, error: 'Body part name exceeds maximum length (100 chars)' };
  }

  if (!isEnum(data.painType, VALID_PAIN_TYPES)) {
    return { valid: false, error: 'Pain type must be sharp, dull, burning, or aching' };
  }

  if (!isEnum(data.side, VALID_SIDES)) {
    return { valid: false, error: 'Side must be left, right, or center' };
  }

  if (!isNumberInRange(data.intensity, 1, 10)) {
    return { valid: false, error: 'Intensity must be between 1 and 10' };
  }

  if (!isNumberInRange(data.x, 0, 100)) {
    return { valid: false, error: 'X coordinate must be between 0 and 100' };
  }
  if (!isNumberInRange(data.y, 0, 100)) {
    return { valid: false, error: 'Y coordinate must be between 0 and 100' };
  }

  if (data.notes !== undefined && typeof data.notes === 'string' && data.notes.length > 1000) {
    return { valid: false, error: 'Notes exceed maximum length (1000 chars)' };
  }

  return { valid: true };
}

// ─── Workout Session Validation ──────────────────────────────────────────────

export function validateWorkoutSession(data: Record<string, unknown>): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Workout session data must be an object' };
  }

  if (!isNumberInRange(data.duration, 0, 1440)) {
    return { valid: false, error: 'Duration must be between 0 and 1440 minutes (24 hours)' };
  }

  if (!isNumberInRange(data.caloriesBurned, 0, 50000)) {
    return { valid: false, error: 'Calories must be between 0 and 50000' };
  }

  if (!Array.isArray(data.sets)) {
    return { valid: false, error: 'Workout sets must be an array' };
  }

  if (data.sets.length > 50) {
    return { valid: false, error: 'Maximum 50 sets per workout' };
  }

  // Validate individual sets
  for (let i = 0; i < data.sets.length; i++) {
    const s = data.sets[i];
    if (!s || typeof s !== 'object') {
      return { valid: false, error: `Set ${i + 1} is invalid` };
    }
    if (typeof s.exercise !== 'string' || s.exercise.length === 0 || s.exercise.length > 100) {
      return { valid: false, error: `Set ${i + 1}: exercise name is invalid or too long` };
    }
    if (!isNumberInRange(s.sets, 0, 100)) {
      return { valid: false, error: `Set ${i + 1}: sets count must be 0–100` };
    }
    if (!isNumberInRange(s.reps, 0, 500)) {
      return { valid: false, error: `Set ${i + 1}: reps must be 0–500` };
    }
    if (!isNumberInRange(s.weight, 0, 2000)) {
      return { valid: false, error: `Set ${i + 1}: weight must be 0–2000 kg` };
    }
  }

  if (data.notes !== undefined && typeof data.notes === 'string' && data.notes.length > 1000) {
    return { valid: false, error: 'Notes exceed maximum length (1000 chars)' };
  }

  return { valid: true };
}

// ─── Coach Note Validation ───────────────────────────────────────────────────

export function validateCoachNote(data: Record<string, unknown>): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Coach note data must be an object' };
  }

  if (typeof data.message !== 'string' || data.message.length === 0) {
    return { valid: false, error: 'Message is required' };
  }
  if (data.message.length > 2000) {
    return { valid: false, error: 'Message exceeds maximum length (2000 chars)' };
  }

  return { valid: true };
}

// ─── Invite Code Validation ──────────────────────────────────────────────────

export function validateInviteCode(code: unknown): ValidationResult {
  if (typeof code !== 'string') {
    return { valid: false, error: 'Invite code must be a string' };
  }
  if (code.length < 4 || code.length > 10) {
    return { valid: false, error: 'Invite code must be 4–10 characters' };
  }
  if (!/^[A-Z0-9]+$/i.test(code)) {
    return { valid: false, error: 'Invite code must contain only letters and numbers' };
  }
  return { valid: true };
}
