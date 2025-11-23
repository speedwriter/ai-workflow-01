-- 1. CLEANUP (Drop existing objects to avoid conflicts)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.business_profiles;
drop table if exists public.users;

-- 2. CREATE USERS TABLE
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique,
  name text,
  plan text default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Users
alter table public.users enable row level security;
create policy "Users can view their own profile." on public.users for select using (auth.uid() = id);
create policy "Users can update their own profile." on public.users for update using (auth.uid() = id);

-- 3. CREATE AUTH HOOK (Function & Trigger)
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. CREATE BUSINESS PROFILES TABLE
create table public.business_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  industry text not null,
  target_audience text not null,
  tone text not null,
  short_bio text,
  sample_content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Business Profiles
alter table public.business_profiles enable row level security;
create policy "Users can manage own profile" on public.business_profiles for all using (auth.uid() = user_id);
