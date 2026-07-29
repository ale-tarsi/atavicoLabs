# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js App Router)
npm run build    # Production build
npm start        # Start production server (after build)
npm run lint     # ESLint (extends next/core-web-vitals)
```

There is no test suite configured in this repository.

## Architecture

Next.js 14 App Router site, fully internationalized (it/en) via `next-intl`, for AtavicoLabs (dev/automation agency). Marketing site: homepage, three "offer" pages, a portfolio of project case studies, and a contact page.

### i18n routing

- All routes live under `app/[locale]/...`; `middleware.ts` forces the locale prefix (`localePrefix: 'always'`) and redirects unprefixed paths.
- Supported locales and default locale are defined in `src/i18n/config.ts` (`['it', 'en']`, default `'it'`).
- `src/i18n/request.ts` loads the right JSON message file per request from `messages/{locale}.json`.
- Every page/layout under `app/[locale]` receives `params: Promise<{ locale: string }>` (Next 14 async params) and calls `getTranslations({ locale, namespace })` server-side, or `useTranslations(namespace)` client-side.
- `next.config.mjs` permanently redirects `/:locale/offers` → `/:locale#starting-points` (the offers hub was folded into the homepage).

### Content model: constants + i18n split

Structural/type data and copy are deliberately separated — see `app/constants/I18N_KEY_STRUCTURE.md` for the full key map:

- `app/constants/offers.ts` — the 3 offers (`opsQuickWin`, `continuityRetainer`, `productBuild`) as typed objects holding only IDs, slugs, badges, and `*Count` fields (e.g. `examplesCount`, `stepsCount`). No copy lives here.
- `app/constants/proofs.ts`, `app/constants/projects.ts` — same pattern for proof-of-work cards and portfolio projects.
- `messages/it.json` / `messages/en.json` — all copy, keyed by namespace (e.g. `offers.opsQuickWin.examples.0`).
- Pages read a `*Count` from the constant and build translated arrays with `Array.from({ length: offer.examplesCount }).map((_, i) => t('...${i}'))` — see `app/[locale]/offers/ops-quick-win/page.tsx` for the canonical pattern used across all three offer pages.
- When adding an offer/proof example, list item, FAQ, etc.: bump the relevant `*Count` in the constants file AND add the corresponding numbered key to **both** `messages/it.json` and `messages/en.json`.

### Offer pages

Each offer page (`app/[locale]/offers/{slug}/page.tsx`) follows the same shape: fetch the offer via `getOffer(slug)`, build translated section props (hero, summary, outcomes, include, boundaries, useCases, process, faq, finalCta), and pass them into the shared `OfferTemplate` component. CTA links use `getCalendlyUrl(locale)` from `app/constants/links.ts` (currently locale-independent, single Calendly link).

### Feature flags

`app/constants/features.ts` gates homepage sections that need real content before shipping (`BLOG_ENABLED`, `TESTIMONIALS_ENABLED`, `NEWSLETTER_ENABLED` — all `false`). Check this file before assuming a component (`Blog.tsx`, `Testimonials.tsx`, `Newsletter.tsx`) is actually rendered.

### Tracking

`app/utils/track.ts` exposes `trackCtaClick(source, locale, meta)`, a client-only fire-and-forget beacon (`navigator.sendBeacon`, fallback `fetch`) to `POST /api/track`. In dev it just logs to console instead of sending. `app/api/track/route.ts` is a minimal endpoint that logs the payload server-side — no persistence/analytics backend wired up yet.

### Styling

Tailwind with a custom theme in `tailwind.config.ts`. Two color systems coexist:
- Current palette: `carbone` (bg), `grafite` (surfaces), `sabbia` (text), `grigio` (captions/borders), `oliva` (accent) — used in newer components.
- A "warm-*"/legacy palette kept for backward compatibility with older components (`warm-black`, `warm-text`, etc.) — don't migrate these unprompted, both are live in different components.

Custom type scale (`display-lg`, `h1`/`h2`/`h3`, `body`/`body-lg`/`body-sm`, `label`, `button`, `mono`) and content-width utilities (`max-w-content`, `max-w-text`) are defined in the same config and should be reused rather than re-specified with arbitrary Tailwind values.

### Path alias

`@/*` maps to the repo root (see `tsconfig.json`), so imports use `@/app/...` and `@/src/...`.
