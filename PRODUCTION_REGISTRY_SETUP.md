# Production Registry Setup Guide (For AI Agent)

**Context:**
We have implemented a full Plugin Registry and Marketplace within this Next.js application (`Lokus-Web`). It allows users to publish, search, and download plugins for the Lokus Desktop App. The backend relies on Supabase for authentication, database, and file storage.

**Current State:**
- **API Routes:** Implemented in `app/api/v1/registry`.
  - `POST /publish`: Handles plugin uploads (validates token, uploads zip to storage, updates DB).
  - `GET /download/...`: (Check implementation) Serves plugin files.
  - `GET /search`: (Check implementation) Returns plugin lists.
- **Frontend:** Implemented in `app/marketplace`.
  - Fetches data directly from Supabase `plugins` table.

**Your Task:**
You need to ensure the production environment (Supabase) is correctly configured to support this code.

## 1. Database Schema Setup
Execute the following SQL in the Supabase SQL Editor to create the necessary tables.

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Publishers Table
create table public.publishers (
  id uuid default uuid_generate_v4() primary key,
  display_name text not null,
  contact_email text,
  created_at timestamptz default now()
);

-- 2. API Keys Table (for CLI authentication)
create table public.api_keys (
  id uuid default uuid_generate_v4() primary key,
  publisher_id uuid references public.publishers(id) on delete cascade not null,
  key_hash text not null, -- Store SHA-256 hash of the token
  created_at timestamptz default now(),
  last_used_at timestamptz
);

-- 3. Plugins Table
create table public.plugins (
  id text primary key, -- Format: "publisher.plugin-name"
  publisher_id uuid references public.publishers(id) on delete cascade not null,
  name text not null,
  description text,
  icon_url text,
  latest_version text,
  downloads bigint default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Plugin Versions Table
create table public.plugin_versions (
  id uuid default uuid_generate_v4() primary key,
  plugin_id text references public.plugins(id) on delete cascade not null,
  version text not null,
  storage_path text not null, -- Path in 'plugin-releases' bucket
  readme text,
  changelog text,
  created_at timestamptz default now(),
  unique(plugin_id, version)
);

-- Enable RLS (Row Level Security)
alter table public.publishers enable row level security;
alter table public.api_keys enable row level security;
alter table public.plugins enable row level security;
alter table public.plugin_versions enable row level security;

-- Policies (Adjust as needed for your auth model)
-- Public read access
create policy "Public plugins are viewable by everyone" on public.plugins for select using (true);
create policy "Public versions are viewable by everyone" on public.plugin_versions for select using (true);
create policy "Public publishers are viewable by everyone" on public.publishers for select using (true);
```

## 2. Storage Setup
1.  Create a new Storage Bucket named **`plugin-releases`**.
2.  **Access:**
    *   If you want public downloads without signed URLs, make it **Public**.
    *   Otherwise, keep it private and update the download API to generate signed URLs.
3.  **CORS:** Configure CORS to allow uploads from your domain if doing browser uploads (CLI uploads go through your API route, so server-side upload doesn't need CORS).

## 3. Environment Variables
Ensure the production environment has these variables set:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... (Required for admin tasks if any)
```

## 4. Verification & User Interaction
**Ask the user the following:**
1.  "Have you created the Supabase project and tables using the provided SQL?"
2.  "Is the `plugin-releases` bucket created?"
3.  "Do you need a script to generate the first Publisher and API Key for testing?"

**If the user needs an API Key:**
Generate a random token (e.g., `lokus_...`), hash it with SHA-256, and insert it into the `api_keys` table linked to a publisher. Give the *raw* token to the user for their CLI.
