-- ─────────────────────────────────────────────────────────────────────────
-- GreenTechCycle · table `reservations`
-- Persistance des leads qualifiés émis par /reserver et l'API
-- /api/reservation. Compatible Supabase PostgreSQL.
--
-- Apply with:  supabase db push   ou   psql -f reservations-schema.sql
-- ─────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- Enum des statuts du cycle de vie commercial
do $$
begin
  if not exists (select 1 from pg_type where typname = 'reservation_status') then
    create type reservation_status as enum ('nouveau', 'contacte', 'converti', 'perdu');
  end if;
end $$;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  offre_slug text,                  -- ex: waki-box-confort, waki-box-pilote, audit-deee
  source text default 'site-reserver',

  -- Coordonnées du prospect
  nom text not null,
  email text not null,
  telephone text,

  -- Organisation
  entreprise text not null,
  taille text,                      -- tpe / pme / eti / grand-compte
  persona text,                     -- office-manager / rse / dsi / rssi / daf / achats / autre

  -- Besoin
  sites text,
  volumes_ou_besoins text,
  message text,
  creneaux text[] default '{}',

  -- Suivi commercial interne
  status reservation_status not null default 'nouveau',
  notes_internes text
);

-- Indexes utiles au pilotage commercial
create index if not exists reservations_created_at_idx on public.reservations (created_at desc);
create index if not exists reservations_status_idx on public.reservations (status);
create index if not exists reservations_offre_slug_idx on public.reservations (offre_slug);
create index if not exists reservations_email_idx on public.reservations (lower(email));

-- Trigger updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists trg_reservations_updated_at on public.reservations;
create trigger trg_reservations_updated_at
  before update on public.reservations
  for each row execute function public.touch_updated_at();

-- Row Level Security :
-- Les écritures côté site sont faites avec la SERVICE_ROLE_KEY (bypass RLS).
-- Pour les éventuelles lectures côté tableau de bord interne, créez vos
-- propres policies en fonction du rôle authentifié.
alter table public.reservations enable row level security;
revoke all on public.reservations from anon;

-- Pour autoriser l'INSERT côté anon avec NEXT_PUBLIC_SUPABASE_ANON_KEY
-- (si vous ne pouvez pas mettre en place la SERVICE_ROLE_KEY côté serveur),
-- ajoutez la policy suivante :
--
-- create policy "anon_can_insert_reservation"
--   on public.reservations for insert
--   to anon
--   with check (true);
