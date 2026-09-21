# Q4Q Universal Text Engine API

Base path: `/api/v1`

The public engine contract is generic. Corpus, document, unit, reference, language, script, edition, and source identifiers are data fields; the kernel does not assign tradition-specific meaning to them.

## Resources

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/corpora` | List active corpora |
| GET | `/corpora/{id}` | Resolve an active corpus by UUID or code |
| GET | `/corpora/{corpus}/documents` | List documents for a corpus; corpus may be UUID or code |
| GET | `/documents/{id}` | Get one document |
| GET | `/documents/{document_id}/units` | List text units in a document |
| GET | `/units/{id}` | Get one text unit |
| GET | `/units/{id}/representations` | Get verified text representations |
| GET | `/units/{id}/navigation` | Get current/previous/next units within the same document |
| GET | `/search` | Search verified representations |
| GET | `/resolve` | Resolve a reference within a corpus |
| GET | `/sources/{id}` | Get one provenance source |

## Search

Query parameters:

- `q`: required, trimmed, maximum 256 Unicode scalar values.
- `corpus`: optional corpus code.
- `language`: optional representation language tag.
- `content_role`: optional representation content role.
- `limit`: optional, default 20, clamped to 1..50.
- `offset`: optional, default 0, capped at 1,000,000.

The response contains `items`, `limit`, `offset`, `count`, and `has_more`. Results are ordered deterministically so offset pagination is stable for an unchanged dataset.

## Resolve

`reference` is opaque and corpus-scoped. The engine never assumes a chapter/verse, page/line, paragraph, or other tradition-specific syntax.

Required query parameters:

- `corpus`
- `reference`

`reference` is trimmed and limited to 512 Unicode scalar values.

## Errors

Validation and not-found responses use the same machine-readable shape:

```json
{
  "error": {
    "code": "bad_request",
    "message": "q is required"
  }
}
```

Codes currently exposed by the HTTP layer:

- `bad_request`
- `not_found`

Unexpected database/runtime failures continue through the framework error handling.

## Genericity boundary

The core engine must remain free of corpus-specific structural vocabulary. Corpus-specific metadata and parsing belong outside the kernel in optional adapters/profiles.

The CI generic-core guard intentionally rejects corpus-specific terminology inside `engine/src`.
