-- Setup Initial Schema for AnanTTrails

-- 1. Profiles Table (Linked to Auth Users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  explorer_rank text default 'Wanderer' check (explorer_rank in ('Wanderer', 'Pathfinder', 'Nomad', 'Legendary Explorer')),
  countries_visited integer default 0,
  verifications_count integer default 0,
  travel_style text default 'Backpacker',
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on public.profiles
  for update using (auth.uid() = id);

-- 2. Posts Table (Travel Posts with 6-dimension ratings)
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  destination text not null,
  category text not null, -- 'beaches', 'mountains', 'cities', 'heritage', etc.
  content text not null,
  rating_safety integer check (rating_safety between 1 and 5),
  rating_budget integer check (rating_budget between 1 and 5),
  rating_culture integer check (rating_culture between 1 and 5),
  rating_nature integer check (rating_nature between 1 and 5),
  rating_crowds integer check (rating_crowds between 1 and 5),
  rating_connectivity integer check (rating_connectivity between 1 and 5),
  freshness_votes_accurate integer default 1 not null,
  freshness_votes_total integer default 1 not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Posts
alter table public.posts enable row level security;

create policy "Posts are viewable by everyone." on public.posts
  for select using (true);

create policy "Authenticated users can create posts." on public.posts
  for insert with check (auth.role() = 'authenticated');

create policy "Users can update their own posts." on public.posts
  for update using (auth.uid() = author_id);

create policy "Users can delete their own posts." on public.posts
  for delete using (auth.uid() = author_id);

-- 3. Comments Table
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Comments
alter table public.comments enable row level security;

create policy "Comments are viewable by everyone." on public.comments
  for select using (true);

create policy "Authenticated users can create comments." on public.comments
  for insert with check (auth.role() = 'authenticated');

create policy "Users can delete their own comments." on public.comments
  for delete using (auth.uid() = author_id);

-- 4. Collaborative Trips Table
create table public.collaborative_trips (
  id uuid default gen_random_uuid() primary key,
  creator_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  destination text not null,
  start_date date not null,
  end_date date not null,
  budget text not null,
  max_participants integer default 5 not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Collaborative Trips
alter table public.collaborative_trips enable row level security;

create policy "Collaborative trips are viewable by everyone." on public.collaborative_trips
  for select using (true);

create policy "Authenticated users can create collaborative trips." on public.collaborative_trips
  for insert with check (auth.role() = 'authenticated');

create policy "Creators can update/delete their collaborative trips." on public.collaborative_trips
  for all using (auth.uid() = creator_id);

-- 5. Trip Participants Table
create table public.trip_participants (
  trip_id uuid references public.collaborative_trips(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'joined')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (trip_id, user_id)
);

-- Enable RLS for Trip Participants
alter table public.trip_participants enable row level security;

create policy "Trip participants are viewable by everyone." on public.trip_participants
  for select using (true);

create policy "Users can apply to join a trip." on public.trip_participants
  for insert with check (auth.uid() = user_id);

create policy "Users can leave a trip or creators can manage members." on public.trip_participants
  for all using (
    auth.uid() = user_id or 
    auth.uid() = (select creator_id from public.collaborative_trips where id = trip_id)
  );

-- 6. Tribes Table
create table public.tribes (
  id text primary key,
  name text not null,
  description text not null,
  image_url text,
  members_count integer default 0 not null
);

-- Enable RLS for Tribes
alter table public.tribes enable row level security;

create policy "Tribes are viewable by everyone." on public.tribes
  for select using (true);

-- 7. Tribe Members Table
create table public.tribe_members (
  tribe_id text references public.tribes(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (tribe_id, user_id)
);

-- Enable RLS for Tribe Members
alter table public.tribe_members enable row level security;

create policy "Tribe membership is viewable by everyone." on public.tribe_members
  for select using (true);

create policy "Users can join a tribe." on public.tribe_members
  for insert with check (auth.uid() = user_id);

create policy "Users can leave a tribe." on public.tribe_members
  for delete using (auth.uid() = user_id);

-- Triggers for managing profiles
-- Create a trigger that automatically adds a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', substring(new.email from '([^@]+)')),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
