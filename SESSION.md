# SkillsGym — Session Log

## Current Stack
- **Frontend**: Next.js 16.2.4 (Turbopack) — localhost:3002
- **Backend**: Fastify (api/) — localhost:4000, `npm run api:dev` — being phased out for Supabase
- **Database**: Supabase (Gym_V1, East US) — schema + seed live
- **Auth**: Not wired yet — using TEST_USER_ID hardcoded constant
- **Deploy**: Not set up yet (Vercel for frontend planned)

---

## Session: 2026-05-21

### What we built
- **Route restructure**: story bank moved to `/behavioral/story-bank`; leaderboard + challenge grouped under `/compete/leaderboard` and `/compete/challenge`
- **Challenge cadence**: changed from weekly to daily (resets midnight, copy updated throughout)
- **Monorepo**: Fastify backend copied into `api/` with npm workspaces; root script `npm run api:dev`
- **Supabase setup**: project linked (Gym_V1), schema pushed with 10 tables + leaderboard view, seed data live
- **Frontend wired to Supabase** (7 pages replaced mock data):
  - `/diagnostic` → `diagnostic_questions` table
  - `/drills/math` → `drill_questions` (category=math)
  - `/drills/behavioral-drill` → `drill_questions` (category=behavioral)
  - `/drills/sizing` → `drill_questions` (category=sizing)
  - `/behavioral/story-bank` → `stories` table
  - `/compete/leaderboard` → `leaderboard` view
  - `/compete/challenge` → `challenge_prompts` + `challenge_submissions`
- **Query layer**: `lib/supabase/queries.ts` — all typed Supabase query functions
- **Supabase client**: `lib/supabase.ts` — handles both ANON_KEY and PUBLISHABLE_KEY naming

### Key decisions
- Drop Fastify once Supabase is fully wired — API logic moves to Next.js API routes (`app/api/`)
- No Vercel yet — defer until auth is wired
- Auth deferred — placeholder `TEST_USER_ID = "00000000-0000-0000-0000-000000000001"` in queries.ts
- RLS policies drafted but commented out in schema.sql — uncomment when auth is live
- Leaderboard ranks by latest diagnostic overall_score (not drill averages)
- Challenge submissions: unique constraint (user_id, prompt_id) — one per user per day

### Still on mock data (not yet wired)
- `app/dashboard/page.tsx` — stats, today's plan, leaderboard preview
- `app/drills/structuring/page.tsx` — uses local constants (no mock import, low priority)
- `app/progress/page.tsx` — charts/heatmap
- `app/diagnostic/results/page.tsx` — results display

### Seeded data
- 12 diagnostic questions (3 per category)
- 20 drill questions (5 math, 1 structuring, 1 sizing, 10 behavioral, 3 firm-specific behavioral)
- 1 daily challenge prompt (2026-05-21)
- 1 test user (test@skillsgym.dev, UUID 00000000-0000-0000-0000-000000000001)

---

## Pending UI/UX changes
_Add items here as they come up_

### Design direction
- No decision yet — looking for references (dark SaaS dashboard, EdTech app)
- Good sources: Dribbble "SaaS dashboard dark", Mobbin for UI patterns, drop screenshots in chat

---

## Pending / Next session
- [ ] Wire remaining pages to Supabase (dashboard, progress, diagnostic results)
- [ ] Seed leaderboard with fake users so the view isn't empty
- [ ] Seed starter stories for test user
- [ ] Set up Supabase Auth (magic link or Google OAuth)
- [ ] Uncomment RLS policies once auth is live
- [ ] Build Next.js API routes to replace Fastify (resume scoring, diagnostic scoring)
- [ ] Vercel deploy setup
- [ ] Design direction decision — find reference screenshots

---

## Env / Infra reference
- Supabase project ref: `wjmsznwznmikkpnfncrq`
- Supabase region: East US (North Virginia)
- GitHub: github.com/yankangyang/skillsgym
- Keys in: `.env.local` (gitignored) — never commit
- Schema: `supabase/schema.sql` + migrations in `supabase/migrations/`
- Seed: `supabase/seed.sql`
