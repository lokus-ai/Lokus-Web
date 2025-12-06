-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Publishers Table
create table public.publishers (
  id text primary key, -- The handle, e.g., 'lokus-official'
  owner_id uuid references auth.users(id) not null,
  display_name text not null,
  verified boolean default false,
  contact_email text,
  website_url text,
  github_handle text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint handle_format check (id ~* '^[a-z0-9_-]+$')
);

-- RLS for Publishers
alter table public.publishers enable row level security;

create policy "Public publishers are viewable by everyone."
  on public.publishers for select
  using ( true );

create policy "Users can create their own publisher profile."
  on public.publishers for insert
  with check ( auth.uid() = owner_id );

create policy "Users can update their own publisher profile."
  on public.publishers for update
  using ( auth.uid() = owner_id );

-- 2. Plugins Table
create table public.plugins (
  id text primary key, -- e.g., 'lokus.pomodoro'
  publisher_id text references public.publishers(id) not null,
  name text not null,
  description text,
  icon_url text,
  latest_version text,
  downloads bigint default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Plugins
alter table public.plugins enable row level security;

create policy "Plugins are viewable by everyone."
  on public.plugins for select
  using ( true );

create policy "Publishers can insert plugins."
  on public.plugins for insert
  with check ( exists (
    select 1 from public.publishers
    where id = publisher_id and owner_id = auth.uid()
  ));

create policy "Publishers can update their plugins."
  on public.plugins for update
  using ( exists (
    select 1 from public.publishers
    where id = publisher_id and owner_id = auth.uid()
  ));

-- 3. Plugin Versions Table
create table public.plugin_versions (
  id uuid default uuid_generate_v4() primary key,
  plugin_id text references public.plugins(id) not null,
  version text not null, -- Semver, e.g., '1.0.0'
  storage_path text not null, -- Path in storage bucket
  readme text, -- Markdown content
  changelog text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(plugin_id, version)
);

-- RLS for Plugin Versions
alter table public.plugin_versions enable row level security;

create policy "Versions are viewable by everyone."
  on public.plugin_versions for select
  using ( true );

create policy "Publishers can insert versions."
  on public.plugin_versions for insert
  with check ( exists (
    select 1 from public.plugins p
    join public.publishers pub on p.publisher_id = pub.id
    where p.id = plugin_id and pub.owner_id = auth.uid()
  ));

-- 4. API Keys Table (for CLI)
create table public.api_keys (
  id uuid default uuid_generate_v4() primary key,
  publisher_id text references public.publishers(id) not null,
  key_hash text not null, -- Store hashed token
  label text,
  last_used_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for API Keys (Only owner can see/manage)
alter table public.api_keys enable row level security;

create policy "Publishers can view their own keys."
  on public.api_keys for select
  using ( exists (
    select 1 from public.publishers
    where id = publisher_id and owner_id = auth.uid()
  ));

create policy "Publishers can delete their own keys."
  on public.api_keys for delete
  using ( exists (
    select 1 from public.publishers
    where id = publisher_id and owner_id = auth.uid()
  ));
