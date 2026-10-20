# Piano — sito asciutto e professionale

**Obiettivo**: acquisire clienti di consulenza. Poche pagine, tutto dimostrabile.
**Regole**: niente placeholder, niente metriche non misurate, niente claim non verificabili.

## Struttura finale
- Home: Hero · Servizi (offerte) · Case study (4) · Come lavoriamo · Contatto
- Case study reali: Hostid Web, NILM per la domotica (anonimo, vincoli contrattuali), Hubwater, Codfood
- /contact, /privacy, /terms
- /tools/* resta privato (noindex)

## Da rimuovere
- 14 pagine progetto concept (FlowCanvas, HelixOps, Loopin, ...) + `lytera/page_old.tsx`
- ProofsSection con widget "System Status" (Tests 127/127, Perf 98/100)
- ServicesSection (duplica le offerte), sezioni Galleria con placeholder
- Blog / Testimonials / Newsletter (flag già off): eliminare il codice morto
- Metriche non verificate (es. HelixOps -45% / +60% / -35%)
- Verificare: "Dal 2017", hero.mp4, CustomCursor, PointfieldDrift

## Fasi
0. Checkpoint git della working tree (48 file non committati)
1. Pulizia (punti sopra)
2. Case study reali: un template unico guidato da dati; problema → soluzione → risultato; diagramma del flusso al posto di screenshot finti; screenshot veri solo se disponibili
3. Contatti: form → Google Sheet (Apps Script web app), honeypot, rate limit; analytics (Vercel Analytics)
4. SEO tecnica: metadata per pagina, OG image (`@vercel/og`), favicon/apple-touch, sitemap ridotta, canonical/hreflang
5. Copy IT/EN: H1 "Prodotti digitali solidi, progettati con cura."; revisione di coerenza
6. Deploy: verificare branch di produzione su Vercel e allinearla

## Stato
- [x] H1 hero aggiornato (IT/EN)
- [x] Fase 0: checkpoint git (4b966e6)
- [x] Fase 1 (parziale): rimossi widget System Status, ProofsSection, Services, Blog, Testimonials, Newsletter, PointfieldDrift, page_old; `tsc` pulito
- [x] Fase 2: 4 case study reali (`app/constants/caseStudies.ts`, `FlowDiagram`, route `/projects/[slug]`), Portfolio snello, sitemap aggiornata, rimosse 14 pagine concept, `ProjectLayout`, `CaseStudy/`, `constants/projects.ts`; `tsc` pulito
- [ ] Da rivedere: fatti dei 4 case study (Hubwater: ok a citare (confermato). Iooota: verificare la clausola dell'accordo di uscita Codfood è scarno)
- [ ] Pulizia: chiavi i18n orfane (`projects.*`, `portfolio.items`), flag in `features.ts`, verifiche "Dal 2017", hero.mp4, CustomCursor
- [x] Fase 3 (codice): form → `/api/contact` → Apps Script → foglio "Lead atavicoLabs" (Drive); honeypot, rate limit, sanitizzazione formule. `tsc` pulito
- [ ] Fase 3 (da fare tu): deploy Apps Script (`scripts/leads-apps-script.gs`), env `LEAD_WEBHOOK_URL` + `LEAD_WEBHOOK_SECRET` in `.env.local` e Vercel
- [ ] Fase 3b: analytics (Vercel Analytics)
- [x] Visual: 5 illustrazioni SVG (`public/illustrations/`), hero alleggerita con diagramma, Portfolio con grafiche, `HomeProcess` a 4 step con icone, About a 3 colonne con icone, CTA senza statistiche; rimossi "Numeri reali" (15+ prodotti, 99.9% uptime) e "Dal 2017" dai componenti
- [ ] Pulizia messaggi orfani: `proofPoints`, `hero.since`, `projects.*`, `portfolio.items`, `about`/offerte con claim non verificabili
- [ ] Prossimo visual: card offerte (icone, meno testo), pagine offerta, screenshot reali Hostid Web
- [ ] Fasi 4-6

## Aggiornamento offerte (senza prezzi)
- [x] Nessun prezzo né "7 giorni" sul sito (tool /audit a 14 € escluso).
- [x] Home: 2 card (Analisi del flusso, Automazione su misura) + riga supporto + CTA call 30 min (`app/components/Offerings.tsx`, testi in `home.startingPoints`).
- [x] Rimosse le 3 pagine /offers/* e i componenti Offer*; redirect permanente `/:locale/offers/*` → home#starting-points.
- [x] Sitemap, navbar, footer aggiornati; sub-line hero sulle PMI.
- [ ] Prezzi: da introdurre dopo il primo cliente reale (Bottega).
- [ ] "Prima / Dopo" nei case study.
