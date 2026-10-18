# Site Structure Audit — atavicolabs.com

**Date**: 2026-03-08  
**Branch**: AutomazioneRetainerProduct  
**Tech Stack**: Next.js 14.2.5, next-intl, Tailwind CSS, Framer Motion

---

## Executive Summary

The site has a solid technical foundation with Next.js App Router, proper i18n setup (it/en), and reusable component architecture. However, there are **critical conversion and credibility issues** caused by hardcoded Italian strings in components, placeholder/disabled content, and weak information architecture around service differentiation.

---

## 1. Technical Architecture

### Stack & Routing ✅ SOLID

- **Framework**: Next.js 14.2.5 with App Router
- **i18n**: next-intl with `localePrefix: 'always'` (Italian default, English secondary)
- **Styling**: Tailwind CSS with custom color palette (carbone, sabbia, oliva, grigio, grafite)
- **Animations**: Framer Motion + custom reveal hooks
- **Routing**: `/[locale]/` structure with proper locale prefixes

**Files**:
- [next.config.mjs](next.config.mjs)
- [middleware.ts](middleware.ts)
- [src/i18n/config.ts](src/i18n/config.ts)

### Component Architecture ✅ GOOD SEPARATION

**Reusable Components** (app/components/):
- Layout: `Navbar`, `Footer`, `LanguageSwitcher`
- Sections: `Hero`, `About`, `Portfolio`, `Process`, `ProofsSection`, `ServicesSection`
- Offer System: `OfferTemplate`, `OfferCard`, `StartingPoints`
- Project System: `ProjectLayout` (for case studies)
- UI Elements: `SectionHeader`, `AuditLink`, `OfferBullets`, `OfferFAQ`

**Pages**:
- Homepage: [app/\[locale\]/page.tsx](app/[locale]/page.tsx)
- Offers: `/offers/ops-quick-win`, `/offers/continuity-retainer`, `/offers/product-build`
- Projects: 15 case study pages under `/projects/[slug]`
- Contact: [app/\[locale\]/contact/page.tsx](app/[locale]/contact/page.tsx)

### Content Architecture ✅ WELL STRUCTURED

**Translation Files**:
- [messages/it.json](messages/it.json) (2174 lines)
- [messages/en.json](messages/en.json) (2174 lines)

**Constants** (app/constants/):
- [offers.ts](app/constants/offers.ts) — Offer metadata (3 core offers)
- [projects.ts](app/constants/projects.ts) — Project metadata (15 projects)
- [features.ts](app/constants/features.ts) — Feature flags (BLOG_ENABLED, TESTIMONIALS_ENABLED, etc.)
- [links.ts](app/constants/links.ts) — External links (Calendly, social)
- [proofs.ts](app/constants/proofs.ts) — Internal automation case studies

**Structure**: Clean separation between structural data (constants) and copy (i18n files).

---

## 2. Routing & Navigation

### Homepage Flow (Priority Order)

1. **Hero** — Value proposition + CTA
2. **Starting Points** — 3 offer cards (Quick Win, Retainer, Product Build)
3. **ProofsSection** — 3 internal automation examples
4. **ServicesSection** — 4 capabilities (UX/UI, Web/Mobile, Full-Stack, AI/Automation)
5. **Portfolio** — 3 featured case studies
6. **ProcessSection** — 4-phase timeline visualization
7. **About** — Brief company intro
8. **Testimonials** — ⚠️ DISABLED (placeholder data)
9. **Blog** — ⚠️ DISABLED (no real articles)
10. **CTA** — Final conversion push
11. **Footer** — Links, newsletter signup (placeholder)

