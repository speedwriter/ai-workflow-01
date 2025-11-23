create table business_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  industry text not null,
  target_audience text not null,
  tone text not null,
  short_bio text,
  sample_content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table business_profiles enable row level security;

create policy "Users can manage own profile" on business_profiles
  for all using (auth.uid() = user_id);
