# CTA Strategy — atavicoLabs

> Documento di riferimento per l'architettura CTA del sito. Ogni modifica alle call-to-action deve rispettare questa gerarchia.

---

## 1. Principi guida

**Chiarezza prima del volume.** Un solo CTA forte batte cinque CTA deboli. La ripetizione meccanica della stessa etichetta produce assuefazione e riduce la conversione.

**Escalation di commitment.** Le CTA devono escalare: il visitatore entra con un micro-impegno (esplorare), si avvicina con un impegno medio (approfondire), converte con l'azione finale (prenotare). Ogni CTA deve corrispondere alla fase in cui si trova l'utente.

**Differenziare primary e secondary.** Due pulsanti affiancati che portano allo stesso URL non sono due opzioni: sono rumore. Il secondary deve offrire sempre un'alternativa reale (email vs Calendly, approfondimento vs contatto).

**Etichette orientate al beneficio, non all'azione meccanica.** "Dettagli" descrive un click. "Scopri l'offerta" promette qualcosa. Preferire sempre la seconda forma.

---

## 2. Gerarchia CTA

### Tier 1 — Primary (alto commitment)
- **Stile**: pulsante `border border-sabbia/30` + `bg-oliva/5` on hover
- **Destinazione**: Calendly booking page
- **Etichetta tipo**: "Avvia l'audit gratuito", "Prenota audit gratuito", "Partiamo"
- **Uso**: Hero principale, sezione CTA dedicata, fondo offerta (finale)

### Tier 2 — Secondary (basso commitment)
- **Stile**: link testuale o pulsante minimal senza border
- **Destinazione**: `mailto:contact@atavicolabs.com`
- **Etichetta tipo**: "Scrivici", "Send a message"
- **Uso**: Affiancato al primary come alternativa email per chi non è pronto al call
- **Regola**: NON duplicare la destinazione del primary

### Tier 3 — Navigational (zero commitment)
- **Stile**: link testuale con o senza arrow
- **Destinazione**: ancora interna (`#portfolio`, `#starting-points`), pagina interna (`/offers/…`, `/projects/…`)
- **Etichetta tipo**: "Vedi i progetti", "Scopri l'offerta", "Come partiamo", "Vedi il caso studio"
- **Uso**: Hero secondario e terziario, card di offerta/portfolio

---

## 3. Inventario CTA per componente

| Componente | Tier | Etichetta IT | Etichetta EN | Destinazione |
|---|---|---|---|---|
| **Navbar** (desktop + mobile) | 1 | "Prenota audit 30 min" | "Book a 30-min audit" | Calendly |
| **Hero** — primary | 1 | "Avvia l'audit gratuito" | "Start your free audit" | Calendly |
| **Hero** — secondary | 3 | "Come partiamo" | "How we start" | `#starting-points` |
| **Hero** — tertiary text | 3 | "Vedi i progetti" | "View projects" | `#portfolio` |
| **StartingPoints** — card | 3 | "Scopri l'offerta" | "See the offer" | `/offers/{slug}` |
| **StartingPoints** — sezione | 1 | "Prenota audit gratuito" | "Book free audit" | Calendly |
| **Portfolio** — card | 3 | "Vedi il caso studio" | "View case study" | `/projects/{slug}` |
| **ServicesSection** (capabilities) | 3 | "Hai un processo da automatizzare?" | "Have a process to automate?" | `/contact` |
| **Testimonials** micro | 3 | "Parliamone" | "Let's talk" | `#contact` |
| **CTA section** — primary | 1 | "Prenota audit gratuito" | "Book free audit" | Calendly |
| **CTA section** — secondary | 2 | "Scrivici" | "Send a message" | `mailto:` |
| **OfferHero** (tutte e 3) | 1 | "Prenota audit 30 min" | "Book a 30-min audit" | Calendly |
| **OfferFinalCTA / OfferCTA** (fondo) | 1 | "Partiamo" | "Let's start" | Calendly |
| **Project case study** CTA | 1 | "Prenota audit 30 min" | "Book a 30-min audit" | `/contact` |
| **Blog** article | 3 | "Leggi l'articolo" | "Read article" | `href="#"` |

---

## 4. Regole di posizionamento

