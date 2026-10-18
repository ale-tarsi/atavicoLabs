# Content Gaps — atavicolabs.com

**Date**: 2026-03-08  
**Purpose**: Inventory of missing, placeholder, or incomplete content that hurts conversion and credibility.

---

## Executive Summary

The site has strong structural bones but is undermined by **placeholder content, disabled sections, and missing visual assets**. Most critical: gallery placeholders in all case studies, disabled testimonials/blog sections, and missing social sharing images.

---

## 🔴 Critical Gaps (Block Conversion)

### 1. Project Gallery Screenshots — ALL MISSING

**Location**: Every case study page under `/projects/[slug]`

**Affected Projects** (15 total):
- [hostid/page.tsx](app/[locale]/projects/hostid/page.tsx) — 4 placeholders
- [helixops/page.tsx](app/[locale]/projects/helixops/page.tsx) — 4 placeholders  
- [pulseshift/page.tsx](app/[locale]/projects/pulseshift/page.tsx) — 4 placeholders
- [insightgrid/page.tsx](app/[locale]/projects/insightgrid/page.tsx) — 4 placeholders
- [flowcanvas/page.tsx](app/[locale]/projects/flowcanvas/page.tsx) — 4 placeholders
- [lytera/page.tsx](app/[locale]/projects/lytera/page.tsx) — 1 placeholder
- [vectis/page.tsx](app/[locale]/projects/vectis/page.tsx) — 1 placeholder
- [crispin/page.tsx](app/[locale]/projects/crispin/page.tsx) — 1 placeholder
- ...and 7 more projects

**Current State**:
```tsx
<div className="aspect-[9/16] bg-warm-card border border-warm-border flex items-center justify-center">
  <p className="text-warm-muted/50 text-sm">{t('gallery.placeholder')}</p>
</div>
```

**Translation Keys**:
- IT: `"Placeholder per schermate mobile"` / `"Screenshot in arrivo"`
- EN: `"Placeholder for mobile screens"` / `"Screenshots coming soon"`

**Impact**: 
- Destroys credibility immediately
- Signals project is fake or unfinished
- Prevents visitors from evaluating quality of work
- Massive red flag for potential clients

**Options**:
1. **Replace with real screenshots** (ideal)
2. **Hide gallery section entirely** until screenshots ready
3. **Use wireframes** (if under NDA) with proper labeling
4. **Add "Under NDA" message** for sensitive projects

**Files to Update**: All 15 project pages + translation keys

---

### 2. OpenGraph / Social Sharing Images — MISSING

**Location**: [public/og/README.txt](public/og/README.txt)

**Current**:
```txt
TODO: Add default.png (1200x630px) for social sharing
```

**Affected URLs**:
- All offer pages reference: `/og/ops-quick-win.png`, `/og/continuity-retainer.png`, `/og/product-build.png`
- Homepage/project pages fallback to: `/og/default.png`
- None of these files exist

**Impact**:
- Broken images when sharing on LinkedIn, Twitter, Slack
- Unprofessional, hurts trust
- Lost opportunity to control first impression in social feeds

**Action**:
1. Create `/public/og/default.png` (1200×630px) — AtavicoLabs branded
2. Create offer-specific images (optional, or use default)
3. Consider generating programmatically (e.g., with Vercel OG)

---

### 3. Testimonials Section — COMPLETELY DISABLED

**Location**: [app/[locale]/page.tsx](app/[locale]/page.tsx) line 140

```tsx
{/* 6. Testimonials - Fiducia (disabled: placeholder data) */}
{FEATURES.TESTIMONIALS_ENABLED && <Testimonials />}
```

**Current Data** (messages/it.json, lines 666-688):
```json
"testimonials": {
  "items": [
    {
      "quote": "Hanno trasformato un'idea complessa in un prodotto stabile...",
      "author": "Marco Benedetti",
      "role": "CEO",
      "company": "FinTech Solutions"
    },
    // 2 more similar entries
  ]
}
```

**Problem**: These appear to be **fabricated testimonials** (generic names, no verifiable details).

**Impact**:
- If enabled, looks dishonest (fake social proof)
- If kept disabled, lost opportunity for trust-building
- Placeholder data in codebase creates technical debt

**Options**:
1. **Get real client testimonials** with permission (names, companies, URLs)
2. **Replace with logos** ("Clients we've worked with") if under NDA
3. **Remove entirely** until real testimonials available
4. **Use mini case study quotes** from actual project work

**Recommendation**: Remove section entirely for now. Add back only when real quotes secured.

---

## 🟠 Important Gaps (Hurt Credibility)

### 4. Blog Section — COMPLETELY DISABLED

**Location**: [app/[locale]/page.tsx](app/[locale]/page.tsx) line 143

