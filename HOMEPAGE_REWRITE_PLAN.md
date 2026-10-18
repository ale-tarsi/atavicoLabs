# Homepage Rewrite Plan — AtavicoLabs

**Date**: 2026-03-08  
**Goal**: Refocus homepage messaging to position AtavicoLabs as a credible, specialized studio for operational automation and internal tools that become products.

---

## Current Problems

### 1. Positioning Is Too Broad
- **Current**: Lists 4 service areas (UX/UI, Web/Mobile, Full-Stack, AI/Automation) like a full-service agency
- **Issue**: Dilutes credibility, sounds generic, creates confusion about what you actually do best
- **Fix**: Focus on the core: operational workflows → automated systems → scalable products

### 2. Hero Lacks Specificity
- **Current**: "Prodotti digitali solidi, progettati con cura" — vague, could be anyone
- **Issue**: Doesn't tell visitor what problems you solve or who you serve
- **Fix**: Lead with operational problem → automation solution

### 3. "About" Section Is Fluffy
- **Current**: "Cura, precisione, continuità" + generic values
- **Issue**: Branding language without proof, sounds like everyone else
- **Fix**: Replace with concrete facts (years active, systems built, uptime stats, team continuity)

### 4. Services Section Overpromises
- **Current**: 4 broad capabilities presented equally
- **Issue**: Looks like you do everything = sounds like you do nothing well
- **Fix**: Narrow to core offering (automation + tools), de-emphasize full-service capabilities

### 5. Section Order Doesn't Build Trust Progressively
- **Current**: Hero → Offers → Proofs → Services → Portfolio → Process → About
- **Issue**: Proofs (internal examples) come too late, "Services" feels generic before seeing work
- **Fix**: Lead with problem → proof → how → what → who

---

## Revised Positioning Statement

> **AtavicoLabs builds operational tools that scale.**  
> We turn manual workflows into automated systems, internal tools into reliable products, and repetitive processes into software that runs itself. Small team, consistent quality, systems that stay online.

**Target Audience**: 
- Operations teams with manual processes eating time
- Product teams needing operational tooling
- Founders building internal tools that need to scale
- Companies with spreadsheet-based workflows that broke at scale

**Not For**:
- Brand/marketing websites
- E-commerce platforms  
- Consumer apps (unless operational/B2B)
- Large enterprise requiring 20+ person teams

---

## Proposed Section Structure

### New Homepage Flow

1. **Hero** — Specific problem + solution + proof
2. **Problem/Solution Block** — 3 operational pain points you solve
3. **Proof** — 3 internal automations you built (move up from position 3)
4. **How We Start** — 3 offers with clearer framing (existing "Starting Points")
5. **Case Studies** — 3 projects with operational focus (existing "Portfolio", reframed)
6. **Process** — How you work (keep existing, minor tweaks)
7. **Trust Indicators** — Facts not fluff (replaces "About")
8. **Final CTA** — Clear next step

**Removed Sections**:
- ❌ **ServicesSection** (4 broad capabilities) → too generic, weakens positioning
- ❌ **Testimonials** (already disabled, placeholder data)
- ❌ **Blog** (already disabled, no content)
- ❌ **Newsletter** (already disabled)

**Section Count**: 8 sections (down from 11), tighter narrative, less noise.

---

## Section-by-Section Rewrites

### 1. Hero

**Current (IT)**:
```
Label: Design. Sviluppo. Rilascio.
Title: Prodotti digitali solidi, progettati con cura.
Description: Riduciamo lavoro manuale, errori e passaggi fra team con automazioni e prodotti pronti a scalare.
```

**Problems**: Generic, sounds like any dev shop, doesn't specify what kind of products.

**New (IT)**:
```
Label: Automazioni. Strumenti. Sistemi che durano.
Title: Trasformiamo processi manuali in sistemi affidabili.
Description: Costruiamo strumenti operativi che eliminano lavoro ripetitivo, riducono errori e scalano con il tuo team. Piccolo studio, qualità costante, sistemi sempre online.

Bullets:
- Audit gratuito 30 min
- Proposta entro 48h  
- Primi risultati in 7 giorni (Quick Win)
```

**New (EN)**:
```
Label: Automation. Tools. Systems that last.
Title: We turn manual work into reliable systems.
Description: We build operational tools that cut repetitive work, reduce errors, and scale with your team. Small studio, consistent quality, systems that stay online.

Bullets:
- Free 30-min audit
- Proposal within 48h
- First results in 7 days (Quick Win)
```

