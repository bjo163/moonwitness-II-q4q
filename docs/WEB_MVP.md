# Q4Q Web MVP

## Purpose

The web app is the fastest test surface for the generic Q4Q scripture platform.

The application boundary is **scripture-generic**. Quran is the first active corpus and the first closed foundation being tested.

## Current features

- Generic Scripture Explorer surface
- Explicit active corpus selection in the API
- Live Supabase connection indicator
- Foundation status
- Text-unit lookup
- Canonical representation display
- Corpus-specific structural metadata when available
- Canonical SHA256 display
- Evidence/cross-reference counts
- Foundation lock visibility
- Per-text-unit evidence inspector
- Responsive layout

## Generic API

The public application API is not Quran-specific:

```
GET /api/scripture?corpus=quran&reference=2:255
GET /api/scripture?corpus=quran&mode=status
GET /api/scripture/evidence?corpus=quran&reference=2:255
```

The same interface is intended for future corpora:

```
/api/scripture?corpus=<corpus>&reference=<reference>
```

Corpus-specific database adapters remain behind this API boundary.

## Data boundary

Browser -> Next.js generic scripture route -> server-only Supabase client.

The Supabase secret is never sent to the browser.

The web app does not write to:
- canonical scripture text
- text representations
- structural metadata
- evidence records
- foundation locks

## Current corpus

`quran` is currently enabled.

Its Quran Core is:

```
QURAN_CORE_V1 = CLOSED
```

Other scripture corpora are not enabled yet, but the web/API boundary is already designed to accept them without creating corpus-specific public routes.

## Local test

```bash
cp .env.example .env.local
# set SUPABASE_SECRET_KEY in .env.local

npm install
npm run typecheck
npm run dev
```

Open `http://localhost:3000`.

Current Quran test references:
- `1:1`
- `2:255`
- `36:1`
- `112:1`

## Deployment

The intended first deployment target is Vercel.

Required server environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

## Next web steps

After the generic explorer is validated:
1. corpus/document navigation
2. generic source and evidence drill-down
3. morphology/linguistic inspection where a corpus provides it
4. additional scripture adapters behind the same API

Do not add scoring to the web UI until the deterministic engine contract exists.
