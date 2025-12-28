create extension if not exists pgcrypto;

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- optional but recommended: prevent duplicate tenant names (case-insensitive)
create unique index if not exists tenants_name_unique on public.tenants (lower(name));

create table if not exists public.profiles (
  id uuid primary key, -- same as auth.users.id
  email text,
  phone text,
  country_code text,
  phone_number text,
  created_at timestamptz not null default now()
);

create table if not exists public.tenant_members (
  user_id uuid not null references public.profiles(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  role text not null check (role in ('admin','manager','member')),
  created_at timestamptz not null default now(),
  primary key (user_id, tenant_id)
);

create index if not exists tenant_members_user_idx on public.tenant_members(user_id);
create index if not exists tenant_members_tenant_idx on public.tenant_members(tenant_id);

create table if not exists public.invites (
  token text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  role text not null check (role in ('admin','manager','member')),
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists invites_tenant_idx on public.invites(tenant_id);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
as $$
declare
  v_tenant_id uuid;
  v_invite record;
  v_tenant_name text;
  v_tenant_id_from_meta uuid;
  v_invite_token text;
  v_role text;
begin
  -- 1) create profile row
  insert into public.profiles (id, email, phone, country_code, phone_number)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'country_code', 
    new.raw_user_meta_data->>'phone_number'
  );

  v_invite_token := new.raw_user_meta_data->>'invite_token';
  v_tenant_name := new.raw_user_meta_data->>'tenant_name';
  v_tenant_id_from_meta := (new.raw_user_meta_data->>'tenant_id')::uuid;
  v_role := coalesce(new.raw_user_meta_data->>'role', 'admin'); -- Default to 'admin' if not provided

  -- 2) invite signup
  if v_invite_token is not null then
    select *
      into v_invite
    from public.invites
    where token = v_invite_token
      and used_at is null
      and expires_at > now();

    if not found then
      raise exception 'Invalid or expired invite';
    end if;

    v_tenant_id := v_invite.tenant_id;

    insert into public.tenant_members (user_id, tenant_id, role)
    values (new.id, v_tenant_id, v_invite.role);

    update public.invites
    set used_at = now()
    where token = v_invite_token;

    return new;
  end if;

  -- 3a) Seeding: Use explicit tenant_id if provided
  if v_tenant_id_from_meta is not null then
    -- Verify tenant exists
    select id into v_tenant_id
    from public.tenants
    where id = v_tenant_id_from_meta;

    if not found then
      raise exception 'Tenant with id % does not exist', v_tenant_id_from_meta;
    end if;

    insert into public.tenant_members (user_id, tenant_id, role)
    values (new.id, v_tenant_id, v_role); -- Use role from metadata

    return new;
  end if;

  -- 3b) Production: self-serve signup (create new tenant)
  if v_tenant_name is null or length(trim(v_tenant_name)) = 0 then
    raise exception 'tenant_name or tenant_id is required when no invite_token is provided';
  end if;

  insert into public.tenants (name)
  values (trim(v_tenant_name))
  returning id into v_tenant_id;

  insert into public.tenant_members (user_id, tenant_id, role)
  values (new.id, v_tenant_id, v_role); -- Use role from metadata (defaults to 'admin')

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.tenant_members enable row level security;
alter table public.invites enable row level security;