### Homepage
- **Navbar**: CTA standard → `navbar.requestAudit`
- **Hero**: primary differenziato dal navbar ("Avvia l'audit gratuito" non "Prenota audit 30 min")
- **StartingPoints**: ogni card ha un "Scopri l'offerta" navigazionale; la sezione ha un solo CTA Calendly a fine sezione
- **Portfolio**: "Vedi il caso studio" — azione navigazionale, non conversione
- **CTA section**: primary Calendly + secondary email — **mai due Calendly affiancati**

### Pagine offerta
- **OfferHero** (top): CTA standard → `offers.*.cta` = "Prenota audit 30 min"
- **OfferFinalCTA / OfferCTA** (bottom): CTA finale più decisivo → `offers.*.ctaFinal` = "Partiamo" (chi arriva in fondo è già convinto — nessun bisogno di ripetere l'audit pitch)

### Case study
- Mantenere "Prenota audit 30 min" — contestualmente corretto dopo aver visto prove concrete

---

## 5. Chiavi i18n — Mappa completa

```
cta.eyebrow           IT: "Iniziamo"                     EN: "Let's start"
cta.cta               IT: "Prenota audit gratuito"       EN: "Book free audit"
cta.emailLabel        IT: "Scrivici"                     EN: "Send a message"
cta.status            IT: "Disponibili per nuovi progetti"   EN: "Available for new projects"
cta.workModeLabel     IT: "Modalità lavoro"              EN: "Work mode"
cta.workMode          IT: "Remote-first • On-site su richiesta"   EN: "Remote-first • On-site on request"
cta.responseTimeLabel IT: "Tempo di risposta"            EN: "Response time"
cta.responseTime      IT: "Entro 24 ore"                 EN: "Within 24 hours"

hero.ctaPrimary       IT: "Avvia l'audit gratuito"       EN: "Start your free audit"

home.startingPoints.learnMore      IT: "Scopri l'offerta"   EN: "See the offer"
home.startingPoints.requestAudit   IT: "Prenota audit gratuito"   EN: "Book free audit"

portfolio.labels.caseStudy   IT: "Vedi il caso studio"   EN: "View case study"

capabilities.sectionCta   IT: "Hai un processo da automatizzare?"   EN: "Have a process to automate?"

offers.quickWin.ctaFinal     IT: "Partiamo"   EN: "Let's start"
offers.retainer.ctaFinal     IT: "Partiamo"   EN: "Let's start"
offers.productBuild.ctaFinal IT: "Partiamo"   EN: "Let's start"
```

---

## 6. Problemi risolti

| # | Gravità | Problema | Soluzione adottata |
|---|---|---|---|
| 1 | 🔴 Critico | `CTA.tsx` — entrambi i pulsanti portavano allo stesso URL Calendly | Secondary → `mailto:` link con label "Scrivici" |
| 2 | 🔴 Critico | "Prenota audit 30 min" ripetuto 6+ volte nella homepage | Etichette differenziate per contesto + hero con nuovo label |
| 3 | 🟠 Alto | Hero primary identico al navbar — nessuna distinzione visiva | Hero → "Avvia l'audit gratuito" (aggiunge beneficio "gratuito") |
| 4 | 🟠 Alto | "Dettagli" — etichetta troppo generica e debole | → "Scopri l'offerta" |
| 5 | 🟠 Alto | Offerte: stesso `t('cta')` usato in hero E in fondo pagina | Bottom CTA → `t('ctaFinal')` = "Partiamo" |
| 6 | 🟡 Medio | `capabilities.sectionCta` troppo lungo come link | Accorciato a domanda retorica |
| 7 | 🟡 Medio | "Leggi caso studio" — implica un article blog | → "Vedi il caso studio" |
| 8 | 🟡 Medio | Stringhe hardcoded in `CTA.tsx` (disponibilità, modalità lavoro) | Estratte in chiavi i18n |

---

## 7. Cosa NON cambiare

- `navbar.requestAudit` = "Prenota audit 30 min" — il navbar CTA è il touchpoint persistente standard
- `hero.ctaTertiary` = "Come partiamo" — buon label per CTA navigazionale secondario
- `hero.ctaSecondary` = "Vedi i progetti" — corretto per link testuale terziario
- `testimonials.microCtaLink` = "Parliamone" — tono casual appropriato nella sezione social proof
- `projects.*.cta.button` = "Prenota audit 30 min" — appropriato come next step dopo un case study
- `offers.*.cta` (hero) = "Prenota audit 30 min" — mantiene coerenza con il navbar nella posizione in-testa
- `blog.cta` = "Leggi l'articolo" — corretto per articoli blog
