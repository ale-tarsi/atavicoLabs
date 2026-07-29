# AtavicoLabs — Landing Page

Sito marketing multilingua (IT/EN) di AtavicoLabs, costruito con Next.js 14 (App Router), TypeScript e Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **i18n:** next-intl (routing con prefisso locale, `it` di default)
- **Styling:** Tailwind CSS (tema custom)
- **Animations:** Framer Motion
- **Icons:** lucide-react
- **Language:** TypeScript

## 📦 Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev

# Build di produzione
npm run build

# Avvia il server di produzione (dopo la build)
npm start

# Lint
npm run lint
```

Non è presente una test suite.

## 📁 Struttura del progetto

```
atavicoLabs/
├── app/
│   ├── [locale]/                # Tutte le route, prefissate per lingua (/it, /en)
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Layout locale (metadata, structured data, provider next-intl)
│   │   ├── offers/                # 3 pagine offerta (ops-quick-win, continuity-retainer, product-build)
│   │   ├── projects/              # Case study portfolio (uno per progetto)
│   │   └── contact/                # Pagina di contatto
│   ├── components/                # Componenti UI (sezioni homepage, offer template, ecc.)
│   │   └── CaseStudy/              # Layout condiviso dei case study
│   ├── constants/                  # Dati strutturali (offers, proofs, projects, features, links)
│   ├── hooks/                       # Hook custom (es. useReveal per animazioni on-scroll)
│   ├── utils/                        # Utility (es. tracking eventi CTA)
│   ├── api/track/                     # Endpoint per il logging degli eventi di tracking
│   └── globals.css                     # Stili globali
├── src/i18n/                            # Config next-intl (locales, request config)
├── messages/                             # Copy testuale, un file JSON per lingua (it.json, en.json)
├── public/                                # Asset statici
├── middleware.ts                           # Middleware next-intl (forza il prefisso locale)
├── tailwind.config.ts                       # Design tokens (colori, tipografia, spacing)
└── package.json
```

## 🌍 Internazionalizzazione

- Locale supportati: `it` (default), `en` — vedi `src/i18n/config.ts`.
- Ogni URL è sempre prefissato dal locale (es. `/it`, `/en/offers/product-build`).
- Tutto il copy testuale vive in `messages/it.json` / `messages/en.json`, organizzato per namespace.
- I dati strutturali (slug, badge, conteggi di elementi ripetuti) sono separati dal copy e vivono in `app/constants/*.ts`. La struttura completa delle chiavi i18n per offerte e proofs è documentata in `app/constants/I18N_KEY_STRUCTURE.md`.

Quando si aggiunge un elemento ripetuto (esempio, FAQ, step, ecc.) a un'offerta o proof, va aggiornato **sia** il relativo `*Count` nel file constants **sia** la chiave numerata in entrambi i file `messages/*.json`.

## 🚩 Feature flags

Alcune sezioni della homepage sono disattivate finché non c'è contenuto reale, tramite `app/constants/features.ts`:

- `BLOG_ENABLED`
- `TESTIMONIALS_ENABLED`
- `NEWSLETTER_ENABLED`

## 📊 Tracking

I click sulle CTA vengono tracciati tramite `app/utils/track.ts` (`trackCtaClick`), che invia un evento a `POST /api/track` via `sendBeacon`/`fetch`. In sviluppo l'evento viene solo loggato in console. L'endpoint (`app/api/track/route.ts`) al momento si limita a loggare il payload lato server, senza persistenza.

## 🎨 Personalizzazione

- **Colori e tipografia:** `tailwind.config.ts` — palette attuale (`carbone`, `grafite`, `sabbia`, `grigio`, `oliva`) più una palette legacy (`warm-*`) ancora usata da alcuni componenti più vecchi.
- **Contenuti:** modifica i file in `messages/it.json` / `messages/en.json`; per elementi ripetuti aggiorna anche i `*Count` in `app/constants/`.
- **Nuove sezioni homepage:** crea il componente in `app/components/`, importalo in `app/[locale]/page.tsx` e aggiungi le relative chiavi i18n.
- **Nuova offerta:** aggiungi una entry in `app/constants/offers.ts`, crea la route in `app/[locale]/offers/{slug}/page.tsx` seguendo il pattern esistente (vedi `ops-quick-win/page.tsx`), e aggiungi il copy in entrambi i file `messages/*.json`.

## 🌐 Deployment

Deploy consigliato su Vercel:

```bash
npm i -g vercel
vercel
```

In alternativa, tramite l'integrazione Vercel GitHub per deploy automatici.

## 📝 License

MIT License.

## 🤝 Contatti

contact@atavicolabs.com
