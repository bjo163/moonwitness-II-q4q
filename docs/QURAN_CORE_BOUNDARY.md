# Q4Q Quran Core V1 — Final Boundary

## Core closure

`QURAN_CORE_V1 = CLOSED`

The closure boundary is the Evidence / Cross-Reference Spine.

### Closed layers

1. Canonical Arabic text
2. Structural metadata
3. Deterministic observation
4. Surface lexical inventory
5. QAC Morphology v0.4
6. Evidence / Cross-reference

## Preserved external evidence

The following may exist in the database but are not canonical Quran content:

- QAC syntax (partial)
- QAC semantic ontology (partial)
- QuranAnalysis QA Ontology v1.0 relation graph
- translations and transliterations
- other attributed source material

## Explicitly above Core

These require separate versioned layers:

- contextual evidence
- claims
- interpretations
- synthesis
- cross-tradition comparison
- universal principles
- activities
- evaluation
- scoring

## Non-negotiable rule

A derived or interpretive layer may reference canonical Quran evidence, but it must never rewrite canonical Quran text, provenance, or locked evidence in-place.

## Versioning rule

Any intentional change to a locked layer creates:

`new version → new run → new checksum → new verification → new certification`

The previous version remains auditable.
