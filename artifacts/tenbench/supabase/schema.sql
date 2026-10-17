-- 10Bench website: Supabase schema.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run.

-- SEO / AEO / GEO settings edited from /admin (a single row with id 'seo').
create table if not exists public.site_settings (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Contact-form enquiries from the website.
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 160),
  phone text check (char_length(phone) <= 30),
  interest text check (char_length(interest) <= 80),
  message text not null check (char_length(message) between 1 and 3000),
  page text check (char_length(page) <= 200),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  notes text check (char_length(notes) <= 2000)
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

-- Row-level security ON with no policies: the public (anon) key can neither read nor write.
-- Only the website's server, using the service-role key, can access these tables.
alter table public.site_settings enable row level security;
alter table public.enquiries enable row level security;
