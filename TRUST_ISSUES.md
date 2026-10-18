# Trust Issues — atavicolabs.com

**Date**: 2026-03-08  
**Purpose**: Catalog specific credibility problems, language inconsistencies, and trust-destroying elements that damage conversion.

---

## Executive Summary

The site's technical execution is solid, but **language mixing, placeholder content, and positioning inconsistencies** create doubt about professionalism and reliability. English users encounter Italian text, all case studies show placeholder screenshots, and some copy overclaims while other copy is too generic.

---

## 🔴 Critical Trust Destroyers

### 1. Language Mixing — Italian in English Version

**Problem**: Components have hardcoded Italian strings that appear even when user selects English.

**Specific Instances**:

| Component | Location | Hardcoded Text | Seen By English Users |
|-----------|----------|----------------|----------------------|
| [Process.tsx](app/components/Process.tsx) | Line 117 | `"del progetto"` | ✅ YES |
| [Process.tsx](app/components/Process.tsx) | Line 239 | `"Agile · Test-Driven Development · Continuous Integration"` | ✅ YES (mostly English but hardcoded) |
| [Process.tsx](app/components/Process.tsx) | Line 252 | `"Vuoi capire come applichiamo questo processo al tuo prodotto?"` | ✅ YES |
| [Portfolio.tsx](app/components/Portfolio.tsx) | Line 97 | `"METRICHE PROGETTO"` | ✅ YES |
| [Portfolio.tsx](app/components/Portfolio.tsx) | Lines 103-105 | `"8 settimane"`, `"12 settimane"`, `"10 settimane"` | ✅ YES |
| [Portfolio.tsx](app/components/Portfolio.tsx) | Lines 111-113 | `"3 dev + 1 designer"`, etc. | ✅ YES |
| [Testimonials.tsx](app/components/Testimonials.tsx) | Lines 80, 85 | `"Progetto in linea con il tuo?"`, `"Parliamone"` | ✅ YES (section disabled, but code exists) |

**Impact**: 
- **Destroys credibility instantly** — looks unprofessional, incomplete
- Confuses English-speaking visitors
- Signals site was built for Italians only (alienates international clients)
- Makes user question quality of actual product work

**Perception**: "If they can't get their own website language right, how will they handle my project?"

**Fix Difficulty**: LOW (2-3 hours to extract all strings to i18n)

**Priority**: 🔴 **BLOCKER** — Fix before any marketing push to English-speaking audience

---

### 2. Fake/Placeholder Testimonials

**Location**: [messages/it.json](messages/it.json) lines 666-688, [messages/en.json](messages/en.json) lines 666-688

**Current Data**:
```json
{
  "quote": "Hanno trasformato un'idea complessa in un prodotto stabile...",
  "author": "Marco Benedetti",
  "role": "CEO",
  "company": "FinTech Solutions"
}
```

**Red Flags**:
- Generic Italian names (Marco Benedetti, Sofia Marinelli, Luca Ferri)
- Generic company names (FinTech Solutions, WellnessPro, LogiTech Europe)
- No LinkedIn links, no company URLs, no way to verify
- Quotes are too perfect, too marketing-y
- Section is disabled via feature flag (TESTIMONIALS_ENABLED = false)

**Why This Destroys Trust**:
1. **If enabled**: Looks like fake social proof (common scam tactic)
2. **If someone inspects code**: Still see fake data in JSON, question integrity
3. **Comparison test**: Search "Marco Benedetti CEO FinTech Solutions" → no results

**Perception**: "They're willing to fabricate testimonials. What else is fake?"

**Fix Options**:
1. **Remove entirely** from codebase (recommended until real testimonials secured)
2. **Replace with verifiable client logos** (if under NDA)
3. **Use case study pull-quotes** from actual project work (indirect testimonials)

**Priority**: 🔴 **HIGH** — Even disabled, this code damages credibility if discovered

---

### 3. All Case Studies Show Placeholder Screenshots

**Problem**: Every single project page (15 total) has gallery sections filled with placeholder text.

**Visual Evidence** (what visitors see):

```
┌──────────────────────────────┐
│                              │
│   Placeholder per schermate  │
│         mobile              │
│                              │
└──────────────────────────────┘
```

**Affected Projects**: hostid, helixops, pulseshift, insightgrid, flowcanvas, lytera, vectis, crispin, nuvia, loopin, ai-workflow-assistant, syncora, team-scheduler...

