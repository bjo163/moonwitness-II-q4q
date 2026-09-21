-- Live Supabase schema inventory query for Q4Q.
-- Run this against project q4q to reproduce the current public schema shape.
select json_build_object(
  'tables', coalesce((select json_agg(json_build_object(
    'name',c.relname,'rls_enabled',c.relrowsecurity,'force_rls',c.relforcerowsecurity
  ) order by c.relname)
  from pg_class c join pg_namespace n on n.oid=c.relnamespace
  where n.nspname='public' and c.relkind in ('r','p')),'[]'::json),
  'views', coalesce((select json_agg(json_build_object(
    'name',c.relname,
    'security_invoker',coalesce((select option_value='true' from pg_options_to_table(c.reloptions) where option_name='security_invoker'),false)
  ) order by c.relname)
  from pg_class c join pg_namespace n on n.oid=c.relnamespace
  where n.nspname='public' and c.relkind='v'),'[]'::json),
  'functions', coalesce((select json_agg(json_build_object(
    'name',p.proname,'identity_args',pg_get_function_identity_arguments(p.oid),
    'security',case when p.prosecdef then 'DEFINER' else 'INVOKER' end,
    'config',p.proconfig
  ) order by p.proname,pg_get_function_identity_arguments(p.oid))
  from pg_proc p join pg_namespace n on n.oid=p.pronamespace
  where n.nspname='public'),'[]'::json)
) as inventory;
