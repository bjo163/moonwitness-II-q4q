-- Audit-only security shape checks for the Q4Q runtime.
select coalesce(json_agg(c.relname order by c.relname),'[]'::json) as rls_disabled_public_tables
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relkind in ('r','p') and not c.relrowsecurity;

select coalesce(json_agg(p.proname order by p.proname),'[]'::json) as mutable_search_path_functions
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public'
  and p.proname in (
    'set_updated_at_worldview_hierarchy',
    'q4q_is_locked',
    'q4q_block_locked_quran_mutation',
    'q4q_block_locked_quran_metadata_mutation',
    'q4q_validate_quran_annotation',
    'q4q_block_locked_quran_morphology_mutation',
    'q4q_ingest_semantic_concept_occurrences'
  )
  and p.proconfig is null;

select coalesce(json_agg(c.relname order by c.relname),'[]'::json) as quran_views_not_security_invoker
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relkind='v' and c.relname like 'quran_%'
  and coalesce((select option_value='true'
                from pg_options_to_table(c.reloptions)
                where option_name='security_invoker'),false)=false;
