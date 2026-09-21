# Q4Q API Surface

## Rule

The public application API is **scripture-generic**.

Do not create public routes named after a specific corpus:

```
/api/quran
/api/bible
/api/tanakh
```

Use the generic scripture boundary:

```
/api/scripture
/api/scripture/evidence
```

## Corpus selection

The corpus is an explicit parameter:

```
GET /api/scripture?corpus=quran&reference=2:255
GET /api/scripture?corpus=quran&mode=status
GET /api/scripture/evidence?corpus=quran&reference=2:255
```

Quran is the first enabled corpus.

Future corpora use the same API shape:

```
GET /api/scripture?corpus=<corpus>&reference=<reference>
```

## Adapter rule

The generic route resolves the requested corpus to an internal corpus adapter.

The public API must not expose the adapter implementation.

Current implementation:

```
/api/scripture
      ↓
corpus = quran
      ↓
Quran adapter
      ↓
Supabase Q4Q Quran foundation
```

Future:

```
/api/scripture
      ↓
corpus = <x>
      ↓
<x> adapter
      ↓
Supabase Q4Q corpus foundation
```

## Data boundary

The API is read-only for the closed foundation.

No generic scripture request may mutate:
- canonical source text
- text representations
- structural foundation
- verified evidence
- foundation locks

## Compatibility rule

Adding a new scripture corpus should not require changing the public route namespace.

Only the corpus adapter and its supported representations/evidence capabilities should change.