**Why This Destroys Trust**:
- **Signals projects are fake** or never completed
- **No proof of execution** — just empty boxes
- **Amateur presentation** — looks like unfinished dev site
- **Worst possible first impression** for potential clients reviewing portfolio

**Especially Bad For**:
- Projects labeled "In produzione" (in production) → but no screenshots?
- Projects with specific metrics (8 settimane, 3 dev + 1 designer) → but no visuals?

**Perception**: "These projects don't exist" or "They're too embarrassed to show the actual UI"

**Fix Options**:
1. **Add real screenshots** (ideal, requires client permission or anonymization)
2. **Hide gallery section entirely** (better than placeholder)
3. **Use wireframes/diagrams** with clear "Under NDA" labeling
4. **Show architecture diagrams** instead of UI screenshots

**Priority**: 🔴 **CRITICAL** — This single issue undermines entire portfolio credibility

---

### 4. Missing Social Proof Images (OG Tags)

**Location**: Every page references `/og/*.png` files that don't exist.

**What Happens When Shared**:
- LinkedIn: Broken image thumbnail
- Twitter: No preview card
- Slack: Just a link with no context

**Why This Matters**:
- First impression in social feeds is broken
- Looks unprofessional compared to competitors
- Reduces click-through from social shares
- Signals lack of attention to detail

**Perception**: "Their own marketing materials are broken — can they deliver for clients?"

**Fix Difficulty**: LOW (create 1-3 OG images, 1-2 hours with Figma/Canva)

**Priority**: 🔴 **HIGH** — Every share is a lost opportunity

---

## 🟠 Important Trust Issues

### 5. Positioning Inconsistency

**Problem**: Site messaging vacillates between "focused automation studio" and "full-service digital agency."

**Evidence of Confusion**:

**Hero Section** (messages/it.json lines 74-76):
```
title: "Prodotti digitali solidi, progettati con cura."
description: "Riduciamo lavoro manuale, errori e passaggi fra team con automazioni..."
```
→ Suggests **automation focus** ✅

**Services Section** (messages/it.json lines 237-245):
```
title: "Un team, un processo, qualità costante."
items:
  - "Progettazione UX/UI"
  - "Sviluppo Web & Mobile"
  - "Sviluppo Full-Stack"
  - "AI & Automazione"
```
→ Lists **4 equal capabilities** like full-service agency ❌

**Capabilities Section** (identical to Services):
```
title: "Capacità end-to-end, un team solo."
subtitle: "Design, sviluppo, AI e automazione: tutto internamente, senza subappalti."
```
→ Emphasizes **end-to-end / no outsourcing** (could be any agency) ❌

**Portfolio** (messages/it.json line 310):
```
title: "Progetti selezionati."
subtitle: "Esempi di prodotti e sistemi che costruiamo: alcuni pubblici, altri sotto NDA."
```
→ Generic "progetti selezionati" (could be anything) ❌

**Why This Confuses**:
- Visitor can't tell what you actually specialize in
- "Do they do branding? E-commerce? Consumer apps? Everything?"
- Generic positioning = commodity pricing pressure
- Doesn't differentiate from thousands of other "full-stack" studios

**Fix**: Pick one positioning and commit:
- **Option A**: "Automation & Operational Tools Studio" (narrow, credible)
- **Option B**: "Full-Service Digital Agency" (broad, commoditized)

**Recommended**: Option A (see HOMEPAGE_REWRITE_PLAN.md)

**Priority**: 🟠 **IMPORTANT** — Directly impacts lead quality and pricing power

---

### 6. Overclaiming Without Evidence

**Examples**:

**About Section** (messages/it.json lines 231-235):
```
title: "Cura, precisione, continuità."
subtitle: "Ogni progetto nasce da un'esigenza reale. Lo trasformiamo in un prodotto concreto 
attraverso un processo che controlla ogni fase..."
```

**Issues**:
- "Cura, precisione, continuità" → values everyone claims
- "ogni fase" → process description everyone uses
- No specific evidence (how many projects? uptime? team size? years active?)

**Portfolio Metrics** (hardcoded in Portfolio.tsx):
```tsx
{index === 0 && '8 settimane'}
{index === 0 && '3 dev + 1 designer'}
```

