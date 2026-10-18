# Implementation Plan — AtavicoLabs Homepage Rewrite

**Date**: 2026-03-08  
**Goal**: Implement messaging and structural changes from HOMEPAGE_REWRITE_PLAN.md

---

## Execution Order (By Impact vs. Effort)

### Phase 1 — Immediate (Trust & Language Fixes)
1. Fix hardcoded Italian strings in Process.tsx → i18n keys
2. Fix hardcoded Italian strings in Portfolio.tsx → i18n keys
3. Fix hardcoded Italian strings in About.tsx → i18n keys

### Phase 2 — Core Messaging Rewrite
4. Rewrite Hero copy (it.json + en.json)
5. Rewrite Proofs section eyebrow/title/subtitle
6. Rewrite Starting Points framing
7. Rewrite Portfolio section eyebrow/title/subtitle
8. Rewrite About/Trust Indicators section (remove team photo, add stats grid)
9. Rewrite CTA/Contact section
10. Update footer description

### Phase 3 — Structural Changes
11. Remove ServicesSection from homepage
12. Reorder homepage sections (page.tsx)
13. Add proofPoints/trust stats to messages

---

## Files Modified

- `app/components/Process.tsx` — Fix hardcoded IT strings
- `app/components/Portfolio.tsx` — Fix hardcoded IT strings + metrics
- `app/components/About.tsx` — Replace team photo + principles with stats grid
- `messages/it.json` — Hero, proofs, startingPoints, portfolio, about, cta, proofPoints, footer
- `messages/en.json` — Mirror all changes in English
- `app/[locale]/page.tsx` — Remove ServicesSection, reorder slightly

---

_This file tracks implementation scope._
