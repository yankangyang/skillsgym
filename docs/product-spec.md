# Consulting Prep Gym Product Spec

## Core Thesis

Most consulting prep products begin at full case practice. This product begins earlier by identifying why a candidate will fail before they waste time on mock interviews or coaching.

## Launch Positioning

- Diagnose the weak points first
- Fix the resume before interview invitations are lost
- Build behavioral readiness alongside case skill
- Train through drills before full simulations

Tagline direction:

- Know where you'll fail. Fix it before they see it.
- Get your resume roasted before McKinsey does.
- Drill the skills, not just full cases.

## Phase 1 Wedge

### Resume Screen

- Consulting-specific rubric rather than ATS keyword matching
- Deterministic checks for formatting and structure
- LLM-assisted bullet scoring for quantified impact, leadership, attribution, and recruiter signal
- Output should feel blunt, specific, and shareable

### Diagnostic Assessment

- Ten-minute baseline across math, structuring, sizing, and behavioral
- Timed prompts with hybrid scoring
- Output includes radar chart, readiness score, and a ranked fix list

### Paid Drills and Behavioral

- Mental math, structuring, market sizing, chart interpretation, brainstorming
- Story bank builder and rapid-fire fit drills
- Readiness tracking plus leaderboard mechanics

## Product Moat

The product combines four layers that competitors usually split apart or ignore:

1. Resume screen
2. Diagnostic assessment
3. Behavioral preparation
4. Skill drills

That makes the product the entry point for the prep journey, not just a practice destination.

## Target Users

- MBA candidates
- Undergrad applicants
- Experienced hires
- Advanced degree candidates

## Pricing

- Free: resume screen, diagnostic, three drill sessions
- Sprint: $99 one-time for eight weeks of drills and behavioral prep
- Full Prep: $149 one-time when simulations are live
- Monthly: $29 for rolling experienced-hire prep

## Shared Platform Model

- Auth and user accounts
- Diagnostic engine
- Resume screen engine
- Behavioral prep module
- Drill engine
- Leaderboard system
- Simulation runner
- Live interview marketplace
- Billing and subscription

## Vertical Strategy

The architecture should support multiple structured interview markets using the same platform primitives:

- `consulting/` for launch
- `mmi_medical/` for medical school interview prep
- `pe/` for private equity interview prep

Each vertical swaps in its own rubric, question library, drill categories, scoring prompts, and leaderboard groupings.

## Success Metrics

- Resume screens completed
- Screen to diagnostic conversion
- Diagnostic to paid conversion
- Drills completed per paid user
- Seven-day retention
- Leaderboard engagement
- Weekly challenge participation
- Unprompted sharing