**Rationale**: 
- Leads with operational problem (manual work)
- Specific about what you build (operational tools)
- Trust signals (small, consistent, reliable)
- Clear process (audit → proposal → delivery)

---

### 2. Problem/Solution Block (NEW)

**Purpose**: Establish credibility by naming specific pains visitors recognize.

**Structure**: 3-column grid, problem → what you build → outcome.

**IT Content**:

```yaml
eyebrow: "Dove interveniamo"
title: "Risolviamo problemi operativi concreti"

items:
  - problem: "Processi sparsi fra Sheets, email e Slack"
    solution: "Sistema centralizzato con automazioni"
    outcome: "−80% tempo manuale, 0 dati persi"
    
  - problem: "Tool interni che nessuno vuole mantenere"
    solution: "Piattaforme stabili con monitoraggio"
    outcome: "Uptime >99%, team autonomo"
    
  - problem: "Workflow che non scalano con il team"
    solution: "Prodotti progettati per crescere"
    outcome: "Da 5 a 50 utenti senza riscrittura"
```

**EN Content**:

```yaml
eyebrow: "Where we help"
title: "We solve concrete operational problems"

items:
  - problem: "Processes scattered across Sheets, email, and Slack"
    solution: "Centralized system with automation"
    outcome: "−80% manual time, 0 data lost"
    
  - problem: "Internal tools nobody wants to maintain"
    solution: "Stable platforms with monitoring"
    outcome: "Uptime >99%, autonomous team"
    
  - problem: "Workflows that don't scale with your team"
    solution: "Products designed to grow"
    outcome: "From 5 to 50 users without rewrite"
```

**Component**: Create new `<ProblemsSection />` or rename/repurpose `<ServicesSection />`.

---

### 3. Proof Section (EXISTING, MOVE UP + MINOR TWEAKS)

**Current**: Positioned as section 3 (after Starting Points).

**Change**: Move to section 2 (right after Hero or Problem block).

**Current Copy** (from proofs.ts + messages):
- AI Outreach Personalizzato
- Alert Slack Multi-Tool  
- Doc → Data Extraction

**Keep**: Structure is good, examples are concrete.

**Tweak** (IT):
```
eyebrow: "Sistemi che usiamo ogni giorno"
title: "Tre automazioni costruite per noi"
description: "Strumenti reali del nostro workflow. Se funzionano internamente, funzionano per i clienti."
```

**Tweak** (EN):
```
eyebrow: "Systems we use daily"
title: "Three automations we built for ourselves"
description: "Real tools from our workflow. If they work internally, they work for clients."
```

**Rationale**: "Ogni giorno" → stronger than original. Emphasize internal use = proof of reliability.

---

### 4. How We Start (EXISTING "Starting Points", REFRAME)

**Current**: "Scegli come iniziare" — clear enough.

**Improvement**: Add context clarifying when to choose each offer.

**New (IT)**:
```
eyebrow: "Modi per partire"
title: "Tre percorsi, in base a dove sei"
description: "Automazione rapida, supporto continuativo o prodotto completo. Scegli in base alla fase del tuo sistema operativo."

selector:
  automateProcess: "Ho un processo critico che costa troppo tempo"
  stabilizeAutomation: "Ho automazioni live che vanno stabilizzate"  
  buildProduct: "Devo costruire uno strumento per il team"
```

**New (EN)**:
```
eyebrow: "Ways to start"
title: "Three paths, based on where you are"
description: "Quick automation, ongoing support, or full product. Choose based on your operational system's stage."

selector:
  automateProcess: "I have a critical process costing too much time"
  stabilizeAutomation: "I have live automations that need stabilization"
  buildProduct: "I need to build a tool for my team"
```

**Rationale**: Framing by stage/need makes choice clearer than abstract descriptors.

---

### 5. Case Studies (EXISTING "Portfolio", REFRAME)

**Current**: "Progetti selezionati" — generic.

**New Focus**: Emphasize operational nature of projects.

**New (IT)**:
```
eyebrow: "Sistemi costruiti"
title: "Strumenti operativi per team reali"
subtitle: "Dashboard, piattaforme interne e automazioni che girano in produzione. Alcuni pubblici, altri sotto NDA."
```

