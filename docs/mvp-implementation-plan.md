# Phase 1 MVP Implementation Plan

## Goal

Ship the launch wedge with the smallest surface area that still proves the product thesis:

1. Free resume screen
2. Free diagnostic
3. Paid drills and behavioral prep

## Suggested Application Slices

### Marketing and Entry

- `/`: product narrative and wedge explanation
- `/resume-screen`: upload or paste resume text, show rubric feedback
- `/diagnostic`: timed assessment entry point
- `/dashboard`: personalized results and readiness tracking

### Domain Layer

- shared user, drill, leaderboard, and diagnostic types
- phase-one feature metadata
- vertical-aware config so MMI and PE can plug in later

### Content Layer

- JSON seeds for consulting rubrics, drills, and behavioral prompts
- same directory conventions that future verticals will use

## Implementation Order

1. Scaffold the web app and domain types
2. Build the Phase 1 marketing and dashboard shell
3. Add content loaders and consulting seed data
4. Implement resume parsing and scoring flow
5. Implement diagnostic runner and scoring
6. Add paid drill experiences and progress tracking

## Non-Goals for the First Pass

- Full AI case simulations
- Live coach marketplace
- University dashboards
- Separate MMI or PE branded apps

