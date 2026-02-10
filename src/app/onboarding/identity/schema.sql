-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create specific bucket for hospital logos
insert into storage.buckets (id, name, public)
values ('hospital-logos', 'hospital-logos', true)
on conflict (id) do nothing;

-- Set up RLS for storage (Allow authenticated users to upload)
drop policy if exists "Authenticated users can upload logos" on storage.objects;
create policy "Authenticated users can upload logos"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'hospital-logos' );

drop policy if exists "Public can view logos" on storage.objects;
create policy "Public can view logos"
on storage.objects for select
to public
using ( bucket_id = 'hospital-logos' );

-- Create the hospitals table
create table if not exists public.hospitals (
    id uuid not null default uuid_generate_v4() primary key,
    admin_id uuid not null references auth.users(id) on delete cascade,
    name text not null,
    type text not null check (type in ('opd', 'panchkarma', 'hospital', 'wellness')),
    reg_number text,
    doctor_name text not null,
    doctor_reg_number text not null,
    mobile text not null,
    email text not null,
    website text,
    logo_url text,      -- Public URL of the uploaded logo
    logo_path text,     -- Storage path (for deletion/updates)
    legal_confirmation boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    
    -- Enforce one hospital per admin user
    constraint hospitals_admin_id_key unique (admin_id)
);

-- Enable Row Level Security
alter table public.hospitals enable row level security;

-- Policies
drop policy if exists "Users can view their own hospital" on public.hospitals;
create policy "Users can view their own hospital"
on public.hospitals for select
to authenticated
using ( auth.uid() = admin_id );

drop policy if exists "Users can insert their own hospital" on public.hospitals;
create policy "Users can insert their own hospital"
on public.hospitals for insert
to authenticated
with check ( auth.uid() = admin_id );

drop policy if exists "Users can update their own hospital" on public.hospitals;
create policy "Users can update their own hospital"
on public.hospitals for update
to authenticated
using ( auth.uid() = admin_id );

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists handle_hospitals_updated_at on public.hospitals;
create trigger handle_hospitals_updated_at
    before update on public.hospitals
    for each row
    execute function public.handle_updated_at();
