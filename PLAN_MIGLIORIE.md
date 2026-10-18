# Piano — sito asciutto e professionale

**Obiettivo**: acquisire clienti di consulenza. Poche pagine, tutto dimostrabile.
**Regole**: niente placeholder, niente metriche non misurate, niente claim non verificabili.

## Struttura finale
- Home: Hero · Servizi (offerte) · Case study (4) · Come lavoriamo · Contatto
- Case study reali: Hostid Web, Iooota (NILM), Hubwater, Codfood
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
- [ ] Fasi 0-6
