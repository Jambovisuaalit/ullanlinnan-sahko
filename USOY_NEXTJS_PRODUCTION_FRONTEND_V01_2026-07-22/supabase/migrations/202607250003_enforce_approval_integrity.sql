begin;

create or replace function private.validate_publication_transition()
returns trigger
language plpgsql
security definer
set search_path = private, public, auth
as $$
declare
  document jsonb := to_jsonb(new);
  old_document jsonb;
  new_document jsonb;
  current_status public.publication_status := (document ->> 'status')::public.publication_status;
  old_status public.publication_status;
  unresolved text[] := coalesce(
    array(select jsonb_array_elements_text(document -> 'unresolved_fields')),
    '{}'
  );
  forbidden_pattern constant text := '(^|[^A-Z0-9_])(VAHVISTETTAVA|TBD|TODO|PLACEHOLDER)([^A-Z0-9_]|$)';
begin
  if tg_op = 'UPDATE' then
    old_status := (to_jsonb(old) ->> 'status')::public.publication_status;

    old_document := to_jsonb(old) - array[
      'updated_at',
      'updated_by',
      'approved_at',
      'approved_by',
      'published_at',
      'published_by'
    ];

    new_document := to_jsonb(new) - array[
      'updated_at',
      'updated_by',
      'approved_at',
      'approved_by',
      'published_at',
      'published_by'
    ];

    if old_status in ('approved', 'published')
      and current_status = old_status
      and old_document is distinct from new_document then
      raise exception 'Approved or published content must be reopened before substantive editing.';
    end if;

    if old_status = 'published'
      and current_status not in ('published', 'archived')
      and not private.has_usoy_role(array['publisher', 'admin']) then
      raise exception 'Only a publisher or admin can reopen published content.';
    end if;

    if old_status = 'approved' and current_status in ('draft', 'in_review') then
      new.approved_at := null;
      new.approved_by := null;
    end if;

    if old_status = 'published' and current_status in ('draft', 'in_review') then
      new.approved_at := null;
      new.approved_by := null;
      new.published_at := null;
      new.published_by := null;
    end if;
  end if;

  if current_status = 'approved'
    and (tg_op = 'INSERT' or old_status is distinct from 'approved') then
    if not private.has_usoy_role(array['approver', 'publisher', 'admin']) then
      raise exception 'Only an approver, publisher or admin can approve content.';
    end if;

    if coalesce(cardinality(unresolved), 0) > 0 then
      raise exception 'Content has unresolved fields and cannot be approved.';
    end if;

    if document::text ~* forbidden_pattern then
      raise exception 'Content contains a forbidden unresolved-content marker.';
    end if;

    new.approved_at := coalesce(new.approved_at, now());
    new.approved_by := coalesce(new.approved_by, auth.uid());
  end if;

  if current_status = 'published' then
    if tg_op = 'INSERT' or old_status not in ('approved', 'published') then
      raise exception 'Content must move through approved status before publication.';
    end if;

    if not private.has_usoy_role(array['publisher', 'admin']) then
      raise exception 'Only a publisher or admin can publish content.';
    end if;

    if coalesce(cardinality(unresolved), 0) > 0 then
      raise exception 'Content has unresolved fields and cannot be published.';
    end if;

    if document::text ~* forbidden_pattern then
      raise exception 'Content contains a forbidden unresolved-content marker.';
    end if;

    if new.approved_at is null or new.approved_by is null then
      raise exception 'Approved timestamp and approver are required before publication.';
    end if;

    new.published_at := coalesce(new.published_at, now());
    new.published_by := coalesce(new.published_by, auth.uid());
  end if;

  if current_status = 'archived'
    and tg_op = 'UPDATE'
    and old_status = 'published'
    and not private.has_usoy_role(array['publisher', 'admin']) then
    raise exception 'Only a publisher or admin can archive published content.';
  end if;

  return new;
end;
$$;

create or replace function private.validate_second_hand_publication_media()
returns trigger
language plpgsql
security definer
set search_path = private, public, auth
as $$
declare
  primary_image_count integer;
  published_image_count integer;
begin
  if new.status = 'published' then
    select
      count(*) filter (where link.is_primary = true),
      count(*)
    into primary_image_count, published_image_count
    from public.second_hand_item_media link
    join public.media_assets media on media.id = link.media_id
    where link.item_id = new.id
      and media.status = 'published'
      and media.rights_confirmed = true
      and (media.publish_at is null or media.publish_at <= now())
      and (media.unpublish_at is null or media.unpublish_at > now());

    if published_image_count < 1 then
      raise exception 'A published second hand item requires at least one published image.';
    end if;

    if primary_image_count <> 1 then
      raise exception 'A published second hand item requires exactly one published primary image.';
    end if;
  end if;

  return new;
end;
$$;

revoke all on function private.validate_second_hand_publication_media() from public, anon, authenticated;

drop trigger if exists second_hand_items_media_guard on public.second_hand_items;
create trigger second_hand_items_media_guard
before insert or update on public.second_hand_items
for each row execute function private.validate_second_hand_publication_media();

grant select on public.opening_hour_exceptions to anon, authenticated;
grant insert, update, delete on public.opening_hour_exceptions to authenticated;

grant select on public.announcements to anon, authenticated;
grant insert, update, delete on public.announcements to authenticated;

grant select on public.media_assets to anon, authenticated;
grant insert, update, delete on public.media_assets to authenticated;

grant select on public.second_hand_items to anon, authenticated;
grant insert, update, delete on public.second_hand_items to authenticated;

grant select on public.second_hand_item_media to anon, authenticated;
grant insert, update, delete on public.second_hand_item_media to authenticated;

grant select on public.content_revisions to authenticated;
revoke insert, update, delete on public.content_revisions from anon, authenticated;

revoke all on private.usoy_admin_users from public, anon, authenticated;

commit;
