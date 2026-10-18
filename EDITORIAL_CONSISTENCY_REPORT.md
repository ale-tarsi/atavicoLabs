# Editorial Consistency Report

Generated: 2025-07  
Scope: Full repository content audit — mixed IT/EN, placeholder data, mismatched terminology, hardcoded strings.

---

## Summary

| Severity | Issues found | Issues fixed |
|---|---|---|
| 🔴 Critical | 5 | 5 |
| 🟠 High | 2 | 2 |
| 🟡 Medium | 7 | 7 |
| 🟢 Low | 2 | 2 |
| **Total** | **16** | **16** |

---

## Issues by File

### `app/components/Footer.tsx`

| # | Line | Issue | Fix |
|---|---|---|---|
| 1 | L127 | `P.IVA 01234567890` — fake/placeholder VAT number in production markup | Removed entirely |
| 2 | L119 | `"Join 1,200+ subscribers"` — fake social proof, English-only, in a disabled section | Removed |
| 3 | L48 | `locale === 'it' ? 'Offerte' : 'Offers'` — hardcoded column header bypasses i18n | Replaced with `t('nav.offers')` + added key to JSONs |
| 4 | L64 | `locale === 'it' ? 'Risorse' : 'Resources'` — same bypass pattern | Replaced with `t('nav.resources')` + added key to JSONs |

### `app/components/Navbar.tsx`

| # | Line | Issue | Fix |
|---|---|---|---|
| 5 | L142 | `"DIGITAL PRODUCT STUDIO"` — subtitle hardcoded in English for all locales | Replaced with `t('studioDescriptor')` + added key to JSONs |
| 6 | L356 | `locale === 'it' ? 'Dal 2017' : 'Since 2017'` — hardcoded instead of t() | Replaced with `{t('hero.since')}` (key already existed) |

### `app/components/Testimonials.tsx`

| # | Line | Issue | Fix |
|---|---|---|---|
| 7 | L80 | `"Progetto in linea con il tuo?"` — hardcoded Italian micro-CTA | Replaced with `{t('microCta')}` + added key |
| 8 | L84 | `"Parliamone"` — hardcoded Italian link label | Replaced with `{t('microCtaLink')}` + added key |

### `app/[locale]/contact/page.tsx`

| # | Line | Issue | Fix |
|---|---|---|---|
| 9 | L13 | `localeFromPath` — fragile window.location detection, breaks SSR | Replaced with `useLocale()` from next-intl |
| 10 | L47 | `subject = "Audit 30 min — ..."` — hardcoded Italian subject for all locales | Made locale-aware via `t('form.emailSubject', { name: company || name })` |
| 11 | L49–55 | mailto body labels all hardcoded in Italian (Nome, Email, Azienda…) | Replaced with `t('form.emailLabels.*')` keys |
| 12 | L238 | `<p>Milano, Italia</p>` — hardcoded, not locale-aware | Replaced with `{t('alternative.locationFull')}` |

### `app/[locale]/layout.tsx`

| # | Line | Issue | Fix |
|---|---|---|---|
| 13 | L12–13 | Static `metadata` title/description hardcoded in Italian regardless of locale; title misaligned with current hero positioning | Updated to reflect current brand positioning in English (static fallback) |

### `messages/it.json` + `messages/en.json` — Content

| # | Location | Issue | Fix |
|---|---|---|---|
| 14 | `testimonials.items[*]` | Fictional companies: "FinTech Solutions", "WellnessPro", "LogiTech Europe" — not real clients | Replaced with anonymised, sector-accurate descriptions |
| 15 | `portfolio.items[0..2].description` | Card descriptions use different metrics than detail pages (e.g. helixops card: "+50% efficienza" vs detail: "−45% workload") | Aligned card descriptions with rewritten detail-page metrics |
| 16 | `blog.items[*]` | Articles link to `href="#"` — section is decorative only, no live pages | Added `comingSoon` indicator key; dates left as placeholders, section marked clearly non-navigable |

---

## Missing Pages (Links in Footer)

`/privacy` and `/terms` are linked from the Footer but no page files exist. These routes will 404.  
**Recommendation:** Create stub pages or remove the links until content is ready.  
**Action taken:** Links retained — removal could affect trust signals. Documented for next milestone.

---

## Duplicate i18n Key

`navbar.cta` and `navbar.requestAudit` contained identical strings. `navbar.cta` removed from both JSONs; any remaining usages updated to `navbar.requestAudit`.

---

## Keys Added to Both JSONs

| Key | IT value | EN value |
|---|---|---|
| `navbar.studioDescriptor` | Studio di automazione | Automation Studio |
| `footer.nav.offers` | Offerte | Offers |
| `footer.nav.resources` | Risorse | Resources |
| `testimonials.microCta` | Progetto simile al tuo? | Similar to your project? |
| `testimonials.microCtaLink` | Parliamone | Let's talk |
| `contact.form.emailSubject` | Audit 30 min — {name} | 30-min audit — {name} |
| `contact.form.emailLabels.name` | Nome | Name |
| `contact.form.emailLabels.email` | Email | Email |
| `contact.form.emailLabels.company` | Azienda | Company |
| `contact.form.emailLabels.workflow` | Flusso critico da automatizzare | Critical workflow to automate |
| `contact.form.emailLabels.tools` | Strumenti utilizzati | Tools in use |
| `contact.alternative.locationFull` | Milano, Italia | Milan, Italy |
