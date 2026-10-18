# Case Study Audit
**Date:** 8 marzo 2026  
**Branch:** AutomazioneRetainerProduct  
**Scope:** All 14 project pages under `/app/[locale]/projects/`

---

## Summary verdict

| Project | Type | Credibility | Status | Action |
|---|---|---|---|---|
| **crispin** | Client — named | ✅ High | In production | Keep, minor rewrite |
| **vectis** | Client — named | ✅ High | Delivered | Keep, minor rewrite |
| **lytera** | Client — named | ✅ High | Delivered | Keep, minor rewrite |
| **helixops** | Client — NDA | ⚠️ Medium | 2024 | Keep, strip inflated claims |
| **ai-workflow-assistant** | Internal tool | ⚠️ Medium | In production | Keep, add context |
| **energy-intelligence** | Client/Pilot | ⚠️ Medium | In production | Keep, qualify claims |
| **hostid** | Internal product | ⚠️ Medium | In development | Keep, fix status + metrics |
| **pulseshift** | Client — NDA | ⚠️ Medium | 2024 | Keep, strip star-rating |
| **insightgrid** | Client — NDA | ⚠️ Medium | 2024 | Keep, strip unverifiable metrics |
| **flowcanvas** | Client — NDA | ⚠️ Medium | 2024 | Keep, strip comparative claims |
| **team-scheduler** | Concept / duplicate | 🔴 Low | N/A | **Hide — mark as concept, fix EN** |
| **loopin** | Concept / duplicate | 🔴 Low | N/A | **Hide — mark as concept** |
| **nuvia** | Concept / duplicate | 🔴 Low | N/A | **Hide — mark as concept** |
| **syncora** | Concept / duplicate | 🔴 Low | N/A | **Hide — mark as concept** |

---

## Design-system inconsistency (structural)

Three different visual systems coexist across the 14 pages:

1. `warm-black / warm-text / warm-muted` palette — 8 pages (hostid through vectis)
2. `bg-primary / text-primary / accent-primary` palette — 2 pages (ai-workflow, energy-intelligence)
3. `bg-slate-900 / text-white` with blue gradient — 3 pages (loopin, nuvia, syncora via `ProjectLayout`)

All map to the same hex values defined in `tailwind.config.ts` under the `warm.*` legacy keys, so there is no visual breakage, but the code is inconsistent and unmaintainable.

**Recommended:** Migrate all pages to use `CaseStudyLayout` or the `carbone / sabbia / grigio / oliva` palette used by the main site.

---

## Canonical case study template

Every case study must include these sections in this order:

```
[Status badge: Interno | Pilot | Cliente (NDA) | Cliente | Concept]

## Context
Who needed this. Industry, team size, situation. No embellishment.

## Problem
Specific pain. What was broken, slow, or missing — not "the industry has a challenge".

## Constraints
Scope, timeline, and tech limitations that shaped what was built.

## What we built
Concrete description: what components, what integrations, what the system does.

## Our role
Exactly what we contributed. Full build / consulting / part of a larger system.

## Outcome
Measured or estimated results. If estimated, say so. No unsourced percentages.
Flag anything that is a projection, not a measurement.

## Stack
Technology list only.

## Status
Live with N users / Internal / Mothballed / Pilot / Concept
```

---

## Per-project findings

### crispin ✅
- **Client:** Crispin (named)
- **Badge fix:** No badge currently — should have no badge (real client)
- **Metrics:** −35% penalties, +20% on-time delivery, 1h incident response — specific and plausible
- **Issues:**
  - Page uses `warm-black` CSS classes (legacy)
  - Gallery section is a placeholder (`Screenshot in arrivo`)
  - One `gallery` section is a single placeholder with no description
- **Action:** Minor rewrite for template compliance. Add a "scope" note.

---

### vectis ✅
- **Client:** Vectis Capital (named)
- **Metrics:** −40% manual effort, +3× pipeline visibility, 0 missed approvals, 12 weeks — grounded
- **Issues:**
  - "+3× pipeline visibility" is subjective — rephrase as "reported"
  - Gallery placeholder
- **Action:** Minor rewrite. Add "scope" section.

---

### lytera ✅
- **Client:** Lytera (named)
- **Metrics:** −50% manual coordination, business impact metrics
- **Issues:**
  - Gallery placeholder
  - Missing EN keys in JSON (none visible — need verification)
- **Action:** Minor rewrite. Add "scope" section.

---

