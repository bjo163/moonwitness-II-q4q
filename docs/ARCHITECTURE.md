# Q4Q Architecture

## 1. Platform Decision

Q4Q uses a deliberate three-layer platform split:

```
                 Q4Q
                  │
        ┌─────────┴─────────┐
        │                   │
     SUPABASE             RUST
 Data & Application   Deterministic
     Platform         Evaluation Engine
        │                   │
        └────────┬──────────┘
                 │
              NEXT.JS
                 │
              WEB APP
```

### Supabase — Q4Q Data & Application Platform

Supabase is the primary Q4Q platform and runtime source of truth.

Responsibilities:
- PostgreSQL
- Quran/scripture database
- relational evidence
- source and document provenance
- Auth and user roles
- Storage for source/document assets
- REST/Data API
- Row Level Security
- Realtime where useful
- dashboard/admin data
- application-facing data services

Q4Q does **not** introduce Neon as a second database at this stage.

### Next.js — Web / Application Surface

Next.js is the first application surface.

The application and API boundaries are **scripture-generic**. They must not be named after a single tradition or corpus.

Canonical web/API shape:

```
/api/scripture
/api/scripture/evidence
```

A corpus is selected explicitly, for example:

```
/api/scripture?corpus=quran&reference=2:255
```

Quran is the first active corpus implementation. Other corpora can be added behind the same generic interface without changing the public API shape.

Initial goal:
- fast visual test
- Quran Core explorer
- read-only evidence inspection
- verse/passage lookup
- foundation status
- verification/lock visibility

The web layer must not mutate the closed Quran Core.

### Rust — Deterministic Evaluation Engine

Rust is the planned Q4Q evaluation engine.

Responsibilities:
- deterministic rules
- evidence-aware evaluation
- Q1/Q2/Q3/Q4 logic
- threshold calculations
- score calculation when scoring is introduced
- provenance-aware results
- repeatable batch evaluation
- audit-friendly execution

Rust is intentionally separated from the web UI and Supabase presentation layer.

## 2. Quran Core Boundary

`QURAN_CORE_V1 = CLOSED`

The closed core consists of:

1. Canonical Arabic text
2. Structural metadata
3. Deterministic observations
4. Surface lexical inventory
5. QAC morphology
6. Evidence / cross-reference spine

The closed core is locked in Supabase and must be treated as immutable by application code.

### Not part of Quran Core closure

These remain separate research/application layers:

- partial syntax
- external semantic ontologies
- contextual evidence
- claims
- interpretations
- synthesis
- activities
- evaluation
- Q1/Q2/Q3/Q4 scoring

Interpretation and claims must never silently become canonical Quran data.

## 3. Current Data Flow

```
Scripture Source / Corpus
    ↓
Supabase Q4Q
    ↓
Verified Corpus Foundation
    ↓
Evidence / Cross-reference
    ↓
Next.js Scripture Explorer
```

The future evaluation path is:

```
Next.js Web
    ↓
Q4Q API / Engine Boundary
    ↓
Rust Deterministic Engine
    ↓
Supabase Evidence Store
    ↓
Evaluation Result / Audit
```

## 4. Development Strategy

We deliberately do **not** wait for the complete evaluator engine before testing the platform.

Current sequence:

```
Supabase Q4Q
    ↓
QURAN_CORE_V1 CLOSED
    ↓
GitHub repository
    ↓
Next.js Web MVP
    ↓
Live Quran / Evidence testing
    ↓
Context / Claim / Interpretation layers
    ↓
Rust Evaluation Engine
    ↓
Q1/Q2/Q3/Q4 + scoring
```

This keeps the foundation stable while allowing the application to be tested early.

## 5. Repository Role

Repository:

`bjo163/moonwitness-II-q4q`

The repository is the reproducibility and engineering layer.

It stores:
- application code
- Rust engine code
- database contracts
- migrations when committed
- verification definitions
- source manifests
- checksums
- CI
- architecture documentation

Supabase remains the runtime data/application platform. The repository does not become an alternate canonical Quran database.

## 6. Engine Rule

The Q4Q engine must follow this boundary:

```
SOURCE / EVIDENCE
        ↓
DETERMINISTIC ENGINE
        ↓
EVALUATION
        ↓
AUDITABLE RESULT
```

The engine may read verified evidence and produce derived results.

The engine must not:
- mutate canonical Quran text
- rewrite source provenance
- convert interpretation into fact
- hide evidence lineage
- depend on a UI state for correctness

LLMs may be introduced later as optional research assistance for tasks such as claim extraction, interpretation drafting, or natural-language explanation. They remain outside the canonical mutation path and outside the deterministic evaluation core.

## 7. Non-Goals at This Stage

Do not add yet:

- Neon
- a second primary database
- Q4Q scoring
- universal activity scoring
- cross-tradition scoring
- autonomous evaluation
- LLM-controlled canonical data mutation

The immediate objective is a stable, testable scripture platform boundary, with Quran as the first closed corpus.
