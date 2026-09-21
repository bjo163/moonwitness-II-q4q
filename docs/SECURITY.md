# Q4Q Security Baseline

Supabase's current security guidance requires explicit access control for exposed Data API objects and RLS on public tables. This repository treats the Quran foundation as an internal, locked research database until an explicit API access policy is defined.

## Current hardening

- All public tables observed in the runtime now have RLS enabled.
- Quran-related views use `security_invoker=true`.
- The lock, validation, and ingestion functions have pinned `search_path`.
- No anonymous or authenticated policies are added implicitly. Read/write access must be intentionally designed.

## Current advisor interpretation

The Supabase security advisor now reports no `rls_disabled_in_public` findings and no `function_search_path_mutable` findings for the hardened functions.

Many tables intentionally have RLS enabled with no policies. That is an INFO advisory, not an error; it means Data API access is closed until policies are explicitly defined.

Performance advisor findings about unused indexes or unindexed foreign keys are tracked separately and do not alter the Quran Core closure boundary.
