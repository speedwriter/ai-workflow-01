-- Create a table for public profiles
create table users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique,
  name text,
  plan text default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table users enable row level security;

create policy "Users can view their own profile." on users
  for select using (auth.uid() = id);

create policy "Users can update their own profile." on users
  for update using (auth.uid() = id);

-- This triggers a function every time a user signs up
-- to insert a row into the public.users table
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
