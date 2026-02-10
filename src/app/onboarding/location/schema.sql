-- Page 5: Location & Infrastructure field updates for hospitals table

-- Add location fields
alter table public.hospitals 
add column if not exists address text,
add column if not exists city text,
add column if not exists state text,
add column if not exists pincode text;

-- Add branch support fields
alter table public.hospitals
add column if not exists is_multi_branch boolean default false,
add column if not exists branch_name text,
add column if not exists branch_code text;

-- Add infrastructure/capacity fields
alter table public.hospitals
add column if not exists consultation_rooms integer default 0,
add column if not exists therapy_rooms integer default 0,
add column if not exists has_ipd boolean default false,
add column if not exists ipd_beds integer default 0,
add column if not exists bed_categories text[] default '{}';