**Issues**:
- Numbers feel arbitrary (why exactly 8 weeks? why 3 dev + 1 designer?)
- Not backed by actual project data
- Inconsistent between portfolio cards and individual case study pages

**Proofs Section** (messages/it.json lines 156-161):
```
"result": "200+ email personalizzate/settimana, −90% tempo manuale"
```

**Better** (specific metrics), but:
- Only works if these are actual internal tools (dogfooding)
- Could be questioned: "How do we know these numbers are real?"

**Fix Strategy**:
1. **Replace vague values with concrete facts** (years active, systems live, uptime %)
2. **Verify all metrics are accurate** and can be defended
3. **Add secondary proof** (uptime monitoring screenshots, client logos, GitHub activity)

**Priority**: 🟠 **IMPORTANT** — Vague claims reduce credibility, specific facts build it

---

### 7. CTA Proliferation Signals Desperation

**Problem**: "Prenota audit 30 min" appears ~8+ times throughout the site.

**Occurrences**:
- Navbar (sticky, always visible)
- Hero section (primary CTA)
- Starting Points section (after each offer card)
- Proofs section (bottom CTA)
- Process section (inline link)
- Testimonials section (micro-CTA, currently disabled)
- Final CTA section (primary button)
- Footer (possibly)
- Contact page (multiple places)

**Why This Hurts**:
- Looks desperate ("please, please book a call!")
- Creates decision fatigue (too many identical options)
- Visitor ignores all CTAs because they're everywhere
- Professional services don't need to beg

**Better Approach**:
- **Hero**: Primary CTA (most important)
- **Mid-page**: 1-2 contextual CTAs (after proof/portfolio)
- **Footer**: Secondary conversion option
- **Total**: 3-4 CTAs max per page

**Priority**: 🟠 **IMPORTANT** — Reducing CTAs paradoxically increases conversions

---

## 🟡 Minor Trust Issues

### 8. "Since 2017" Claim Not Backed Up

**Location**: [messages/it.json](messages/it.json) line 89

```json
"since": "Dal 2017"
```

**Question**: Is this accurate? Can it be backed up with:
- Domain registration date?
- First client project?
- Company incorporation docs?
- GitHub first commit?

**Why It Matters**: Specific claims invite verification. If visitor Googles and finds contradiction, trust is destroyed.

**Fix**: Verify accuracy or remove claim.

---

### 9. "40+ sistemi live" Claim (in new About proposal)

**Location**: Proposed in HOMEPAGE_REWRITE_PLAN.md

```yaml
- label: "Sistemi live"
  value: "40+"
```

**Question**: Is this count accurate?
- Does it include one-off scripts or only maintained platforms?
- Can it be defended if a potential client asks for the list?
- Is it 40 separate client systems, or 40 internal automations?

**Why It Matters**: Specific numbers invite skepticism. Must be defensible.

**Fix**: Use real, verifiable number. Or use "15+ progetti attivi" (already referenced elsewhere).

---

### 10. Uptime Claims

**Proposed** (HOMEPAGE_REWRITE_PLAN.md):
```yaml
- label: "Uptime medio"
  value: ">99%"
```

**Question**: Based on what?
- Actual monitoring data (UptimeRobot, Pingdom)?
- Calculated across all client projects?
- Specific to internal tools only?

**Why It Matters**: Uptime is easily measured and verified. False claims are costly.

**Fix**: Only claim if:
1. You have monitoring proof
2. It's calculated honestly (including all systems, not cherry-picked)
3. You can show dashboard if asked

---

### 11. Response Time Claims

**Proposed** (HOMEPAGE_REWRITE_PLAN.md):
```yaml
- label: "Tempo risposta medio"
  value: "<24h"
```

**Question**: Is this actually true?
- Averaged over what time period?
- Includes weekends/holidays?
- Applies to support tickets or sales inquiries?

**Why It Matters**: If you claim <24h and then take 2 days to respond to inquiry, instant trust loss.

**Fix**: Claim what you can consistently deliver, not best-case scenario.

---

### 12. Contact Form Backend — Mailto Workaround

**Location**: [contact/page.tsx](app/[locale]/contact/page.tsx) lines 50-54

```tsx
const mailtoUrl = `mailto:contact@atavicolabs.com?subject=${...}&body=${...}`;
window.location.href = mailtoUrl;
```

