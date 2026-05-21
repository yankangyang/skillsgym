-- SkillsGym database schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Auth is stubbed: user_id is a plain UUID for now, swappable for auth.uid() later

-- ─────────────────────────────────────────
-- USERS
-- ─────────────────────────────────────────
create table if not exists users (
  id                uuid primary key default gen_random_uuid(),
  email             text unique not null,
  name              text,
  background        text check (background in ('mba', 'undergrad', 'career_switcher', 'experienced_hire')),
  target_firms      text[]   default '{}',
  interview_timeline text,                          -- e.g. "3 months", "6 months"
  plan              text     default 'free' check (plan in ('free', 'sprint', 'full_prep')),
  is_public         boolean  default false,          -- leaderboard opt-in
  streak            int      default 0,
  longest_streak    int      default 0,
  last_active_date  date,
  created_at        timestamptz default now()
);


-- ─────────────────────────────────────────
-- DRILL CONTENT  (admin-seeded)
-- ─────────────────────────────────────────
create table if not exists drill_questions (
  id            uuid primary key default gen_random_uuid(),
  category      text not null check (category in ('math', 'structuring', 'sizing', 'behavioral')),
  subcategory   text,                                -- e.g. 'percentages', 'profitability'
  difficulty    text check (difficulty in ('easy', 'medium', 'hard')),
  firm          text,                                -- firm-specific behavioral sets
  prompt        text not null,
  -- MCQ fields (math + diagnostic)
  options       jsonb,                               -- ["A) ...", "B) ...", ...]
  correct_index int,
  explanation   text,
  -- Open-ended fields (structuring, sizing, behavioral)
  model_answer  text,
  rubric        jsonb,                               -- ["MECE", "Breadth", ...]
  meta          jsonb,                               -- category-specific extras (approaches, steps, etc.)
  created_at    timestamptz default now()
);


-- ─────────────────────────────────────────
-- DIAGNOSTIC CONTENT  (admin-seeded)
-- ─────────────────────────────────────────
create table if not exists diagnostic_questions (
  id            uuid primary key default gen_random_uuid(),
  category      text not null check (category in ('math', 'structuring', 'sizing', 'behavioral')),
  question      text not null,
  options       jsonb not null,                      -- ["A) ...", "B) ...", ...]
  correct_index int not null,
  explanation   text,
  created_at    timestamptz default now()
);


-- ─────────────────────────────────────────
-- DIAGNOSTIC RESULTS  (per user attempt)
-- ─────────────────────────────────────────
create table if not exists diagnostic_results (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references users(id) on delete cascade,
  overall_score     int check (overall_score between 0 and 100),
  math_score        int check (math_score between 0 and 100),
  structuring_score int check (structuring_score between 0 and 100),
  sizing_score      int check (sizing_score between 0 and 100),
  behavioral_score  int check (behavioral_score between 0 and 100),
  readiness_label   text,                            -- 'Below MBB threshold' | 'Approaching MBB' | 'MBB Ready'
  priority_fix      text,                            -- weakest category name
  answers           jsonb,                           -- [{question_id, selected_index, correct}]
  completed_at      timestamptz default now()
);


-- ─────────────────────────────────────────
-- DRILL SESSIONS  (per user practice run)
-- ─────────────────────────────────────────
create table if not exists drill_sessions (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid references users(id) on delete cascade,
  category             text not null check (category in ('math', 'structuring', 'sizing', 'behavioral')),
  score                int check (score between 0 and 100),
  questions_attempted  int default 0,
  questions_correct    int default 0,
  duration_seconds     int,
  completed_at         timestamptz default now()
);


-- ─────────────────────────────────────────
-- STORY BANK
-- ─────────────────────────────────────────
create table if not exists stories (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references users(id) on delete cascade,
  theme       text not null,                         -- 'Leadership', 'Conflict Resolution', etc.
  situation   text default '',
  task        text default '',
  action      text default '',
  result      text default '',
  firms       text[] default '{}',
  status      text default 'empty' check (status in ('empty', 'complete')),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- auto-update updated_at
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger stories_updated_at
  before update on stories
  for each row execute procedure touch_updated_at();


-- ─────────────────────────────────────────
-- RESUME ANALYSES
-- ─────────────────────────────────────────
create table if not exists resume_analyses (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references users(id) on delete cascade,
  resume_text         text not null,
  survival_score      int check (survival_score between 0 and 100),
  impact_score        int check (impact_score between 0 and 100),
  action_verb_score   int check (action_verb_score between 0 and 100),
  mbb_relevance_score int check (mbb_relevance_score between 0 and 100),
  format_score        int check (format_score between 0 and 100),
  feedback            jsonb,                         -- [{bullet, issues[], suggestion}]
  created_at          timestamptz default now()
);


-- ─────────────────────────────────────────
-- DAILY CHALLENGES  (admin-seeded, one per day)
-- ─────────────────────────────────────────
create table if not exists challenge_prompts (
  id            uuid primary key default gen_random_uuid(),
  prompt_date   date unique not null,
  category      text not null,
  difficulty    text check (difficulty in ('easy', 'medium', 'hard')),
  prompt        text not null,
  closes_at     timestamptz not null,               -- midnight UTC of prompt_date + 1
  created_at    timestamptz default now()
);

create table if not exists challenge_submissions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references users(id) on delete cascade,
  prompt_id      uuid references challenge_prompts(id),
  response       text not null,
  score          int check (score between 0 and 100),
  time_seconds   int,
  created_at     timestamptz default now(),
  unique (user_id, prompt_id)                       -- one submission per user per day
);


-- ─────────────────────────────────────────
-- LEADERBOARD VIEW
-- Ranks users by their latest diagnostic overall_score.
-- Skill tabs use category scores from the same row.
-- ─────────────────────────────────────────
create or replace view leaderboard as
select
  u.id,
  u.name,
  u.background,
  u.streak,
  dr.overall_score,
  dr.math_score,
  dr.structuring_score,
  dr.sizing_score,
  dr.behavioral_score,
  rank() over (order by dr.overall_score desc nulls last) as overall_rank,
  rank() over (order by dr.math_score desc nulls last) as math_rank,
  rank() over (order by dr.structuring_score desc nulls last) as structuring_rank,
  rank() over (order by dr.sizing_score desc nulls last) as sizing_rank,
  rank() over (order by dr.behavioral_score desc nulls last) as behavioral_rank
from users u
left join lateral (
  select * from diagnostic_results
  where user_id = u.id
  order by completed_at desc
  limit 1
) dr on true
where u.is_public = true;


-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY  (enable after auth is wired up)
-- Uncomment these once Supabase Auth is active.
-- ─────────────────────────────────────────

-- alter table users enable row level security;
-- alter table diagnostic_results enable row level security;
-- alter table drill_sessions enable row level security;
-- alter table stories enable row level security;
-- alter table resume_analyses enable row level security;
-- alter table challenge_submissions enable row level security;

-- create policy "users: own row" on users
--   for all using (auth.uid() = id);

-- create policy "diagnostic_results: own rows" on diagnostic_results
--   for all using (auth.uid() = user_id);

-- create policy "drill_sessions: own rows" on drill_sessions
--   for all using (auth.uid() = user_id);

-- create policy "stories: own rows" on stories
--   for all using (auth.uid() = user_id);

-- create policy "resume_analyses: own rows" on resume_analyses
--   for all using (auth.uid() = user_id);

-- create policy "challenge_submissions: own rows" on challenge_submissions
--   for all using (auth.uid() = user_id);
