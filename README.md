# AdGo (AdGo Solutions Limited [UK] and AdGo Solutions Limited [Kenya])

**Contextual AdTech for Ride-Hailing, Delivery & Mobility**

AdGo is a SaaS/DaaS platform that turns idle ride time into value by delivering **contextual, hyper-relevant ads** inside ride-hailing and mobility apps.  
Our mission: **make ads useful, not annoying** — driving revenue for apps, drivers, and SMEs.

---

## Why AdGo
- **Ride-hailing first**: Unlocks new revenue for Uber, Bolt, Little, Yego, SafeBoda & others.  
- **SME-friendly**: Affordable starter packs ($100–$200) for local businesses.  
- **Shared revenue model**: Fair splits between drivers, apps, and AdGo.  
- **Relevant useful**: Timely helpful ads for riders that are not intrusive, exhaustng or pointless
- **Privacy-first**: Consent receipts, regulator portal, no intrusive data scraping.  
- **Proven**: Built around 40 baked-in processes across targeting, attribution, revenue, and compliance.

---

## Core Features
- Context signals (geo, time, events, weather).  
- Frequency & fatigue controls (ads stay fresh).  
- Ranking engine + quiet hours/geofencing.  
- Multi-location campaigns & A/B testing.  
- Fraud protection (deduplication, collusion detection).  
- Immutable revenue ledger & payout simulations.  
- Cross-vertical hooks (delivery, aviation, logistics).  
- Regulator portal & consent receipts.  

Full process breakdown available in [`docs/AdGo_Process_Documentation.pdf`](docs/AdGo_Process_Documentation.pdf)

---

## Project Structure
- **/src** → Core Next.js + Supabase app.  
- **/sdk** → AdGo SDK for integration.  
- **/docs** → Documentation + processes.  
- **/.github** → CI/CD workflows (multi-env DB migrations, auto-PR).  

---

## Revenue Model

- **Advertisers**: Pay-per-campaign, with affordable Starter Packs ($100–$200) to onboard SMEs, and scalable budgets for larger campaigns.  
- **Distribution**: Revenue split — 50% to Drivers, 30% to Ride-Hailing Apps, and 20% to AdGo.  
- **Premium Features**: Advanced targeting (radius, language, rider type), analytics dashboards, repeat campaign retargeting, and AI-driven optimization for campaign performance.

---

## Contributing

We follow modern collaboration practices:

- **Feature branches**: `feature/<module-name>`  
- **Conventional Commits**: `feat`, `fix`, `chore`, `docs`  
- **Auto-PR Workflow**: All feature branches automatically create pull requests into `main`, simplifying reviews and merges.

---

## License

© 2025 AdGo Solutions Limited (UK & Kenya). All rights reserved.

## Getting Started

### Local Setup
```bash
git clone https://github.com/Gios-Studio/adgo.git
cd adgo
npm install
npm run dev
