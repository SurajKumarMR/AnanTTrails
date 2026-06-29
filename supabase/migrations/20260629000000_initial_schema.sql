-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles
CREATE TABLE public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  travel_style text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Posts
CREATE TABLE public.posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text,
  destination text not null,
  images text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ratings
CREATE TABLE public.ratings (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references public.posts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  score integer check(score >= 1 and score <= 5) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Collaborative Trips
CREATE TABLE public.collaborative_trips (
  id uuid primary key default uuid_generate_v4(),
  creator_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  start_date date,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tribes
CREATE TABLE public.tribes (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  description text,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
