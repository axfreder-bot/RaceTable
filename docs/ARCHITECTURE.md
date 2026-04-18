# RaceTable Architecture

## Overview

RaceTable is a React Native 0.74.x app with TypeScript, designed to work offline-first with local seed data, scaling to Firebase later for sync and cloud storage.

## Directory Structure

```
src/
├── components/     # Reusable UI components (MealCard, FitScoreBadge, SupplementCard, etc.)
├── data/           # Local seed data (dishes.ts, restaurants.ts, supplements.ts)
├── hooks/          # Custom hooks (useNutrition, useRaceCountdown, useCheckin, useDishLookup)
├── navigation/     # React Navigation 6 setup (TabNavigator, route types)
├── screens/        # Main app screens (Home, RestaurantLookup, RaceCountdown, etc.)
├── theme/          # Design tokens (colors, typography, spacing)
├── types/          # TypeScript interfaces (Dish, Restaurant, Supplement, CheckIn, etc.)
└── utils/          # Helper functions (nutrition math, date formatting, scoring)
```

## Data Flow

```
Seed Data (data/)
    ↓
Custom Hooks (hooks/)
    ↓
Screens (screens/)
    ↓
Navigation (navigation/)
    ↓
User
```

1. **Seed Data** (`data/`) contains static JSON-like objects: dishes, restaurants, supplements, training plans
2. **Hooks** (`hooks/`) consume and transform seed data, manage app state, compute fit scores and nutrition targets
3. **Screens** (`screens/`) consume hooks and render UI
4. **Navigation** ties screens together via React Navigation 6 bottom tabs

## Navigation Structure

React Navigation 6 bottom tabs:
- **Home** — Morning check-in + daily plan
- **Restaurants** — Dish lookup with fit scores
- **Race** — Race countdown + training plan

Future: Stack navigator for detail views (dish detail screen, workout log).

## Why Local Seed Data First?

1. **Offline-first**: App works without internet — critical for runners traveling to races in spotty coverage areas
2. **Fast iteration**: No Firebase setup required to add new dishes or adjust scoring logic
3. **Static preview**: Can ship and test the UX before backend exists
4. **Migration path**: Firebase added later will sync with same data shapes used locally

Firebase will bring: cloud backup, cross-device sync, user authentication, and a CMS for adding/updating dishes without app releases.

## Key Modules

### types/
Defines core interfaces:
- `Dish`: name, restaurant, calories, macros, fitScore
- `CheckIn`: date, workoutType, duration, feeling
- `NutritionTarget`: daily carbs/protein/fat grams
- `Supplement`: name, timing, dose, purpose

### data/
Static seed data:
- `dishes.ts`: 50+ common restaurant dishes with nutrition data
- `restaurants.ts`: Restaurant chains with cuisine types
- `supplements.ts`: Common running supplements with timing windows

### hooks/
Business logic:
- `useNutrition.ts`: Computes daily targets based on training load
- `useDishLookup.ts`: Searches dishes, computes fit scores
- `useRaceCountdown.ts`: Days until race, current training phase
- `useCheckin.ts`: Stores morning check-in state

## Fit Score Algorithm

Dishes get a 1-5 paw score based on:
- **Carbs** relative to training load (high carb = better on heavy training days)
- **Protein** sufficiency for recovery
- **Fat** content (moderate preferred)
- **Fiber** (bonus for digestion)
- **Processed foods** (penalty)

Formula: weighted sum normalized to 1-5 scale, rounded to nearest integer.

---

## Backend Architecture

RaceTable uses a multi-backend strategy: Firebase for auth + user data, a Cloudflare Worker for restaurant search, and local seed data as fallback.

### Architecture Diagram

```
┌─────────────────────────┐     ┌──────────────────────────────────┐
│   RaceTable Mobile App  │────▶│         Firebase                 │
│                         │     │  ┌─────────────┐  ┌───────────┐ │
│  ┌───────────────────┐  │     │  │ Auth        │  │ Firestore  │ │
│  │ AuthScreen        │  │     │  │ (email+goog) │  │ (user data)│ │
│  │ AppNavigator       │  │     │  └─────────────┘  └───────────┘ │
│  │ useAuth hook      │  │     │                                  │
│  │ useRestaurants    │  │     └──────────────────────────────────┘
│  │ useSupplementInv  │  │
│  └───────────────────┘  │
│         │              │     ┌──────────────────────────────────┐
│  (falls back to seed)  │────▶│   Cloudflare Worker              │
│                         │     │   racetable-places-proxy          │
│                         │     │   - Google Places API proxy       │
└─────────────────────────┘     │   - KV cache (1hr TTL)           │
                                │   - Hides API keys                │
                                └──────────────────────────────────┘
```

### Firebase (Auth + Firestore)

**Purpose**: User authentication and persistent user data.

- **Authentication**: Email/password + Google sign-in via `@react-native-firebase/auth`
- **Firestore collections**:
  - `users/{uid}/inventory` — supplement inventory (hasSupplement[], doesNotTake[], weeklyOrderList[])
  - `users/{uid}/meals` — saved meal plans
  - `users/{uid}/checkins` — daily check-in history
  - `restaurants/{id}` — restaurant master data (admin-managed)

**Why Firebase?** Native React Native SDK, excellent offline support with local persistence, works well with Expo and bare React Native, generous free tier (10K monthly active users).

### Cloudflare Worker (Places Proxy)

**Purpose**: Proxy Google Places API without exposing API keys in the mobile app.

- Endpoint: `https://racetable-places-proxy.<username>.workers.dev/?lat=XX&lng=YY&query=restaurant`
- Fetches from Google Places Nearby Search + Text Search
- Caches results in Cloudflare KV for 1 hour
- Returns normalized `PlaceResult[]` JSON

**Why a Worker?** Keeps Google Places API key server-side. Prevents key theft from app binary decompilation. Also handles CORS and response normalization.

**Deploy steps**:
```bash
cd cloudflare/racetable-places-proxy
npx wrangler kv:namespace create "PLACES_CACHE"   # copy the ID into wrangler.toml
npx wrangler secret put GOOGLE_PLACES_API_KEY     # paste the key
npx wrangler deploy
```

### Seed Data Fallback Strategy

The app is designed to work in three modes:

| Mode | Firebase | Places API | Behavior |
|------|----------|------------|----------|
| **Full** | ✅ Configured | ✅ Deployed | Cloud auth + real restaurants |
| **Partial** | ✅ Configured | ❌ Missing | Cloud auth + local seed restaurants |
| **Demo** | ❌ Not configured | ❌ Missing | Auth screen (demo mode) + local seed |

This ensures the app is always testable even before full backend setup.

### Data Flow (Authenticated)

```
1. User signs in → Firebase Auth returns uid
2. useSupplementInventory loads user's supplement list from Firestore
3. useRestaurants loads restaurants (Firestore → fallback to seed)
4. User selects restaurant → dishes shown (from seed or Firestore)
5. User updates supplement inventory → saved to Firestore
6. App is offline-capable (Firebase SDK handles local persistence)
```

### Environment Configuration

Firebase config lives in `src/firebase/config.ts` with `TODO_FILL_IN` placeholders. After creating the Firebase project, Alex updates these from `GoogleService-Info.plist`.

Cloudflare Worker uses `wrangler secrets` for the Google Places API key — never committed to the repo.

---

_Last updated: Phase 3 (Firebase + Cloudflare Worker integration)_
