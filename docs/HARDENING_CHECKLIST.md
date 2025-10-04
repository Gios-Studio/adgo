# AdGo – Final Hardening Checklist (v1.0.0+)

This checklist ensures AdGo is not just functional, but **bulletproof** for licensing, security, and partner trust.

---

## ✅ Security & Protection

- [ ] **Encryption & Keys**
  - DATA_MASTER_KEY (AES-256) and HMAC_SIGNING_KEY in env (rotated, versioned).
  - Tenant configs and partner secrets stored encrypted (AES-GCM).
  - HMAC signing on all responses; optional request verification.

- [ ] **License Enforcement**
  - License registry table with status/scope/expiry.
  - Kill-switch admin controls (suspend, expire).
  - Heartbeat/telemetry to confirm SDK is live.

- [ ] **Row-Level Security (RLS)**
  - Deny-by-default policies on sensitive tables.
  - Access via Service Role only.

- [ ] **Fingerprinting**
  - Invisible dfpId attached to every decision (audit trail).
  - Fingerprint logs secured (non-public).

---

## 📊 Monitoring & Observability

- [ ] **Error Tracking**
  - Add Sentry (or alternative) integration for API + SDK.
  - Ensure build errors & runtime errors are logged.

- [ ] **Metrics Dashboard**
  - Latency, CTR, fraud triggers, ad fatigue stats.
  - CI/CD monitoring (GitHub Actions, Vercel/Netlify).

- [ ] **Alerts**
  - Email/Slack alerts for failures or license abuse.

---

## 💸 Billing & Compliance

- [ ] **Billing**
  - Stripe/PayPal hooks for SME campaign payments.
  - Automated invoice generation with VAT line item.
  - License suspension if payment fails.

- [ ] **Compliance**
  - GDPR/UK GDPR & Kenya Data Protection one-pager.
  - Data Processing Agreement (DPA) template.

- [ ] **Contracts**
  - White-label license agreement (with “no build-around” clause).
  - NDA template reviewed and ready.

---

## 🛠 SDK & Developer Experience

- [ ] **SDK Thinness**
  - Bundle size <200 KB (compressed).
  - Minimal dependencies.

- [ ] **Docs**
  - Quickstart guide (“5-line install”).
  - Example repos (Next.js, React Native, Flutter).
  - Versioning + CHANGELOG.

---

## 👥 Support & SLAs

- [ ] **Escalation Workflow**
  - Support email → Trello board → response SLA.
  - Documented support tiers (basic vs premium).

- [ ] **Status Page**
  - status.adgo.solutions baseline (UptimeRobot, BetterStack, or custom).

---

## 📜 Narrative & Moat

- [ ] **Moat Deck**
  - One-pager explaining why AdGo is irreplaceable.
  - Emphasize fraud prevention, contextual utility, and exclusivity.

- [ ] **Case Studies**
  - Pilot → ROI examples (CTR, driver payouts).
  - Early SME testimonials.

---

## 🗂 Deliverables for v1.0.0

- [ ] SECURITY_ENCRYPTION.md (already added).
- [ ] HARDENING_CHECKLIST.md (this file).
- [ ] CLEANUP.md (repo cleanup status).
- [ ] LICENSE.md (© AdGo Solutions Limited, UK & KE).