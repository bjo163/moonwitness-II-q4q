# Q4Q Architecture

## Closed core

QURAN_CORE_V1 closes:
canonical text -> structure -> deterministic observation -> lexical -> morphology -> evidence/cross-reference.

## External layers

Partial syntax and external ontologies are research evidence, not canonical Quran data.

## Web

Next.js App Router is a read-only presentation and request boundary.

## Future engine

The planned deterministic evaluator core is Rust.

Supabase remains the evidence store/source of truth. The web app should not mutate Quran Core.

LLMs are optional supporting components for research/claim/interpretation assistance and must stay outside the canonical mutation path.
