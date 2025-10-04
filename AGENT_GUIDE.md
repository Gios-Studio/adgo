# AdGo Build Agent Guide

This file defines how the AdGo Agent should work in this repo.

---

## Branching
- Always create a **feature branch** for each process:
  - Format: `feature/<category>-<process>`
  - Example: `feature/core-engine-ranking`

## Commits
- Follow **Conventional Commits** style:
  - `feat(core-engine): add context signals (geo, time, weather)`
  - `fix(driver-wallet): adjust revenue split logic`
  - `test(attribution): add QR deduplication tests`

## Workflow
1. Create feature branch.
2. Add code + tests for one process (keep modular).
3. Push → triggers `ci-dev.yml` workflow.
4. If CI passes, open PR into `main`.
5. After PR merge, `ci.yml` will run production build.

## Rules
- **No bloat**: Only include code related to the current process.
- Keep **comments minimal & technical**.
- Group related changes in single commits.
- Do **not** modify unrelated parts of the repo.
- All code must integrate cleanly with Supabase (backend) and Next.js (frontend).

---

## Wave Plan (22 Remaining Processes)

- Wave 1: Core Engine + SME Campaigns (9 processes)
- Wave 2: Attribution & Integrity + Driver Revenue (7 processes)
- Wave 3: Privacy, Security & Expansion (6 processes)

Implement wave by wave, commit after each process.

## Workflow Files
- Do not delete or modify `.github/workflows/auto-pr.yml`.
- Only update this file if explicitly instructed.
