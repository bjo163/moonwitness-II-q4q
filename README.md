# MoonWitness II — Q4Q

Q4Q scripture platform repository.

**QURAN_CORE_V1 = CLOSED**

Supabase project `q4q` is the runtime source of truth. This repository stores application code, contracts, verification definitions, source manifests and reproducibility metadata.

## Web MVP

A read-only Scripture Evidence Explorer:
- Core closure status
- text-unit lookup by corpus-specific reference
- canonical representation per active corpus
- structural metadata where available
- evidence run counts
- foundation lock state

## Boundary

Closed in QURAN_CORE_V1:
1. canonical text / representation
2. structural metadata
3. deterministic observations
4. lexical inventory
5. linguistic/morphology evidence where available
6. evidence / cross-reference spine

Not part of core closure:
- partial syntax
- external semantic ontologies
- contextual evidence
- claims
- interpretations
- activity evaluation
- Q1/Q2/Q3/Q4 scoring

## Engine direction

The web layer is not the evaluator engine.

Target:

```
Next.js Web
   -> Q4Q API / Engine boundary
   -> deterministic evaluation core
   -> Supabase evidence store
```

The planned deterministic core is Rust. The web/API surface is scripture-generic; Quran is the first active corpus. LLMs remain optional and isolated for research/interpretation assistance; they do not mutate canonical Quran text or silently turn interpretation into fact.