**Navigation Links** ([Navbar.tsx](app/components/Navbar.tsx)):
- Chi siamo (#about)
- Case study (#portfolio)
- Come lavoriamo (#process)
- Come partiamo (#starting-points)
- Contatti (#contact)
- CTA: "Prenota audit 30 min"

### Offer Pages ✅ CONSISTENT STRUCTURE

All three offers use [OfferTemplate](app/components/OfferTemplate.tsx) with:
- Hero (title, promise, bullets)
- Summary card (price, timeline, CTA)
- Outcomes (3 key benefits)
- Included deliverables
- Boundaries/exclusions
- Use case examples (6 for Quick Win, 5 for Retainer, 6 for Product)
- Process timeline (4-5 phases)
- FAQ (5 items each)
- Final CTA

**Offer URLs**:
- `/it/offers/ops-quick-win` (7 giorni, €1.5k–€3k)
- `/it/offers/continuity-retainer` (mensile, 3 piani: Care/Growth/OpsPlus)
- `/it/offers/product-build` (6-14 settimane, €12k–€40k)

### Project Pages ⚠️ MIXED PATTERNS

**Two patterns coexist**:
1. **ProjectLayout** wrapper (server-rendered, bilingual content objects) — Used by: Nuvia, Loopin, AI Workflow Assistant
2. **Custom client components** (framer-motion heavy) — Used by: HostID, HelixOps, Pulseshift, InsightGrid, FlowCanvas, Lytera, Vectis

**All projects have**:
- Back navigation
- Hero with project name + subtitle
- Meta info (client, timeline, platform, team)
- Overview, Problem, Solution, Results sections
- Tech stack
- Gallery section with ⚠️ placeholder screenshots

---

## 3. Information Architecture Issues

### 🔴 CRITICAL: Hardcoded Italian in Components

**Location**: Multiple components have hardcoded Italian strings that should be i18n keys.

**Affected Files & Lines**:

| File | Line(s) | Hardcoded String | Should Be |
|------|---------|------------------|-----------|
| [Process.tsx](app/components/Process.tsx) | 117 | `"del progetto"` | `t('process.projectPercent')` |
| [Process.tsx](app/components/Process.tsx) | 239 | `"Agile · Test-Driven Development · Continuous Integration"` | `t('process.methodology')` |
| [Process.tsx](app/components/Process.tsx) | 252 | `"Vuoi capire come applichiamo questo processo al tuo prodotto?"` | `t('process.ctaText')` |
| [Portfolio.tsx](app/components/Portfolio.tsx) | 97 | `"METRICHE PROGETTO"` | `t('portfolio.labels.metricsTitle')` |
| [Portfolio.tsx](app/components/Portfolio.tsx) | 103-105 | `"8 settimane"`, `"12 settimane"`, `"10 settimane"` | Should use project constants or i18n |
| [Portfolio.tsx](app/components/Portfolio.tsx) | 111-113 | `"3 dev + 1 designer"` etc. | Should use i18n keys |
| [Testimonials.tsx](app/components/Testimonials.tsx) | 80, 85 | `"Progetto in linea con il tuo?"`, `"Parliamone"` | `t('testimonials.cta')` |

**Impact**: English users see Italian text. This destroys credibility and confuses non-Italian speakers.

**Fix**: Extract all strings to `messages/it.json` and `messages/en.json`.

---

### 🟠 IMPORTANT: Offer Differentiation Not Clear Enough

**Problem**: The three offers (Quick Win, Retainer, Product Build) are well-structured but their **positioning and naming** could be clearer on first glance.

**Current Naming**:
- "Ops Quick Win" — Not immediately clear what "Ops" means
- "Continuity Retainer" — "Retainer" might be unclear to non-agency audiences
- "Product Build" — Generic, doesn't convey the end-to-end value

**Suggestions**:
1. Add clearer **one-line taglines** above or below titles on cards
2. Use more descriptive badges ("Fast Automation", "Ongoing Support", "Full Product")
3. Consider renaming for clarity:
   - "Quick Win Automation" (or "7-Day Automation Fix")
   - "Monthly Ops Support" (or "Ongoing Automation Care")
   - "Full Product Build" (or "Web/Mobile Product")

**Files to Update**:
- [messages/it.json](messages/it.json) — `offers.hub.offers.*.tagline`
- [OfferCard.tsx](app/components/OfferCard.tsx) — Emphasize tagline typography

---

### 🟠 IMPORTANT: Case Study Depth Varies Widely

**Problem**: Some projects have rich, specific content (Vectis, FlowCanvas, HostID) while others feel generic or thin (Nuvia, Loopin use bilingual content objects with basic structure).

**Inconsistencies**:
- **Mixed rendering patterns** (ProjectLayout vs custom components)
- **Gallery sections** all show placeholder text instead of actual screenshots
- **Metrics** (timeline, team size, results) are sometimes specific, sometimes generic

**Recommendations**:
1. Standardize on **one case study template** (suggest: extend ProjectLayout for consistency)
2. Replace all gallery placeholders with real screenshots or hide section
3. Add **specific metrics** to all projects:
   - Timeline (actual dates or duration)
   - Team composition (real roles)
   - Measurable outcomes (KPIs, improvements, user growth)

**Files**:
- All `/app/[locale]/projects/*/page.tsx` files
- [ProjectLayout.tsx](app/components/ProjectLayout.tsx)

---

### 🟡 POLISH: Navigation Could Highlight Offers More

**Current Navigation**:
- "Come partiamo" (#starting-points) exists but is buried mid-nav
- Primary CTA is "Prenota audit 30 min"

**Suggestion**:
- Consider renaming "Come partiamo" to "Offerte" or "Servizi"
- Or add a dropdown with the 3 offers visible on hover
- Add visual indicator (badge) for primary starting point

**Files**:
- [Navbar.tsx](app/components/Navbar.tsx)
- [messages/it.json](messages/it.json) — `navbar.*`

---

## 4. SEO & Metadata

### ✅ GOOD: Comprehensive Metadata

**All pages include**:
- Title, description, keywords
- OpenGraph tags (og:title, og:description, og:image)
- Twitter cards
- Canonical URLs
- Language alternates (hreflang)
- Structured data (Organization schema on homepage)

**Example**: [app/\[locale\]/page.tsx](app/[locale]/page.tsx) lines 21-74

### ⚠️ MISSING: OpenGraph Images

**Location**: [public/og/README.txt](public/og/README.txt)

```txt
TODO: Add default.png (1200x630px) for social sharing
```

**Impact**: Social shares show broken image or generic fallback.

**Action**: Create OG images for:
- `/og/default.png` (1200×630)
- `/og/ops-quick-win.png`
- `/og/continuity-retainer.png`
- `/og/product-build.png`
- Optional: Per-project images for case studies

---

## 5. Performance & Accessibility

### Performance Notes

- **Lazy loading**: No explicit lazy loading detected for heavy sections
- **Large JSON files**: Translation files are 2174 lines each — consider splitting by namespace for code-splitting
- **Framer Motion**: Heavy use of animations could impact low-end devices
- **Custom cursor**: [CustomCursor.tsx](app/components/CustomCursor.tsx) adds overhead (correctly hidden on touch devices)

### Accessibility ⚠️ NEEDS ATTENTION

**Missing ARIA labels**: 
- Carousel/reveal sections lack `aria-live` regions
- Some buttons missing `aria-label` when text is icon-only

**Keyboard navigation**:
- [OfferCard.tsx](app/components/OfferCard.tsx) has keyboard support (handleKeyDown) ✅
- Custom cursor might interfere with keyboard-only users

**Color contrast**: 
- Palette uses subtle contrasts (grigio/40, sabbia/70) — verify WCAG AA compliance
- Check especially: footer links, disabled sections

---

## 6. Conversion Funnel Analysis

### Primary Conversion Path

1. **Hero** → "Prenota audit 30 min" button
2. **Starting Points** → 3 offer cards → each links to `/offers/[slug]`
3. **Offer pages** → Sticky summary card with CTA → Calendly booking
4. **Contact page** → Form + Calendly embed

**CTAs Throughout**:
- Hero: Primary button
- Starting Points: Per-offer links
- ProofsSection: CTA at bottom
- Portfolio: "Leggi caso studio" per project
- Process: "Vuoi capire come..." link
- Testimonials: "Parliamone" micro-CTA (⚠️ disabled section)
- Footer: Newsletter signup (⚠️ placeholder)

### 🔴 CRITICAL: CTA Proliferation

**Problem**: Too many CTAs with similar text create decision paralysis.

**Count**:
- "Prenota audit 30 min" appears ~8+ times
- "Book a 30-min audit" (English)
- Various flavors: "Parliamone", "Contattaci", form buttons

**Recommendation**:
1. **Standardize CTA hierarchy**:
   - Primary: "Prenota audit 30 min" (Calendly)
   - Secondary: "Scopri offerta [X]" (to offer page)
   - Tertiary: "Vedi progetti" (to portfolio)
2. **Reduce total CTA count** — max 3-4 visible per page
3. **Add variation** by context:
   - Hero: "Prenota audit gratuito"
   - Offer page: "Prenota chiamata per [Offer Name]"
   - Contact: "Avvia conversazione"

---

## 7. Mobile Responsiveness

### Observed Patterns

- **Grid breakpoints**: `md:grid-cols-2`, `lg:grid-cols-3` used consistently
- **Typography**: Responsive font sizes via Tailwind (`text-[48px] sm:text-[56px] lg:text-[72px]`)
- **Navbar**: Mobile hamburger menu (assumed from pattern, not explicitly seen)
- **OfferCard**: Stack layout on mobile, side-by-side on desktop

### ⚠️ Potential Issues

- **Long project names** on mobile (e.g., "AI Workflow Assistant")
- **Process timeline** (Process.tsx) uses diagonal offset on `sm:` breakpoint — test on tablets
- **Portfolio wireframe mockups** hidden on mobile (`hidden lg:flex`) — good choice

---

## 8. Content Management

### Current System: Static JSON + Constants

**Pros**:
- Fast, no database overhead
- Type-safe via TypeScript
- Git-based content versioning
- Easy to localize (parallel JSON files)

**Cons**:
- No CMS UI for non-technical editors
- Adding new projects requires code deploy
- Translation sync must be manual

### Scalability

**If content grows**:
- Consider migrating to headless CMS (Sanity, Contentful, Strapi)
- Or keep static but add validation scripts to ensure key parity between it.json/en.json

---

## Recommendations Summary

### 🔴 Critical (Blocks Conversion)

1. **Fix hardcoded Italian in components** → Extract to i18n
2. **Remove/replace placeholder testimonials** → Get real client quotes or hide section
3. **Create OpenGraph images** → Improve social sharing
4. **Standardize CTA text and reduce proliferation** → Clear hierarchy

### 🟠 Important (Hurts Credibility)

5. **Add real screenshots to project galleries** → Or hide placeholder sections
6. **Clarify offer differentiation** → Stronger taglines, clearer naming
7. **Standardize case study template** → One pattern, consistent depth
8. **Ensure all project metrics are specific** → Real numbers, not generic

### 🟡 Polish (Improves Experience)

9. **Optimize mobile typography** → Test long titles, Process timeline
10. **Audit color contrast** → Ensure WCAG AA compliance
11. **Add ARIA labels** → Improve screen reader support
12. **Consider i18n file splitting** → Reduce initial bundle size

---

## Next Steps

See:
- **CONTENT_GAPS.md** — Missing content and placeholder inventory
- **TRUST_ISSUES.md** — Specific credibility problems
- **IMPLEMENTATION_PLAN.md** — Prioritized execution roadmap
