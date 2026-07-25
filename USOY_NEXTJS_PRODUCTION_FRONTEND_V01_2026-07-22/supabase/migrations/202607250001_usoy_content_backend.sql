begin;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create type public.publication_status as enum (
  'draft',
  'in_review',
  'approved',
  'published',
  'archived'
);

create type public.announcement_level as enum (
  'information',
  'warning'
);

create type public.second_hand_state as enum (
  'active',
  'sold',
  'archived'
);

create table private.usoy_admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('editor', 'approver', 'publisher', 'admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

alter table private.usoy_admin_users enable row level security;

create or replace function private.is_usoy_admin()
returns boolean
language sql
stable
security definer
set search_path = private, public, auth
as $$
  select exists (
    select 1
    from private.usoy_admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.is_active = true
  );
$$;

revoke all on function private.is_usoy_admin() from public;
grant execute on function private.is_usoy_admin() to authenticated;

create or replace function private.has_usoy_role(required_roles text[])
returns boolean
language sql
stable
security definer
set search_path = private, public, auth
as $$
  select exists (
    select 1
    from private.usoy_admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.is_active = true
      and admin_user.role = any(required_roles)
  );
$$;

revoke all on function private.has_usoy_role(text[]) from public;
grant execute on function private.has_usoy_role(text[]) to authenticated;

create table public.opening_hour_exceptions (
  id uuid primary key default gen_random_uuid(),
  exception_date date not null unique,
  is_closed boolean not null default false,
  opens_at time,
  closes_at time,
  public_label text not null check (char_length(trim(public_label)) between 2 and 160),
  status public.publication_status not null default 'draft',
  unresolved_fields text[] not null default '{}',
  publish_at timestamptz,
  unpublish_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  published_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  constraint opening_hours_time_consistency check (
    (is_closed = true and opens_at is null and closes_at is null)
    or
    (is_closed = false and opens_at is not null and closes_at is not null and opens_at < closes_at)
  ),
  constraint opening_hours_publication_window check (
    unpublish_at is null or publish_at is null or unpublish_at > publish_at
  )
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 2 and 120),
  message text not null check (char_length(trim(message)) between 2 and 500),
  level public.announcement_level not null default 'information',
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  link_label text,
  link_url text,
  status public.publication_status not null default 'draft',
  unresolved_fields text[] not null default '{}',
  publish_at timestamptz,
  unpublish_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  published_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  constraint announcement_time_window check (ends_at is null or ends_at > starts_at),
  constraint announcement_link_pair check (
    (link_label is null and link_url is null)
    or
    (nullif(trim(link_label), '') is not null and nullif(trim(link_url), '') is not null)
  ),
  constraint announcement_publication_window check (
    unpublish_at is null or publish_at is null or unpublish_at > publish_at
  )
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  original_filename text not null,
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp', 'image/avif')),
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 10485760),
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  alt_text text not null default '',
  caption text,
  decorative boolean not null default false,
  focal_x numeric(5,4) check (focal_x between 0 and 1),
  focal_y numeric(5,4) check (focal_y between 0 and 1),
  rights_confirmed boolean not null default false,
  status public.publication_status not null default 'draft',
  unresolved_fields text[] not null default '{}',
  publish_at timestamptz,
  unpublish_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  published_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  constraint media_alt_text_rule check (
    (decorative = true and alt_text = '')
    or
    (decorative = false and char_length(trim(alt_text)) between 2 and 240)
  ),
  constraint media_focal_point_pair check (
    (focal_x is null and focal_y is null)
    or
    (focal_x is not null and focal_y is not null)
  ),
  constraint media_publication_window check (
    unpublish_at is null or publish_at is null or unpublish_at > publish_at
  )
);

create table public.second_hand_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(trim(title)) between 2 and 120),
  description text not null check (char_length(trim(description)) between 10 and 2000),
  dimensions text,
  materials text[] not null default '{}',
  condition_notes text not null check (char_length(trim(condition_notes)) between 2 and 1000),
  internal_state public.second_hand_state not null default 'active',
  availability_notice text not null default 'Saatavuus varmistettava.' check (char_length(trim(availability_notice)) between 2 and 160),
  seo_title text check (seo_title is null or char_length(trim(seo_title)) between 20 and 70),
  seo_description text check (seo_description is null or char_length(trim(seo_description)) between 60 and 180),
  status public.publication_status not null default 'draft',
  unresolved_fields text[] not null default '{}',
  publish_at timestamptz,
  unpublish_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  published_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  constraint second_hand_publication_window check (
    unpublish_at is null or publish_at is null or unpublish_at > publish_at
  )
);