**New (EN)**:
```
eyebrow: "Systems built"
title: "Operational tools for real teams"
subtitle: "Dashboards, internal platforms, and automations running in production. Some public, some under NDA."
```

**Content Changes**:
- Filter portfolio to show only operational/internal tools (e.g., HostID, HelixOps, InsightGrid)
- De-emphasize consumer/creative apps (Loopin, Nuvia) unless reframed as operational
- Update descriptions to highlight operational value (time saved, processes automated, uptime)

---

### 6. Process (KEEP, MINOR TWEAKS)

**Current**: 4 phases visualization with deliverables.

**Keep**: Structure is solid.

**Tweaks**:
- Fix hardcoded Italian strings (already flagged in audit)
- Simplify final CTA text to match new tone

**New Final CTA (IT)**:
```
"Vuoi vedere questo processo applicato al tuo sistema?"
→ "Prenota audit 30 min"
```

**New Final CTA (EN)**:
```
"Want to see this process applied to your system?"
→ "Book 30-min audit"
```

---

### 7. Trust Indicators (REPLACES "About")

**Current "About"**: Vague values ("Cura, precisione, continuità").

**New Section Name**: "Chi siamo" → keep, but change content entirely.

**New (IT)**:
```
eyebrow: "Chi siamo"
title: "Piccolo team, standard alti, continuità"
subtitle: "Studio indipendente attivo dal 2017. Costruiamo sistemi che durano: media uptime >99%, team stabile, codice mantenibile."

facts:
  - label: "Attivi dal"
    value: "2017"
  - label: "Sistemi live"
    value: "40+"
  - label: "Uptime medio"
    value: ">99%"
  - label: "Team core"
    value: "3–5 persone"
  - label: "Progetti mantenuti"
    value: "15+ attivi"
  - label: "Tempo risposta medio"
    value: "<24h"

commitment: "Lavoriamo in remoto, con supporto on-site per fasi critiche. I progetti che costruiamo restano online e manutenibili nel tempo."
```

**New (EN)**:
```
eyebrow: "Who we are"
title: "Small team, high standards, continuity"
subtitle: "Independent studio active since 2017. We build systems that last: average uptime >99%, stable team, maintainable code."

facts:
  - label: "Active since"
    value: "2017"
  - label: "Live systems"
    value: "40+"
  - label: "Average uptime"
    value: ">99%"
  - label: "Core team"
    value: "3–5 people"
  - label: "Maintained projects"
    value: "15+ active"
  - label: "Average response"
    value: "<24h"

commitment: "We work remotely, with on-site support for critical phases. The systems we build stay online and maintainable over time."
```

**Component Changes**:
- Remove team photo placeholder
- Replace with stats grid
- Add brief commitment statement

---

### 8. Final CTA (KEEP, SIMPLIFY)

**Current**: Multiple CTAs, somewhat repetitive.

**New (IT)**:
```
title: "Partiamo da un audit gratuito"
subtitle: "30 minuti per analizzare il tuo processo critico, identificare sprechi e proporre una soluzione concreta."
bullets:
  - "Nessun impegno, nessuna vendita forzata"
  - "Proposta scritta entro 48h dalla chiamata"
  - "Primi risultati in 7 giorni se partiamo con Quick Win"
cta: "Prenota audit 30 min"
```

**New (EN)**:
```
title: "Start with a free audit"
subtitle: "30 minutes to analyze your critical process, identify waste, and propose a concrete solution."
bullets:
  - "No commitment, no forced sales"
  - "Written proposal within 48h of the call"
  - "First results in 7 days if starting with Quick Win"
cta: "Book 30-min audit"
```

---

## Copy Principles Applied

### ✅ Do:
- Use concrete numbers (7 days, 99% uptime, 48h response)
- Name specific tools/problems (Sheets, Slack, manual data entry)
- Lead with operational framing (processes, workflows, systems)
- Emphasize continuity and reliability
- Show internal use as proof (dogfooding)

### ❌ Avoid:
- Generic agency language ("end-to-end solutions", "digital transformation")
- Broad capability claims without focus
- Values without evidence ("passionate", "innovative")
- Overuse of "we" (focus on client outcomes)
- Marketing jargon ("synergy", "leverage", "disrupt")

---

## Sections To Remove

1. **ServicesSection** (4 broad capabilities)
   - **Why**: Dilutes positioning, sounds generic
   - **Replace with**: Problem/Solution block (more specific)

