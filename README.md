# Consulting Prep Gym

Consulting Prep Gym is a full-funnel interview prep platform that starts before the case interview. The launch wedge combines a resume screen, a diagnostic, behavioral prep, and targeted drills so candidates know where they will fail before they burn money on coaching.

## Phase 1

- Free resume screen with consulting-specific feedback
- Free diagnostic across math, structuring, sizing, and behavioral
- Paid sprint with drills, story bank, and readiness tracking

## Stack

- Next.js with the App Router
- TypeScript
- JSON content libraries for drill and rubric scaffolding

## Project Structure

- `app/`: frontend routes and global styling
- `content/`: vertical-specific rubrics and content seeds
- `docs/`: product brief and implementation notes
- `src/lib/domain/`: typed product and schema definitions

## Next Steps

1. Install dependencies with `npm install`.
2. Run the app with `npm run dev`.
3. Start implementing the Phase 1 flows:
   - resume upload and scoring
   - diagnostic runner
   - paid drill surfaces

