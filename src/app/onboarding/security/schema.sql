-- Create security_logs table
create table if not exists public.security_logs (
    id uuid not null default uuid_generate_v4() primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    event_type text not null, -- 'password_change', 'mfa_enroll', 'mfa_verify', 'login'
    ip_address text,
    user_agent text,
    details jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.security_logs enable row level security;

-- Users can view their own logs
drop policy if exists "Users can view their own security logs" on public.security_logs;
create policy "Users can view their own security logs"
on public.security_logs for select
to authenticated
using ( auth.uid() = user_id );

-- Only system/server can insert logs (or users for their own actions via safe RPC functions if needed, 
-- but usually we want to control this via server actions with service role or strict validation).
-- For now, allowing insert for authenticated users for simplicity in server actions that run as user, 
-- ideally this should be cleaner, but RLS `with check` ensures user_id matches.
drop policy if exists "Users can insert their own security logs" on public.security_logs;
create policy "Users can insert their own security logs"
on public.security_logs for insert
to authenticated
with check ( auth.uid() = user_id );