### helixops ⚠️
- **Client:** Confidenziale (Enterprise)
- **Badge in `constants/projects.ts`:** Currently `internal` — **WRONG.** Should be `nda`.
- **Metrics flagged:**
  - `+60% esecuzione più rapida` — unverifiable business claim without baseline
  - `−35% errori operativi` — no stated baseline; relative reduction without absolute numbers
  - `<200ms risposta` — technical metric, acceptable
  - `−45% carico manuale` — reported by client, should be qualified
- **Portfolio listing claims:** "+50% efficiency, −60% manual tasks" — different numbers than the detail page. Inconsistency.
- **Issues:** Claims in `portfolio.items.N` (IT/EN JSON) differ from the case study detail page. Two sets of numbers are not reconciled.
- **Action:** Fix badge. Strip "+60%/−35%" business metrics or qualify as "client-reported projection". Fix portfolio listing numbers to match detail page.

---

### ai-workflow-assistant ⚠️
- **Client:** Not stated — appears to be an internal tool or small team
- **Status shown:** "In produzione"
- **Metrics flagged:**
  - `+80% riutilizzo soluzioni esistenti` — no baseline, no user survey cited
  - `200+ team members` — plausible if multiple teams
- **Issues:** Uses `accent-primary/bg-primary` color palette (second design system, not the site palette). Missing gallery.
- **Action:** Add explicit context (internal? client?). Strip "+80%" or qualify. Add "scope" section.

---

### energy-intelligence ⚠️
- **Client:** Not stated — described as "facility managers"
- **Metrics flagged:**
  - `−25% inefficienze energetiche in 2 mesi` — needs qualification (measured vs projected)
  - `25 facilities monitorate` — specific, plausible
- **Issues:** Uses `accent-primary/bg-primary` color palette. Missing full EN translation check.
- **Action:** Qualify "−25%" as measured by client after pilot. Add "scope" section. Convert to main site palette.

---

### hostid ⚠️
- **Client:** AtavicoLabs (Internal product)
- **Badge in `constants/projects.ts`:** Currently `nda` — **WRONG.** Should be `internal`.
- **Portfolio listing:** Shows "450+ attivi" and "99.8% uptime" (detail page says 99.98%)
- **Metrics flagged:**
  - `450+ utenti attivi` — described as internal product. Who are the 450 external users? Needs clarification or removal.
  - `−70% tempo di onboarding` — no baseline stated. If internal, from what starting state?
  - `+40% aumento adozione` — if internal, this is a weak signal without context
  - `99.98% uptime` — plausible if monitored; acceptable to keep
  - `−50% richieste di supporto` — no baseline
- **Timeline:** "2023 — in corso" — product is still in development; results page should not show final-sounding metrics
- **Action:** Fix badge to `internal`. Remove "450+ utenti" or explain. Rephrase metrics as targets/observed rather than final. Note "work in progress" status.

---

### pulseshift ⚠️
- **Client:** Confidenziale (Operations Team)
- **Badge in `constants/projects.ts`:** Currently `concept` — **POTENTIALLY WRONG.** JSON clearly describes a real NDA client project. Should be `nda`.
- **Metrics flagged:**
  - `4.8/5 soddisfazione utenti` — suspiciously precise for NDA work with no cited methodology
  - `+65% comunicazione team` — unverifiable
  - `−30% conflitti turni` — plausible if tracked, but no baseline cited
  - `−50% tempo scheduling` — plausible, should be qualified
- **Action:** Fix badge to `nda`. Strip or qualify "+65% comunicazione" and "4.8/5". Add scope note.

---

### insightgrid ⚠️
- **Client:** Confidenziale (Analytics Team)
- **No badge** in constants — should be `nda`.
- **Portfolio listing:** Claims "10x insight più veloci" — this was removed from portfolio listing but exists in old context
- **Metrics flagged:**
  - `+40% velocità decisionale` — unverifiable
  - `+50% engagement strumenti dati` — marketing speak, no method
  - `−30% anomalie mancate` — plausible if comparing alert rate before/after, needs qualification
  - `<300ms risposta query` — technical metric, acceptable
- **Action:** Add `nda` badge. Strip "+50% engagement" and "+40% decisional speed". Keep `<300ms`. Add scope.

---

### flowcanvas ⚠️
- **Client:** Confidenziale (Product Team)
- **No badge** in constants — should be `nda`.
- **Metrics flagged:**
  - `4× prestazioni vs concorrenti` — impossible without named comparison
  - `+55% velocità di ideazione` — unmeasurable
  - `−70% conflitti di collaborazione` — very high, needs qualification
  - `20ms latenza sync` — technical metric, acceptable
- **Action:** Add `nda` badge. Strip "4× vs competitors" entirely. Qualify others. Add scope.

---