**Why It Looks Unprofessional**:
- Opens user's email client (often not configured on mobile)
- No confirmation message ("Message sent!")
- No way to track if user actually sent email
- Looks like placeholder implementation ("we'll fix this later")

**Perception**: "They use mailto? Do they not know how to build a proper form backend?"

**Impact**: Low (most visitors use Calendly), but still suboptimal.

**Fix**: Implement proper form backend (Resend, Formspree, even Sheets webhook).

**Priority**: 🟡 **POLISH** — Doesn't block conversions but improves perception

---

## Language Consistency Issues

### Italian/English Translation Quality

**Generally Good**, but some rough spots:

**Example 1** — Awkward phrasing (en.json line 158):
```json
"description": "We cut manual work, errors, and handoffs with automation-first products built to ship reliably."
```
→ "built to ship reliably" sounds slightly off (better: "built to run reliably")

**Example 2** — Inconsistent tone (en.json line 676):
```json
"quote": "Polished UX, clean code, deadlines met. A rare partner to find."
```
→ "A rare partner to find" is grammatically awkward (better: "A rare find" or "Hard to find a partner like this")

**Fix**: Native English speaker review of en.json (1-2 hours)

**Priority**: 🟡 **POLISH** — Doesn't break comprehension but sounds non-native

---

## Trust Issues Summary

| Issue | Severity | Visitor Impact | Fix Difficulty | Urgency |
|-------|----------|----------------|----------------|---------|
| Language mixing (IT in EN) | 🔴 Critical | **Destroys credibility** | Low (2-3h) | Immediate |
| Placeholder screenshots | 🔴 Critical | **"Fake" perception** | High (weeks) | Immediate |
| Fake testimonials | 🔴 Critical | **Dishonest perception** | Low (remove) | Immediate |
| Missing OG images | 🔴 Critical | Poor social sharing | Low (1-2h) | Week 1 |
| Positioning inconsistency | 🟠 Important | Confusion, weak leads | Medium (rewrite) | Week 1 |
| Vague overclaiming | 🟠 Important | Skepticism | Medium (rewrite) | Week 1 |
| CTA proliferation | 🟠 Important | Decision paralysis | Low (remove) | Week 1 |
| Unverified "Since 2017" | 🟡 Minor | Potential contradiction | Low (verify) | Week 2 |
| Unverified metrics | 🟡 Minor | Potential contradiction | Medium (audit) | Week 2 |
| Mailto form | 🟡 Minor | Slightly unprofessional | Medium (backend) | Week 3 |
| Translation polish | 🟡 Minor | Non-native feel | Low (review) | Week 3 |

---

## Recommended Actions (Prioritized)

### Immediate (Week 1)
1. ✅ **Fix all hardcoded Italian strings** → Extract to i18n
2. ✅ **Remove or hide testimonials section** → Delete fake data from JSON
3. ✅ **Hide project gallery sections** → Or replace with "Under NDA" message
4. ✅ **Create default OG image** → Fix social sharing
5. ✅ **Reduce CTA count** → Max 3-4 per page

### Short Term (Weeks 2-3)
6. ✅ **Refocus positioning** → Implement HOMEPAGE_REWRITE_PLAN.md
7. ✅ **Verify all metrics** → Ensure claims are defendable
8. ✅ **Polish English copy** → Native speaker review
9. ✅ **Add real client logos** (if available) → Replace testimonials

### Medium Term (Month 1-2)
10. ⏱️ **Get real project screenshots** → Major credibility boost
11. ⏱️ **Implement proper contact form** → Replace mailto
12. ⏱️ **Add monitoring dashboard proof** → Backup uptime claims
13. ⏱️ **Get real testimonials** → Or keep section disabled

---

## Trust Recovery Checklist

Before marketing push, verify:

- [ ] English version shows zero Italian text
- [ ] No placeholder content visible to visitors
- [ ] All metrics/claims are accurate and defensible
- [ ] Social sharing works (OG images present)
- [ ] Positioning is consistent across all sections
- [ ] CTAs are purposeful, not desperate
- [ ] Portfolio shows actual work or honest "NDA" messaging
- [ ] Contact methods all work properly
- [ ] No "coming soon" or "placeholder" language anywhere
- [ ] Translation reads naturally to native speakers

---

_End of trust issues audit._
