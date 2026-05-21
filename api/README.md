# Backend

The backend is a Fastify API for the Phase 1 product wedge.

## Initial Modules

- `resume-screen`: deterministic-first resume feedback surface
- `diagnostic`: readiness scoring and weak-area prioritization
- `drills`: catalog metadata from the consulting content library

## Commands

- `npm install`
- `npm run dev`
- `npm run typecheck`

## First Routes

- `GET /health`
- `GET /api/v1/meta`
- `POST /api/v1/resume-screen/evaluate`
- `GET /api/v1/diagnostic/categories`
- `POST /api/v1/diagnostic/score`
- `GET /api/v1/drills/catalog`

