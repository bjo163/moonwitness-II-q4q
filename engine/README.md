# Q4Q Universal Text Engine

Rust + Loco.rs + SeaORM 2.

The engine core is corpus-agnostic. It operates on corpora, documents, text units, text representations, sources, search, navigation, and opaque reference resolution.

A corpus-specific concept must not be added to the core engine. Corpus-specific parsing or display rules belong in an optional profile outside the kernel.

## Run

Set DATABASE_URL to the PostgreSQL connection string for the existing Q4Q database, then run cargo run from this directory.

Loco listens on port 5150 by default.

## Generic API

GET /api/v1/corpora
GET /api/v1/corpora/{id}
GET /api/v1/corpora/{corpus_id}/documents
GET /api/v1/documents/{id}
GET /api/v1/documents/{document_id}/units
GET /api/v1/units/{id}
GET /api/v1/units/{id}/representations
GET /api/v1/units/{id}/navigation
GET /api/v1/search?corpus=<code>&q=<term>
GET /api/v1/resolve?corpus=<code>&reference=<reference>
GET /api/v1/sources/{id}

The resolve endpoint treats reference as an opaque corpus-scoped value. The core never assumes a chapter:verse or another tradition-specific format.