### team-scheduler 🔴 HIDE
- **Type:** Concept / internal prototype
- **Critical issues:**
  1. **Entirely hardcoded Italian strings** — page is broken for `/en/` locale
  2. **Duplicate concept:** Nearly identical to `pulseshift` (AI scheduling) and `syncora`. Three pages describe essentially the same product.
  3. Shows "450+ utenti attivi" — same suspicious number as HostID
  4. Uses `CaseStudyLayout` with Italian-only hardcoded props
- **Recommendation:** Remove from routing (return `notFound()`) or clearly mark as concept/exploratory. Do not show in portfolio.

---

### loopin 🔴 HIDE
- **Type:** Concept / exploratory
- **Issues:**
  1. Uses `ProjectLayout` with `bg-slate-900` — completely off-brand
  2. Generic startup-style claims ("40% faster feedback cycles" — no real context)
  3. Duplicate concept: overlaps heavily with `flowcanvas` (both are real-time collaboration tools)
  4. No real client or deployment context
- **Recommendation:** Mark as "Concept — not currently maintained". Do not include in portfolio.

---

### nuvia 🔴 HIDE
- **Type:** Concept
- **Issues:**
  1. Uses `ProjectLayout` with `bg-slate-900` — off-brand
  2. Generic ESG/sustainability language ("Reduced carbon footprint through data-driven decisions")
  3. Duplicate concept: overlaps with `energy-intelligence` and `insightgrid`
  4. No real client, no deployment evidence
- **Recommendation:** Mark as "Concept — exploratory". Do not include in portfolio.

---

### syncora 🔴 HIDE
- **Type:** Concept / SaaS idea
- **Issues:**
  1. Uses `ProjectLayout` with `bg-slate-900` — off-brand
  2. "Up to 60% reduction in manual planning time" — classic unverifiable SaaS claim
  3. Triple-duplicate: same idea as `pulseshift` and `team-scheduler`
  4. No real client, no deployment evidence
- **Recommendation:** Mark as "Concept — not currently maintained". Do not include in portfolio.

---

## Metrics quality guide

| Metric type | Credible? | How to present |
|---|---|---|
| Response time / latency | ✅ Yes | State directly: `<300ms on p95` |
| Uptime percentage | ✅ Yes | Note monitoring tool: `99.8% (UptimeRobot, 30d avg)` |
| Number of users | ⚠️ Conditional | Only if verifiable: "50 seats, 3 locations" |
| Time saved (%) | ⚠️ Needs context | "Team reports −40% in manual coordination" |
| Score / survey | ⚠️ Needs method | "4.8/5 from internal usability tests (n=12)" |
| "10× faster" / "60% improvement" | 🔴 Suspicious | Rephrase or remove — never standalone |
| "vs competitors" | 🔴 Remove | Impossible to verify without naming them |
| "happier teams" / "smoother" | 🔴 Remove | Not a metric, trim entirely |

---

## Structural issues to fix (post-audit)

1. **`constants/projects.ts` badges are wrong:**
   - `hostid`: `nda` → `internal`
   - `helixops`: `internal` → `nda`
   - `pulseshift`: `concept` → `nda`
   - `insightgrid`: no badge → add `nda`
   - `flowcanvas`: no badge → add `nda`

2. **Gallery placeholders everywhere:** All 14 projects show "Screenshot in arrivo". This is a credibility issue — either add real screenshots or remove the gallery section from pages that don't have assets.

3. **Portfolio listing / detail page metric mismatches:** The numbers shown in the portfolio grid cards (from `portfolio.items.N.metrics.*` in JSON) often differ from numbers shown in the detail case study page. Each project should have one set of numbers.

4. **`team-scheduler`, `loopin`, `nuvia`, `syncora` routing:** These pages are live and indexable. They should either return `notFound()` or display a clear "concept / not available" notice. They should NOT appear in the portfolio grid.

5. **EN translation gaps:** `team-scheduler` has no English content at all. Needs to either be translated or removed from routing for EN locale.

---

## Recommended portfolio set (immediate)

Show **6 projects** in the portfolio grid in this order:

1. **crispin** — Named client, logistics, specific operational metrics
2. **vectis** — Named client, finance ops, real workflow tool
3. **lytera** — Named client, workflow intelligence
4. **helixops** — NDA enterprise, AI automation (badge: NDA)
5. **ai-workflow-assistant** — Internal tool, honest self-referential case
6. **energy-intelligence** — Technical depth, real NILM engineering

Remove **hostid** from the primary grid until "450+ users" claim is resolved or the product ships publicly.  
Keep **pulseshift, insightgrid, flowcanvas** as secondary pages but don't feature them in the main grid.
