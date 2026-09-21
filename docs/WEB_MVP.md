# Q4Q Web MVP

## Purpose

The web app is the fastest test surface for Q4Q.

It is intentionally read-only at the Quran Core stage.

## Current features

- Live Supabase connection indicator
- QURAN_CORE_V1 closed-state banner
- Foundation metrics
- Verse lookup using `surah:ayah`
- Canonical Arabic representation
- Quran structural metadata
- Canonical SHA256 display
- Evidence/cross-reference counts
- Foundation lock visibility
- Per-ayah evidence inspector (read-only)
- Responsive layout

## Data boundary

Browser -> Next.js route handler -> server-only Supabase client.

The Supabase secret is never sent to the browser.

The web app does not write to:
- canonical Quran text
- text representations
- structural metadata
- evidence records
- foundation locks

## Local test

```bash
cp .env.example .env.local
# set SUPABASE_SECRET_KEY in .env.local

npm install
npm run typecheck
npm run dev
```

Open `http://localhost:3000`.

Try:
- `1:1`
- `2:255`
- `36:1`
- `112:1`

## Deployment

The intended first deployment target is Vercel.

Required server environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

The publishable/anon key is not required for this server-side read-only MVP.

## Next web steps

After the Quran Core explorer is validated:
1. add source/evidence drill-down
2. add morphology inspection
3. add external semantic evidence inspection
4. add contextual/claim/interpretation views as separate layers

Do not add scoring to the web UI until the deterministic engine contract exists.
