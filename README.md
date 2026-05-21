# SkillsGym — Consulting Prep Gym

Full-funnel consulting interview prep. Starts with a resume screen and diagnostic, not a practice case.

## Phase 1

- Free resume screen with consulting-specific feedback
- Free diagnostic across math, structuring, sizing, and behavioral
- Paid sprint with drills, story bank, and readiness tracking

## Stack

- **Next.js 16** — App Router, TypeScript
- **Tailwind CSS v4** + **shadcn/ui** — UI components
- **Supabase** — database, auth, storage
- React 19

## Project Structure

- `app/` — Next.js routes and global styles
- `src/components/` — shared React components
- `src/lib/domain/` — typed schemas (UserProfile, DrillQuestion, etc.)
- `components/ui/` — shadcn/ui components
- `content/` — vertical-specific rubrics and content seeds
- `docs/` — product brief and implementation notes
- `wireframes/` — static HTML prototypes (reference only)

## Setup

```bash
npm install
# Fill in .env.local:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
npm run dev
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## Verticals

- Consulting (live)
- Private Equity — coming 2026
- MMI Medical — coming 2026
- VC — coming 2026
