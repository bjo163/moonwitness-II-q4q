-- Q4Q Quran Core security hardening
-- Applied to Supabase project q4q as migration:
-- 20260921190940_harden_quran_core_security_v1

alter table public.corpora enable row level security;
alter table public.traditions enable row level security;

alter function public.set_updated_at_worldview_hierarchy() set search_path = public, extensions, pg_temp;
alter function public.q4q_is_locked(text) set search_path = public, extensions, pg_temp;
alter function public.q4q_block_locked_quran_mutation() set search_path = public, extensions, pg_temp;
alter function public.q4q_block_locked_quran_metadata_mutation() set search_path = public, extensions, pg_temp;
alter function public.q4q_validate_quran_annotation() set search_path = public, extensions, pg_temp;
alter function public.q4q_block_locked_quran_morphology_mutation() set search_path = public, extensions, pg_temp;
alter function public.q4q_ingest_semantic_concept_occurrences(text) set search_path = public, extensions, pg_temp;
