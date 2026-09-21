# QURAN_CORE_V1 Status

Certification date: 2026-09-22

**State: CLOSED**

## Verified runtime

| Metric | Result |
|---|---:|
| Ayah spines | 6,236 |
| Complete ayah spines | 6,236 |
| Incomplete ayah spines | 0 |
| Evidence records | 37,851 |
| Verified evidence records | 37,851 |
| Cross-references | 24,394 |
| Verified cross-references | 24,394 |
| Broken evidence refs | 0 |
| Text representations | 31,180 |
| Verified/non-blank representations | 31,180 |
| Canonical live parity | 6,236 / 6,236 |
| Kemenag live API parity | 6,236 / 6,236 |

## Locks

- QURAN_FOUNDATION — LOCKED
- QURAN_STRUCTURAL_METADATA — LOCKED
- QURAN_SEMANTIC_OCCURRENCE_MAPPING — LOCKED
- QURAN_QA_SEMANTIC_RELATION_GRAPH — LOCKED
- QURAN_EVIDENCE_CROSSREFERENCE_V1 — LOCKED

## External / partial

- QAC syntax — PARTIAL
- QAC semantic ontology — PARTIAL
- QuranAnalysis QA Ontology — external verified graph

These are not promoted into canonical Quran content.

## Security

Post-hardening Supabase security advisor:

- rls_disabled_in_public — 0 ERROR
- function_search_path_mutable — 0 WARN
- rls_enabled_no_policy — 58 INFO

The INFO findings are closed-access RLS surfaces without explicit policies.

## Performance

- unindexed foreign keys — 29 INFO
- unused indexes — 43 INFO

These are optimization findings and do not invalidate Core closure.

## Pending provenance item

The official Kemenag archive RAR binary parity is still pending. Its published MD5 is recorded in the source manifest. Live API parity is verified.

## Explicitly outside QURAN_CORE_V1

Contextual synthesis, claims, interpretations, comparative synthesis, universal principles, activities, evaluation, and scoring.