create table public.second_hand_item_media (
  item_id uuid not null references public.second_hand_items(id) on delete cascade,
  media_id uuid not null references public.media_assets(id) on delete restrict,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  primary key (item_id, media_id)
);

create unique index one_primary_media_per_second_hand_item
  on public.second_hand_item_media(item_id)
  where is_primary = true;

create table public.content_revisions (
  id bigint generated always as identity primary key,
  content_type text not null,
  content_id uuid not null,
  action text not null check (action in ('created', 'updated', 'published', 'archived', 'deleted')),
  snapshot jsonb not null,
  changed_by uuid references auth.users(id) on delete set null,
  changed_at timestamptz not null default now(),
  change_note text
);

create index content_revisions_lookup_idx
  on public.content_revisions(content_type, content_id, changed_at desc);

create index announcements_public_lookup_idx
  on public.announcements(status, starts_at, ends_at, publish_at, unpublish_at);

create index opening_hour_exceptions_public_lookup_idx
  on public.opening_hour_exceptions(status, exception_date, publish_at, unpublish_at);

create index second_hand_items_public_lookup_idx
  on public.second_hand_items(status, internal_state, published_at desc);

create index media_assets_public_lookup_idx
  on public.media_assets(status, published_at desc);

create or replace function private.set_content_audit_fields()
returns trigger
language plpgsql
security definer
set search_path = private, public, auth
as $$
begin
  new.updated_at := now();
  new.updated_by := coalesce(auth.uid(), new.updated_by);

  if tg_op = 'INSERT' then
    new.created_by := coalesce(auth.uid(), new.created_by);
  end if;

  return new;
end;
$$;

create or replace function private.validate_publication_transition()
returns trigger
language plpgsql
security definer
set search_path = private, public, auth
as $$
declare
  document jsonb := to_jsonb(new);
  current_status public.publication_status := (document ->> 'status')::public.publication_status;
  old_status public.publication_status;
  unresolved text[] := coalesce(array(select jsonb_array_elements_text(document -> 'unresolved_fields')), '{}');
  forbidden_pattern constant text := '(VAHVISTETTAVA|TBD|TODO|PLACEHOLDER)';
begin
  if tg_op = 'UPDATE' then
    old_status := (to_jsonb(old) ->> 'status')::public.publication_status;
  end if;

  if current_status = 'approved' and (tg_op = 'INSERT' or old_status is distinct from 'approved') then
    if not private.has_usoy_role(array['approver', 'publisher', 'admin']) then
      raise exception 'Only an approver, publisher or admin can approve content.';
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

  if current_status = 'archived' and tg_op = 'UPDATE' and old_status = 'published' then
    if not private.has_usoy_role(array['publisher', 'admin']) then
      raise exception 'Only a publisher or admin can archive published content.';
    end if;
  end if;

  return new;
end;
$$;

create or replace function private.validate_media_publication()
returns trigger
language plpgsql
security definer
set search_path = private, public, auth
as $$
begin
  if new.status = 'published' then
    if new.rights_confirmed is not true then
      raise exception 'Image rights must be confirmed before publication.';
    end if;

    if new.decorative is false and char_length(trim(new.alt_text)) < 2 then
      raise exception 'Informative images require alt text before publication.';
    end if;
  end if;

  return new;
end;
$$;

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

  return coalesce(new, old);
end;
$$;

revoke all on function private.set_content_audit_fields() from public;
revoke all on function private.validate_publication_transition() from public;
revoke all on function private.validate_media_publication() from public;
revoke all on function private.write_content_revision() from public;

grant execute on function private.set_content_audit_fields() to authenticated;
grant execute on function private.validate_publication_transition() to authenticated;
grant execute on function private.validate_media_publication() to authenticated;
grant execute on function private.write_content_revision() to authenticated;

create trigger opening_hour_exceptions_audit_fields
before insert or update on public.opening_hour_exceptions
for each row execute function private.set_content_audit_fields();

create trigger opening_hour_exceptions_publication_guard
before insert or update on public.opening_hour_exceptions
for each row execute function private.validate_publication_transition();

create trigger opening_hour_exceptions_revision
After insert or update or delete on public.opening_hour_exceptions
for each row execute function private.write_content_revision();

create trigger announcements_audit_fields
before insert or update on public.announcements
for each row execute function private.set_content_audit_fields();

create trigger announcements_publication_guard
before insert or update on public.announcements
for each row execute function private.validate_publication_transition();

create trigger announcements_revision
after insert or update or delete on public.announcements
for each row execute function private.write_content_revision();

create trigger media_assets_audit_fields
before insert or update on public.media_assets
for each row execute function private.set_content_audit_fields();

