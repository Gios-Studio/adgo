# 🧹 AdGo Agent Cleanup & Streamline Guide

## 🧠 Context
The **Builder.io** integration is no longer required.  
We are keeping the **Vercel-deployed Next.js** site as the main functional frontend.

### 🎯 Goal
Simplify the codebase, reduce dependency weight, and improve build stability.  
Supabase remains the backend for auth, database, and form submissions.  
Focus on removing all Builder.io-related code, packages, and references cleanly.

---

## ✅ TASK LIST

### 1. Remove Dependencies
Uninstall Builder.io and related packages:
```bash
npm uninstall @builder.io/react @builder.io/sdk react-builder
```

Check package.json for any builder.io references and remove them.

---

### 2. Clean Imports

Search the entire repo for:
- `builder.io`
- `BuilderComponent`
- `BuilderContent`
- `builderConfig`

Delete all imports and components referencing those.

---

### 3. Purge Builder.io Config Files

Remove the following if present:
- `/builder-settings.json`
- `/builder.config.js`
- `/builder-pages/`
- `/builder/`

Delete .env variables like:
- `BUILDER_API_KEY`
- `BUILDER_PUBLIC_KEY`
- `BUILDER_ENV`

---

### 4. Simplify Next.js Structure

Keep only these folders under `/pages`:
```
/pages
  index.tsx
  partners.tsx
  contact.tsx
  docs.tsx
```

Remove any dynamic page rendering logic from Builder.io.

---

### 5. Optimize CI/CD

Update `.github/workflows/ci.yml` or `vercel.json` to ensure no Builder-related build steps exist.
Final build command should be:
```bash
npm run build
```

Test Vercel deployment manually after changes.

---

### 6. Verify Frontend Functionality

Test each core route:
- `/` (home)
- `/partners`
- `/contact` (form submits to Supabase)
- `/docs` (links to SDK docs or placeholder)

Ensure Supabase integration (`contact_requests` table) still works.

---

### 7. Run Build Validation

```bash
npm run lint && npm run build && npm run start
```

Fix any references or missing imports flagged by TypeScript.

---

### 8. Commit + Push

```bash
git add .
git commit -m "chore: remove Builder.io integration and streamline frontend"
git push origin main
```

---

## ⚙️ FINAL STACK SNAPSHOT

| Layer | Platform | Role |
|-------|----------|------|
| Frontend | Next.js (Vercel) | Public site, docs, and forms |
| Backend | Supabase | Database, auth, storage, telemetry |
| CI/CD | GitHub Actions → Vercel | Auto-build and deploy |
| Analytics | Plausible / Supabase Logs | Light tracking |
| SDK Docs | Docusaurus (linked via /docs) | Developer resources |

---

## 💡 Final Check

When done, ask the agent to:

**"Run dependency check and rebuild project tree. Confirm all Builder.io references removed and deployment passes CI."**

---

## 🌟 Optional: Lean Website Enhancements

Once Builder.io is removed, consider adding:
- ✅ Supabase form validation
- ✅ Plausible lightweight analytics
- ✅ Static caching for `/partners` and `/docs`
- ✅ Faster page load via image compression and lazy loading

---

**Author:** AdGo Systems Engineering  
**Date:** 2025  
**Version:** 1.0.0