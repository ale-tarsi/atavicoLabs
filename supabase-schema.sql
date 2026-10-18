-- Run this in the Supabase SQL editor to set up the audit_reports table

create table if not exists audit_reports (
  id                uuid        primary key default gen_random_uuid(),
  url               text        not null,
  email             text        not null,
  locale            text        not null default 'it',
  status            text        not null default 'pending',  -- pending | preview | done | error
  unlocked          boolean     not null default false,
  stripe_session_id text,
  paid_at           timestamptz,
  ip_address        text,
  pagespeed_data    jsonb,
  ai_report         jsonb,
  error_message     text,
  created_at        timestamptz not null default now()
);

-- Fast lookups by email (rate limiting + "my reports")
create index if not exists audit_reports_email_idx     on audit_reports (email);
-- Fast lookups by IP (rate limiting)
create index if not exists audit_reports_ip_idx        on audit_reports (ip_address);
-- Fast lookups by stripe session (webhook handler)
create index if not exists audit_reports_session_idx   on audit_reports (stripe_session_id);

-- Row Level Security: reports are readable by anyone with the ID (public share link)
alter table audit_reports enable row level security;

create policy "Reports are publicly readable by ID"
  on audit_reports for select
  using (true);

-- Only the server (service role) can insert/update — no direct client writes
-- (the API routes use the service role key which bypasses RLS)

-- ─── Migration: run these if the table already exists ───────────────────────
-- alter table audit_reports add column if not exists unlocked          boolean     not null default false;
-- alter table audit_reports add column if not exists stripe_session_id text;
-- alter table audit_reports add column if not exists paid_at           timestamptz;
-- alter table audit_reports add column if not exists ip_address        text;
-- create index if not exists audit_reports_ip_idx      on audit_reports (ip_address);
-- create index if not exists audit_reports_session_idx on audit_reports (stripe_session_id);
