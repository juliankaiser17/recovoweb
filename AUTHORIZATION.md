# Recovo — Role-Based Access Control (RBAC) Documentation

> **Last Updated:** July 24, 2026
>
> This document defines the authorization model for every resource in Recovo.
> All rules are enforced server-side via Firebase Realtime Database Security Rules
> and verified client-side before network requests.

---

## Roles

| Role | Description |
|------|-------------|
| **Athlete** | Individual user who tracks workouts, recovery, injuries, and daily status. |
| **Coach** | Team leader who creates a Legion, monitors athletes, and sends coaching notes. |
| **Unauthenticated** | No Firebase auth token. Zero access to any resource. |

---

## Authorization Matrix

### User Profiles (`/users/$uid`)

| Action | Athlete (own) | Athlete (other) | Coach (legion member) | Coach (non-member) | Unauth |
|--------|:---:|:---:|:---:|:---:|:---:|
| Read | ✅ | ❌ | ✅ | ❌ | ❌ |
| Write | ✅ | ❌ | ❌ | ❌ | ❌ |

**Constraints:** Must include `uid`, `email`, `name`, `role`. Role must be `"athlete"` or `"coach"`. Name max 100 chars. Email max 254 chars.

---

### Workouts (`/workouts/$uid`)

| Action | Athlete (own) | Athlete (other) | Coach (any) | Unauth |
|--------|:---:|:---:|:---:|:---:|
| Read | ✅ | ❌ | ❌ | ❌ |
| Write | ✅ | ❌ | ❌ | ❌ |

**Constraints:** Duration 0–1440 min. Calories 0–50000. Max 50 sets per workout. Exercise name max 100 chars.

> ⚠️ **Design Decision:** Coaches intentionally **cannot** see athlete workout details. This protects athlete training privacy while still sharing recovery/readiness data.

---

### Recovery Entries (`/recovery/$uid`)

| Action | Athlete (own) | Athlete (other) | Coach (legion member) | Coach (non-member) | Unauth |
|--------|:---:|:---:|:---:|:---:|:---:|
| Read | ✅ | ❌ | ✅ | ❌ | ❌ |
| Write | ✅ | ❌ | ❌ | ❌ | ❌ |

**Constraints:** HRV 0–300 ms. RHR 20–250 bpm. Sleep 0–24 hrs. Quality 0–100. Scores 0–100.

---

### Daily Status (`/daily_status/$uid`)

| Action | Athlete (own) | Athlete (other) | Coach (legion member) | Coach (non-member) | Unauth |
|--------|:---:|:---:|:---:|:---:|:---:|
| Read | ✅ | ❌ | ✅ | ❌ | ❌ |
| Write | ✅ | ❌ | ❌ | ❌ | ❌ |

**Constraints:** Mood, energy, stress, sleepQuality each 1–5. Notes max 1000 chars.

---

### Injuries / Pain Markers (`/injuries/$uid`)

| Action | Athlete (own) | Athlete (other) | Coach (legion member) | Coach (non-member) | Unauth |
|--------|:---:|:---:|:---:|:---:|:---:|
| Read | ✅ | ❌ | ✅ | ❌ | ❌ |
| Write | ✅ | ❌ | ❌ | ❌ | ❌ |

**Constraints:** Intensity 1–10. Side: `left`/`right`/`center`. Pain type: `sharp`/`dull`/`burning`/`aching`. Body part max 100 chars.

---

### Coach Notes (`/coach_notes/$athleteUid`)

| Action | Athlete (own) | Athlete (other) | Coach (legion member) | Coach (non-member) | Unauth |
|--------|:---:|:---:|:---:|:---:|:---:|
| Read | ✅ | ❌ | ✅ | ❌ | ❌ |
| Write | ❌ | ❌ | ✅ | ❌ | ❌ |

**Constraints:** `coachUid` must match the authenticated user. Message max 2000 chars.

> ⚠️ Only the coach of the athlete's legion can write notes. Athletes can read their own notes but cannot modify them.

---

### Legions (`/legions/$legionId`)

| Action | Coach (owner) | Coach (non-owner) | Athlete (member) | Athlete (non-member) | Unauth |
|--------|:---:|:---:|:---:|:---:|:---:|
| Read | ✅ | ❌ | ✅ | ❌ | ❌ |
| Write | ✅ | ❌ | ❌ | ❌ | ❌ |
| Create (new) | ✅ | ✅ | ✅ | ✅ | ❌ |

**Constraints:** Name max 100 chars. Sport max 50 chars. Only the coach can modify legion settings after creation.

#### Athlete UIDs (`/legions/$id/athleteUids/$uid`)

| Action | The athlete themselves | Coach (owner) | Anyone else |
|--------|:---:|:---:|:---:|
| Write | ✅ (join/leave) | ✅ (remove) | ❌ |

#### Athlete Status (`/legions/$id/athlete_status/$uid`)

| Action | The athlete | Coach (owner) | Anyone else |
|--------|:---:|:---:|:---:|
| Read | ✅ | ✅ | ❌ |
| Write | ✅ | ❌ | ❌ |

---

### Invite Codes (`/inviteCodes/$code`)

| Action | Coach | Athlete | Unauth |
|--------|:---:|:---:|:---:|
| Read (single code) | ✅ | ✅ | ❌ |
| Read (list all) | ❌ | ❌ | ❌ |
| Write (new code) | ✅ | ❌ | ❌ |
| Overwrite existing | ❌ | ❌ | ❌ |

> 🔒 **Hardened:** Previously any authenticated user could read ALL codes and overwrite any code. Now restricted to single-code lookups and coach-only creation.

---

### Inbox (`/users/$uid/inbox`)

| Action | Athlete (own) | Coach (to legion member) | Anyone else |
|--------|:---:|:---:|:---:|
| Read | ✅ | ❌ | ❌ |
| Write | ✅ | ✅ | ❌ |

**Constraints:** Title max 200 chars. Message max 2000 chars. Type: `workout_assignment`/`coach_note`/`alert`.

---

## API Routes (Dashboard)

### `POST /api/ai-recommendations`
- **Auth:** None required (rate-limited by IP)
- **Rate Limit:** 5 requests/minute per IP
- **Input Validation:** Body size ≤ 10KB, schema-validated fields, sanitized strings
- **AI Provider:** Google Gemini 2.0 Flash (free tier)

### `GET /api/athletes?legionId=X`
- **Auth:** Firebase ID token required (Bearer token)
- **Authorization:** Must be the coach of the requested legion
- **Rate Limit:** 30 requests/minute per IP
- **Input Sanitization:** `legionId` stripped to alphanumeric + hyphens/underscores only
