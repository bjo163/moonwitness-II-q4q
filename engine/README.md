# Q4Q Universal Text Engine

Rust + Loco.rs + SeaORM 2.

The engine core is corpus-agnostic. It operates on corpora, documents, text units, text representations, sources, search, navigation, and opaque reference resolution.

A corpus-specific concept must not be added to the core engine. Corpus-specific parsing or display rules belong in an optional profile outside the kernel.

## Run

Set `DATABASE_URL` to the PostgreSQL connection string for the existing Q4Q database, then run `cargo run` from this directory.

Loco listens on port `5150` by default.

## Generic API

Base path: `/api/v1`

GET `/corpora`
GET `/corpora/{id}`
GET `/corpora/{corpus}/documents`
GET `/documents/{id}`
GET `/documents/{document_id}/units`
GET `/units/{id}`
GET `/units/{id}/representations`
GET `/units/{id}/navigation`
GET `/search?corpus=<code>&q=<term>&language=<tag>&content_role=<role>&limit=<n>&offset=<n>`
GET `/resolve?corpus=<code>&reference=<reference>`
GET `/sources/{id}`

The API exposes stable DTO contracts rather than SeaORM model types.

### Search contract

- `q` is required and capped at 256 Unicode scalar values.
- `limit` defaults to 20 and is clamped to 1..50.
- `offset` defaults to 0 and is capped at 1,000,000.
- Response fields: `items`, `limit`, `offset`, `count`, `has_more`.
- Results are ordered deterministically for stable offset pagination on an unchanged dataset.
- Search only returns verified text representations from active corpora.

### Resolve contract

The `reference` value is opaque and corpus-scoped. The core never assumes a chapter:verse, page:line, paragraph, or other tradition-specific syntax.

### Error contract

Validation and not-found responses use:

```json
{
  "error": {
    "code": "bad_request",
    "message": "q is required"
  }
}
```

Current HTTP codes are `bad_request` and `not_found`. Unexpected runtime/database failures continue through framework error handling.

See [API.md](./API.md) for the complete contract.

## Genericity guard

The CI pipeline rejects corpus-specific structural vocabulary inside `engine/src`. This is intentional: the universal kernel must remain reusable when additional corpora are added.
