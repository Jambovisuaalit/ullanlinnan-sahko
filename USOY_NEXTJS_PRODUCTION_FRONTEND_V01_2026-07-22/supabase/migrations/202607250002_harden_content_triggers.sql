begin;

create or replace function private.write_content_revision()
returns trigger
language plpgsql
security definer
set search_path = private, public, auth
as $$
declare
  row_snapshot jsonb;
  row_id uuid;
  revision_action text;
begin
  if tg_op = 'DELETE' then
    row_snapshot := to_jsonb(old);
    row_id := old.id;
    revision_action := 'deleted';
  else
    row_snapshot := to_jsonb(new);
    row_id := new.id;

    if tg_op = 'INSERT' then
      revision_action := 'created';
    elsif (to_jsonb(old) ->> 'status') is distinct from (to_jsonb(new) ->> 'status')
      and (to_jsonb(new) ->> 'status') = 'published' then
      revision_action := 'published';
    elsif (to_jsonb(old) ->> 'status') is distinct from (to_jsonb(new) ->> 'status')
      and (to_jsonb(new) ->> 'status') = 'archived' then
      revision_action := 'archived';
    else
      revision_action := 'updated';
    end if;
  end if;

  insert into public.content_revisions (
    content_type,
    content_id,
    action,
    snapshot,
    changed_by
  ) values (
    tg_table_name,
    row_id,
    revision_action,
    row_snapshot,
    auth.uid()
  );

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

revoke all on function private.set_content_audit_fields() from public, anon, authenticated;
revoke all on function private.validate_publication_transition() from public, anon, authenticated;
revoke all on function private.validate_media_publication() from public, anon, authenticated;
revoke all on function private.write_content_revision() from public, anon, authenticated;

-- RLS policies and publication triggers call only these two helper functions.
-- They remain unavailable to anonymous users.
revoke all on function private.is_usoy_admin() from public, anon;
revoke all on function private.has_usoy_role(text[]) from public, anon;
grant execute on function private.is_usoy_admin() to authenticated;
grant execute on function private.has_usoy_role(text[]) to authenticated;

commit;
