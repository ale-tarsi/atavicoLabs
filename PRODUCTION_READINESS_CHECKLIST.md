# Production Readiness Checklist — atavicoLabs

> Last updated: marzo 2026. Stato post technical polish pass.

---

## ✅ Completato in questo pass

### SEO & Metadata
- [x] `metadata.title` e `metadata.description` aggiornati per riflettere il positioning attuale (ops automation) — rimosso il vecchio "prodotti digitali solidi, web e app mobile"
- [x] `metadata.keywords` aggiornati in IT e EN con keyword rilevanti (ops automation, workflow automation, integrazione sistemi)
- [x] `layout.tsx` — rimosso `canonical: '/'` errato (era uguale per tutte le lingue)
- [x] `layout.tsx` — default description aggiornato in inglese per coerenza
- [x] Pagine offerta — canonical URL corrette: ora usano `https://atavicolabs.com/{locale}/offers/...` (prima erano path relative)
- [x] Homepage `page.tsx` — OG image path homogeneizzato: `og-image.jpg` → `/og/default.png` (coerente con layout e offerte)
- [x] `layout.tsx` — structured data Organization: descrizione aggiornata, logo corretto da `/logo.png` (inesistente) a `/icon.svg`
- [x] `structured data` — restaurato `address` + `contactPoint` wrapping corretto

### Pagine e metadata
- [x] **Pagina contatti** — refactoring da `'use client'` a wrapper server/client: ora esporta `generateMetadata` con title, description, canonical per lingua
- [x] **Pagina Privacy** — creata (`/[locale]/privacy/page.tsx`) con contenuto GDPR-compliant minimo in IT e EN
- [x] **Pagina Termini** — creata (`/[locale]/terms/page.tsx`) con contenuto legale minimo in IT e EN
- [x] Entrambi i link footer `Privacy` / `Termini` ora usano path locale-aware: `/${locale}/privacy`, `/${locale}/terms`

### Sitemap
- [x] `sitemap.ts` — aggiunta pagina `/contact` per entrambe le lingue (priority 0.9)
- [x] `sitemap.ts` — aggiunte tutte le 14 pagine progetto per entrambe le lingue (priority 0.6)
- [x] Totale URL in sitemap: 2 homepage + 2 contact + 6 offer + 28 project = **38 URL** (erano 8)

### JSON valido, TypeScript pulito
- [x] Entrambi i file messages/*.json validano correttamente
- [x] `npx tsc --noEmit` → 0 errori

---

## 🟡 Da fare — Alta priorità

### OG Images (asset mancanti)
- [ ] **`/public/og/default.png`** — mancante. Senza questo file, tutti i social share dal sito mostreranno card vuota. Dimensioni: 1200×630px, contenuto consigliato: logo + tagline su sfondo `#1A1A14` (carbone)
- [ ] **`/public/og/ops-quick-win.png`** — referenziato nei metadata dell'offerta, file assente
- [ ] **`/public/og/continuity-retainer.png`** — idem
- [ ] **`/public/og/product-build.png`** — idem (vedi `offers/product-build/page.tsx` per metadata)
- **Tool consigliato**: Vercel OG Image Generation (`@vercel/og`) per generare OG dinamici con route `/api/og`

### Metadata pagine progetto
- [ ] Tutte le 14 pagine in `/[locale]/projects/*/page.tsx` sono componenti `'use client'` e non esportano `generateMetadata` → title di fallback generico
- **Pattern da applicare**: stesso schema usato per contact page — separare `page.tsx` (server) da `ProjectContent.tsx` (client)
- **Priorità**: alta per Flowcanvas, Loopin, HelixOps (pagine più complete e linkate dal portfolio)

### Favicon / App icons
- [ ] Solo `/public/icon.svg` presente. Assenti: `favicon.ico`, `apple-touch-icon.png` (180×180), `og-manifest.json`
- Per Next.js 14 App Router: creare `/app/icon.svg` o `/app/favicon.ico` nella root app/ per override automatico

---

## 🟡 Da fare — Media priorità

### Struttura heading nelle pagine progetto (vecchia architettura)
- [ ] Alcune pagine progetto (es. `flowcanvas/page.tsx`) usano ancora `warm-black`, `warm-text`, `warm-muted`, `warm-accent` come classi Tailwind — residui di una palette precedente non più definita. Verificare se Tailwind ha queste custom colors definite nel config, altrimenti le classi sono no-op.

### Canonical URL homepage page.tsx
- [ ] `page.tsx` genera canonical `https://atavicolabs.com/it` (con prefisso locale). Google consiglia di specificare la versione preferita; verificare se si vuole `atavicolabs.com` (senza locale) come canonical principale con `x-default` hreflang.

### Analytics / CRO
- [ ] Nessun analytics attivo (GA4, Plausible, o simile). Senza tracking reale, impossibile ottimizzare conversioni nel tempo. Considerare Plausible (GDPR-first, no cookie banner richiesto) o Vercel Analytics (già disponibile se ospitato su Vercel).

### Contact form: backend
- [ ] Il form contatti usa `window.location.href = mailtoUrl` — apre il client email locale. Questo fallisce su dispositivi mobile senza client configurato. Valutare: Resend + Route Handler (`app/api/contact/route.ts`) per invio server-side o Formspree come alternativa zero-infra.

---

## 🟢 Da fare — Bassa priorità / Miglioramenti

### Accessibilità
- [ ] `<CustomCursor>` — verificare che non interferisca con navigazione da tastiera o su dispositivi touch
- [ ] Immagini nel portfolio — aggiungere attributi `alt` descrittivi dove mancanti
- [ ] Focus management nelle pagine offerta: verificare che `focus-visible` sia applicato a tutti i link interattivi (la maggior parte già ha `focus-visible:ring-2 focus-visible:ring-oliva/60`)

### Performance
- [ ] `hero.mp4` in `/public/` — verificare dimensione file e aggiungere `preload="metadata"` o `preload="none"` se non è above-the-fold critico
- [ ] Considerare `next/image` per eventuali immagini statiche non ancora ottimizzate
- [ ] Abilitare HTTP/2 push via Vercel config o header `Link: rel=preload` per font/CSS critici

### Link `href="#"` nel blog
- [ ] `Blog.tsx` usa `blog.cta` che punta a `href="#"` — i link articolo sono placeholder. Prima di attivare `FEATURES.BLOG_ENABLED`, sostituire con URL reali

### Robots.txt
- [ ] Attuale `robots.txt` permette tutto. Una volta in produzione, verificare che non vengano indicizzate le route API (`/api/*`) o gli staging branch (se usati su Vercel)

---

## 📋 Architettura attuale per referenza

```
Locales: it (default), en
Routing: localePrefix: 'always' → /it/*, /en/*
Redirect: atavicolabs.com → /it (tramite middleware next-intl)

Pagine con generateMetadata:
✅ /[locale]/page.tsx (homepage)
✅ /[locale]/contact/page.tsx
✅ /[locale]/offers/ops-quick-win/page.tsx
✅ /[locale]/offers/continuity-retainer/page.tsx
✅ /[locale]/offers/product-build/page.tsx
✅ /[locale]/privacy/page.tsx
✅ /[locale]/terms/page.tsx
❌ /[locale]/projects/*/page.tsx (14 pagine — tutti 'use client')

Sitemap: 38 URL (automatica via app/sitemap.ts)
robots.txt: Allow all, sitemap dichiarata
Structured data: Organization schema nel layout (JSON-LD)
```
