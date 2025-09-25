# AdGo Final Cleanup Checklist

## Workflows
- [x] `.github/workflows/ci.yml` is strict (main only, lint/test/build must pass)
- [x] `.github/workflows/ci-dev.yml` is non-blocking for feature/* branches
- [x] `.github/workflows/auto-pr.yml` is present and working for feature/* branches
- [x] `.github/workflows/_db-migrate.yml` defaults to staging, supports production, tries port 6543 then 5432, runs db lint before db push

## Config Files
- [x] `vercel.json` deploys only main
- [x] `netlify.toml` deploys only main
- [x] Unused/duplicate config files removed

## Codebase
- [x] Unused dependencies (like Vite) removed
- [x] `package.json` scripts and dependencies are consistent
- [x] Build passes with `npm run build:prod`

## Docs
- [x] `docs/AdGo_Process_Documentation.md` and `.pdf` are complete (40 processes)
- [x] `README.md` is intact
- [x] This checklist is up to date

## Tagging
- [x] Milestone tag `v1.0.0` exists with release title "AdGo V1.0.0"

---

All cleanup and stabilization tasks for AdGo are complete.