```tsx
{/* 7. Blog - Valore (disabled: placeholder articles) */}
{FEATURES.BLOG_ENABLED && (
  <section id="blog" className="scroll-mt-24">
    <Blog />
  </section>
)}
```

**Current Data** (messages/it.json, lines 690-714):
```json
"blog": {
  "items": [
    {
      "title": "Come valutare un preventivo software senza errori comuni",
      "description": "Criteri chiari per analizzare offerte...",
      "category": "Business",
      "readTime": "7 min",
      "date": "2025-11-05"
    },
    // 2 more article stubs
  ]
}
```

**Problem**: 
- Articles don't exist (no routes, no content)
- Dates are in the past (2025-10/11 — we're in 2026-03)
- Looks abandoned or fake

**Impact**:
- If enabled: Broken links, looks dishonest
- If disabled: Navigation promises content that doesn't exist

**Options**:
1. **Remove from navigation/code** entirely
2. **Write 3 real articles** then enable
3. **Replace with "Case Study Insights"** (excerpts from existing projects)

**Recommendation**: Remove entirely. Reconsider only if committing to regular writing.

---

### 5. Newsletter Signup — PLACEHOLDER

**Location**: [app/components/Footer.tsx](app/components/Footer.tsx) lines 95-115

```tsx
<div className="space-y-2">
  <label htmlFor="newsletter-email" className="block text-[12px] text-sabbia/80 font-medium">
    Newsletter
  </label>
  <div className="flex gap-2">
    <input
      type="email"
      id="newsletter-email"
      placeholder="La tua email"
      className="w-full bg-grafite border border-grigio/20..."
    />
    <button className="px-4 py-2 bg-oliva text-carbone text-[13px]...">
      →
    </button>
  </div>
  <p className="text-[10px] text-grigio/60">
    Una volta al mese: progetti, approfondimenti e guide pratiche.
  </p>
</div>
```

**Problem**:
- Form doesn't connect to any email service
- No backend endpoint for `/api/newsletter` or similar
- Promises "una volta al mese" but no list exists

**Impact**:
- Looks abandoned if user tries to subscribe
- False promise damages trust

**Options**:
1. **Remove entirely** from footer
2. **Connect to real service** (Mailchimp, ConvertKit, etc.) if planning newsletter
3. **Replace with social links** or secondary CTA

**Recommendation**: Remove. Reinstate only when newsletter is active and delivering value.

---

### 6. Project Metrics — Hardcoded and Inconsistent

**Location**: [app/components/Portfolio.tsx](app/components/Portfolio.tsx) lines 103-113

```tsx
<div className="text-sabbia font-medium">
  {index === 0 && '8 settimane'}
  {index === 1 && '12 settimane'}
  {index === 2 && '10 settimane'}
</div>
// ...
<div className="text-sabbia">
  {index === 0 && '3 dev + 1 designer'}
  {index === 1 && '4 dev + 1 data scientist'}
  {index === 2 && '2 dev + 1 AI engineer'}
</div>
```

**Problem**:
- Hardcoded Italian strings (English users see Italian)
- Not tied to actual project data (generic, possibly inaccurate)
- Inconsistent with individual case study pages

**Impact**:
- Language mixing breaks trust
- Generic numbers feel made up
- Maintenance nightmare (updating requires code change)

**Options**:
1. **Move to i18n files** immediately (quick fix for language)
2. **Store in project constants** (projects.ts) with real data
3. **Match individual case study metrics** for consistency

**Recommendation**: Extract to i18n + validate accuracy against real projects.

---

## 🟡 Polish Gaps (Improve Experience)

### 7. About Section — Team Photo Placeholder

**Location**: [app/components/About.tsx](app/components/About.tsx) line 63

```tsx
{/* Team Photo Placeholder */}
<div className="aspect-[4/3] bg-grafite border border-grigio/20 flex items-center justify-center">
  <span className="text-grigio/40 text-[13px]">Team Photo</span>
</div>
```

**Impact**: Not critical (many studios don't show team photos), but reinforces "unfinished" feeling.

**Options**:
1. **Add real team photo** (if team is comfortable)
2. **Replace with workspace/setup photo** (if preferring anonymity)
3. **Remove image entirely**, expand text content
4. **Replace with illustrated graphic** (brand-consistent)

**Recommendation**: Remove or replace with non-human visual (workspace, tools, diagram).

---

### 8. Footer Links — Some Broken/Incomplete

**Location**: [app/components/Footer.tsx](app/components/Footer.tsx)

**Current Links**:
- Privacy Policy — `/privacy` (route doesn't exist?)
- Terms of Service — `/terms` (route doesn't exist?)
- GitHub — `https://github.com/atavicoLabs` (verify real)

**Impact**: Minor, but broken links hurt professionalism.

**Action**: 
1. Create actual Privacy/Terms pages (legal requirement in EU)
2. Or link to external docs (Google Docs, Notion)
3. Verify GitHub link is correct

---

### 9. Contact Form — Backend Not Implemented

**Location**: [app/\[locale\]/contact/page.tsx](app/[locale]/contact/page.tsx) lines 32-60

```tsx
const mailtoUrl = `mailto:contact@atavicolabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
window.location.href = mailtoUrl;
```

**Current**: Form uses `mailto:` link (opens user's email client).

**Problem**:
- Many users don't have email clients configured
- Can't track submissions
- No confirmation email to user
- Looks unprofessional compared to modern forms

**Impact**: Lost leads from users who can't or won't use email client.

**Options**:
1. **Implement proper backend** (Resend, SendGrid, Postmark)
2. **Use form service** (Formspree, Tally, Basin)
3. **Keep mailto** but add warning text
4. **Prioritize Calendly** as primary CTA (already working)

**Recommendation**: Keep mailto for now (functional), but add backend form in Phase 2.

---

## 🔵 Minor Gaps (Nice to Have)

### 10. Favicon/App Icons — Not Verified

**Expected Locations**:
- `/favicon.ico`
- `/apple-touch-icon.png`
- `/favicon-16x16.png`, `/favicon-32x32.png`

**Action**: Verify these exist and render correctly across devices.

---

### 11. Loading States — Not Present

**Observed**: Contact form shows "Invio email..." but doesn't persist (instant redirect to mailto).

**Enhancement**: Add proper loading states for:
- Page transitions (Next.js Suspense)
- Form submissions
- Route changes

**Priority**: Low (site is fast, Next.js handles most of this).

---

### 12. Error Pages — Not Customized

**Expected**: 404, 500 custom error pages matching brand.

**Current**: Likely using Next.js defaults.

**Action**: Create custom `app/[locale]/not-found.tsx` and `app/error.tsx`.

---

## Content Gaps Summary Table

| Gap | Severity | Visibility | Effort | Impact if Fixed |
|-----|----------|------------|--------|-----------------|
| Project gallery screenshots | 🔴 Critical | High | High | Massive (+credibility) |
| OpenGraph images | 🔴 Critical | Medium | Low | High (+social sharing) |
| Testimonials (fake data) | 🔴 Critical | High | Medium | High (+trust) |
| Blog (dead links) | 🟠 Important | Low | High | Medium (+authority) |
| Newsletter (placeholder) | 🟠 Important | Medium | Low | Low (remove clutter) |
| Hardcoded metrics | 🟠 Important | Medium | Low | Medium (+i18n) |
| Team photo placeholder | 🟡 Polish | Low | Low | Low (minor) |
| Footer legal links | 🟡 Polish | Low | Medium | Low (compliance) |
| Contact form backend | 🟡 Polish | Medium | Medium | Medium (+UX) |
| Favicon verification | 🔵 Minor | Low | Low | Low (polish) |
| Loading states | 🔵 Minor | Low | Low | Low (polish) |
| Error pages | 🔵 Minor | Low | Low | Low (polish) |

---

## Recommended Prioritization

### Phase 1: Remove Damage (Quick Wins)
1. ✅ **Hide gallery sections** on all project pages (or add "Under NDA" message)
2. ✅ **Create default OG image** (1200×630)
3. ✅ **Remove newsletter signup** from footer
4. ✅ **Confirm testimonials stay disabled**
5. ✅ **Confirm blog stays disabled**

**Time**: 2-4 hours  
**Impact**: Removes all "obviously fake" elements

### Phase 2: Fix i18n Inconsistencies
6. ✅ Extract hardcoded Italian strings (Portfolio, Process, etc.)
7. ✅ Verify all components read from i18n files
8. ✅ Test English version thoroughly

**Time**: 2-3 hours  
**Impact**: Site works properly in both languages

### Phase 3: Add Real Content (Longer Term)
9. ⏱️ Collect real project screenshots (or decide to hide galleries permanently)
10. ⏱️ Get client testimonials with permission (or remove section permanently)
11. ⏱️ Create Privacy Policy and Terms pages
12. ⏱️ Implement proper contact form backend
13. ⏱️ Write 3 real blog posts (if blog strategy confirmed)

**Time**: Weeks (dependent on client permissions, legal review, writing)  
**Impact**: Transforms site from "good structure" to "credible portfolio"

---

## Open Questions for Stakeholder

1. **Project screenshots**: Can you share real UI from any of the 15 projects, or are all under strict NDA?
2. **Testimonials**: Do you have any client relationships where you could request a brief quote?
3. **Newsletter**: Is there a plan to actually run a newsletter, or should we remove it permanently?
4. **Blog**: Genuine interest in content marketing, or is this aspirational?
5. **About section**: Comfortable showing team visually, or prefer staying more anonymous?

---

_End of content gaps audit._