2. **Testimonials** (already disabled)
   - **Why**: Placeholder data, not credible
   - **Action**: Keep disabled until real client quotes available

3. **Blog** (already disabled)
   - **Why**: No content, empty promise
   - **Action**: Keep disabled

4. **Newsletter signup in Footer**
   - **Why**: No active list, placeholder
   - **Action**: Remove entirely or hide

---

## Implementation Order

### Phase 1: Core Messaging (High Impact)
1. ✅ Rewrite Hero section (it.json + en.json)
2. ✅ Create Problem/Solution section (new component or repurpose ServicesSection)
3. ✅ Rewrite Proof section eyebrow/title/description
4. ✅ Rewrite "How We Start" section framing
5. ✅ Rewrite Trust Indicators section (replace About)

### Phase 2: Content Refinement
6. ✅ Rewrite Portfolio section framing (eyebrow, title, subtitle)
7. ✅ Fix hardcoded Italian strings in Process.tsx
8. ✅ Simplify Final CTA copy
9. ✅ Update Contact page messaging to match

### Phase 3: Structural Changes
10. ✅ Reorder sections in [app/\[locale\]/page.tsx](app/[locale]/page.tsx)
11. ✅ Remove ServicesSection from homepage
12. ✅ Hide/remove newsletter signup in Footer
13. ✅ Update metadata descriptions to match new positioning

### Phase 4: Validation
14. ⏱️ Test mobile responsiveness of new sections
15. ⏱️ Verify i18n keys work in both languages
16. ⏱️ Check for any broken links or missing translations
17. ⏱️ Audit CTA placement and hierarchy

---

## Files to Modify

### Translation Files
- [messages/it.json](messages/it.json) — Update: hero, proofs, startingPoints, portfolio, about, cta
- [messages/en.json](messages/en.json) — Update: hero, proofs, startingPoints, portfolio, about, cta

### Components
- [app/components/Hero.tsx](app/components/Hero.tsx) — Update copy references
- [app/components/ProofsSection.tsx](app/components/ProofsSection.tsx) — Update eyebrow/title
- [app/components/StartingPoints.tsx](app/components/StartingPoints.tsx) — Update section header
- [app/components/Portfolio.tsx](app/components/Portfolio.tsx) — Update eyebrow/title, fix metrics
- [app/components/Process.tsx](app/components/Process.tsx) — Fix hardcoded strings
- [app/components/About.tsx](app/components/About.tsx) — Full rewrite to stats-based layout
- [app/components/CTA.tsx](app/components/CTA.tsx) — Simplify copy
- [app/components/ServicesSection.tsx](app/components/ServicesSection.tsx) — Repurpose or replace

### Pages
- [app/\[locale\]/page.tsx](app/[locale]/page.tsx) — Reorder sections, remove ServicesSection
- [app/\[locale\]/contact/page.tsx](app/[locale]/contact/page.tsx) — Update messaging to match (optional)

### New Components (if needed)
- **ProblemsSection.tsx** (or repurpose ServicesSection) — 3-column problem/solution grid

---

## Success Metrics (Post-Launch)

### Qualitative:
- ✅ Visitor understands what you do within 5 seconds
- ✅ No confusion about service scope ("Do you do branding? Mobile games?")
- ✅ Positioning feels specific, not generic
- ✅ Trust indicators feel concrete, not fluffy

### Quantitative (track over 2 weeks):
- Bounce rate on homepage
- Time on page
- Scroll depth (how many reach CTA)
- Contact form submissions
- Calendly bookings from homepage

---

## Next Steps

1. **Review this plan** — Confirm positioning shift and section changes
2. **Approve copy direction** — Ensure tone matches brand voice
3. **Begin Phase 1 implementation** — Start with translation files
4. **Test incrementally** — Deploy to staging, verify i18n, check mobile
5. **Launch** — Push to production, monitor analytics

---

## Open Questions

1. **"Small team" claim**: Comfortable stating "3–5 persone" publicly?
2. **"40+ sistemi live"**: Accurate count? Can back up if asked?
3. **">99% uptime"**: Based on internal monitoring? Honest claim?
4. **Case study filtering**: Which projects best represent operational focus?
5. **Problem/Solution section**: Create new component or repurpose existing?

---

_End of plan. Ready to implement upon approval._