create trigger media_assets_publication_guard
before insert or update on public.media_assets
for each row execute function private.validate_publication_transition();

create trigger media_assets_accessibility_guard
before insert or update on public.media_assets
for each row execute function private.validate_media_publication();

create trigger media_assets_revision
after insert or update or delete on public.media_assets
for each row execute function private.write_content_revision();

create trigger second_hand_items_audit_fields
before insert or update on public.second_hand_items
for each row execute function private.set_content_audit_fields();

create trigger second_hand_items_publication_guard
before insert or update on public.second_hand_items
for each row execute function private.validate_publication_transition();

create trigger second_hand_items_revision
after insert or update or delete on public.second_hand_items
for each row execute function private.write_content_revision();

alter table public.opening_hour_exceptions enable row level security;
alter table public.announcements enable row level security;
alter table public.media_assets enable row level security;
alter table public.second_hand_items enable row level security;
alter table public.second_hand_item_media enable row level security;
alter table public.content_revisions enable row level security;

create policy opening_hour_exceptions_public_read
on public.opening_hour_exceptions
for select
to anon, authenticated
using (
  status = 'published'
  and (publish_at is null or publish_at <= now())
  and (unpublish_at is null or unpublish_at > now())
);

create policy opening_hour_exceptions_admin_manage
on public.opening_hour_exceptions
for all
to authenticated
using (private.is_usoy_admin())
with check (private.is_usoy_admin());

create policy announcements_public_read
on public.announcements
for select
to anon, authenticated
using (
  status = 'published'
  and starts_at <= now()
  and (ends_at is null or ends_at > now())
  and (publish_at is null or publish_at <= now())
  and (unpublish_at is null or unpublish_at > now())
);

create policy announcements_admin_manage
on public.announcements
for all
to authenticated
using (private.is_usoy_admin())
with check (private.is_usoy_admin());

create policy media_assets_public_read
on public.media_assets
for select
to anon, authenticated
using (
  status = 'published'
  and rights_confirmed = true
  and (publish_at is null or publish_at <= now())
  and (unpublish_at is null or unpublish_at > now())
);

create policy media_assets_admin_manage
on public.media_assets
for all
to authenticated
using (private.is_usoy_admin())
with check (private.is_usoy_admin());

create policy second_hand_items_public_read
on public.second_hand_items
for select
to anon, authenticated
using (
  status = 'published'
  and internal_state = 'active'
  and (publish_at is null or publish_at <= now())
  and (unpublish_at is null or unpublish_at > now())
);

create policy second_hand_items_admin_manage
on public.second_hand_items
for all
to authenticated
using (private.is_usoy_admin())
with check (private.is_usoy_admin());

create policy second_hand_item_media_public_read
on public.second_hand_item_media
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.second_hand_items item
    where item.id = second_hand_item_media.item_id
      and item.status = 'published'
      and item.internal_state = 'active'
      and (item.publish_at is null or item.publish_at <= now())
      and (item.unpublish_at is null or item.unpublish_at > now())
  )
  and exists (
    select 1
    from public.media_assets media
    where media.id = second_hand_item_media.media_id
      and media.status = 'published'
      and media.rights_confirmed = true
      and (media.publish_at is null or media.publish_at <= now())
      and (media.unpublish_at is null or media.unpublish_at > now())
  )
);

create policy second_hand_item_media_admin_manage
on public.second_hand_item_media
for all
to authenticated
using (private.is_usoy_admin())
with check (private.is_usoy_admin());

create policy content_revisions_admin_read
on public.content_revisions
for select
to authenticated
using (private.is_usoy_admin());

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
) values (
  'usoy-content-media',
  'usoy-content-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy usoy_content_media_public_read
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'usoy-content-media');

create policy usoy_content_media_admin_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'usoy-content-media'
  and private.is_usoy_admin()
);

create policy usoy_content_media_admin_update
on storage.objects
for update
to authenticated
using (
  bucket_id = 'usoy-content-media'
  and private.is_usoy_admin()
)
with check (
  bucket_id = 'usoy-content-media'
  and private.is_usoy_admin()
);

create policy usoy_content_media_admin_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'usoy-content-media'
  and private.is_usoy_admin()
);

comment on table public.opening_hour_exceptions is 'Published exceptions to the typed normal opening hours stored in the application.';
comment on table public.announcements is 'Time-limited website announcements. No unverified promises may be published.';
comment on table public.second_hand_items is 'Individually managed second hand luminaires. Public availability is always presented as requiring confirmation.';
comment on table public.media_assets is 'Website image metadata, accessibility text and rights confirmation.';
comment on table public.content_revisions is 'Immutable content snapshots written by database triggers.';

commit;
