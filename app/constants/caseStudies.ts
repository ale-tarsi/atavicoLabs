/**
 * Case study reali. Solo fatti verificabili: niente metriche non misurate.
 * Lingue: it / en. Il diagramma "flow" è l'unico elemento visivo.
 */

export type Locale = 'it' | 'en';

export interface CaseStudyContent {
  title: string;
  label: string;
  summary: string;
  role: string;
  status: string;
  challenge: string;
  solution: string;
  flow: string[];
  outcome: string[];
}

export interface CaseStudy {
  slug: string;
  stack: string[];
  content: Record<Locale, CaseStudyContent>;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'hostid-web',
    stack: ['Gemini API', 'XML', 'Alloggiati Web', 'Ross Mille'],
    content: {
      it: {
        title: 'Hostid Web',
        label: 'Prodotto · Hospitality',
        summary:
          'Pre-check-in online per strutture ricettive, con invio automatico dei dati ad Alloggiati Web e Ross Mille.',
        role: 'Prodotto, design e sviluppo',
        status: 'Online, in uso',
        challenge:
          'Registrare gli ospiti e comunicare le presenze è un adempimento obbligatorio e ripetitivo: raccolta dei documenti, trascrizione dei dati, invio ai portali. Per una piccola struttura è tempo sottratto all’accoglienza e una fonte di errori.',
        solution:
          'L’host crea un soggiorno e invia un link di pre-check-in. L’ospite carica i documenti, letti automaticamente con l’API Gemini. I dati verificati vengono inviati ad Alloggiati Web e a Ross Mille. Per la Regione Marche il tracciato XML è stato implementato a partire dalle specifiche ufficiali ottenute dall’ente regionale.',
        flow: [
          'Link di pre-check-in',
          'Caricamento documenti',
          'Lettura con AI',
          'Verifica dei dati',
          'Invio ad Alloggiati Web e Ross Mille',
        ],
        outcome: [
          'Online e in uso reale in due strutture ricettive.',
          'Dati inviati ai portali senza trascrizione manuale.',
          'Tracciato regionale implementato dalle specifiche ufficiali dell’ente.',
        ],
      },
      en: {
        title: 'Hostid Web',
        label: 'Product · Hospitality',
        summary:
          'Online pre-check-in for accommodation providers, with automatic submission of guest data to Alloggiati Web and Ross Mille.',
        role: 'Product, design and development',
        status: 'Live, in use',
        challenge:
          'Registering guests and reporting arrivals is a mandatory, repetitive task: collecting documents, retyping data, submitting to the portals. For a small property it takes time away from hosting and introduces errors.',
        solution:
          'The host creates a stay and sends a pre-check-in link. The guest uploads their documents, which are read automatically with the Gemini API. Verified data is submitted to Alloggiati Web and Ross Mille. For the Marche region, the XML format was implemented from the official specifications obtained from the regional body.',
        flow: [
          'Pre-check-in link',
          'Document upload',
          'AI reading',
          'Data verification',
          'Submission to Alloggiati Web and Ross Mille',
        ],
        outcome: [
          'Live and in real use at two accommodation properties.',
          'Data submitted to the portals without manual retyping.',
          'Regional format implemented from the body’s official specifications.',
        ],
      },
    },
  },
  {
    slug: 'nilm-domotica',
    stack: ['NILM', 'IoT', 'Domotica'],
    content: {
      it: {
        title: 'NILM per la domotica',
        label: 'Cliente · IoT ed energia',
        summary:
          'Software con integrazione NILM (Non-Intrusive Load Monitoring) su un parco installato di impianti domotici residenziali.',
        role: 'Sviluppo software',
        status: 'Collaborazione conclusa',
        challenge:
          'Portare il monitoraggio non intrusivo dei carichi su impianti domotici reali, già installati presso utenze residenziali.',
        solution:
          'Sviluppo del software di integrazione NILM all’interno della piattaforma di un’azienda di domotica.',
        flow: [
          'Consumo aggregato',
          'Algoritmo NILM',
          'Integrazione nel software',
          'Impianti residenziali',
        ],
        outcome: [
          'Software di integrazione NILM in produzione su un parco installato di impianti residenziali.',
        ],
      },
      en: {
        title: 'NILM for home automation',
        label: 'Client · IoT and energy',
        summary:
          'Software integrating NILM (Non-Intrusive Load Monitoring) across an installed base of residential home-automation systems.',
        role: 'Software development',
        status: 'Engagement completed',
        challenge:
          'Bringing non-intrusive load monitoring to real home-automation systems already installed in residential homes.',
        solution:
          'Developed the NILM integration software within a home-automation company’s platform.',
        flow: [
          'Aggregate consumption',
          'NILM algorithm',
          'Software integration',
          'Residential systems',
        ],
        outcome: [
          'NILM integration software in production across an installed base of residential systems.',
        ],
      },
    },
  },
  {
    slug: 'hubwater',
    stack: ['Laravel 11', 'Filament', 'MariaDB', 'MongoDB', 'Redis', 'AWS', 'Puppeteer'],
    content: {
      it: {
        title: 'Hubwater — Backoffice e report',
        label: 'Cliente · Backoffice e IoT',
        summary:
          'Backoffice Laravel per la gestione di erogatori d’acqua IoT e la reportistica di sostenibilità.',
        role: 'Sviluppo full-stack e infrastruttura',
        status: 'Collaborazione attiva',
        challenge:
          'Il sistema di generazione dei report, ereditato da un team precedente, era fermo da mesi: dati a zero, code di lavoro instabili e nessun ambiente di staging per testare le correzioni.',
        solution:
          'Ricostruzione della generazione dei report: nuovi template PDF multi-pagina con suddivisione mensile dinamica, selezione flessibile del periodo in Filament, correzione di query e aggregazioni, risoluzione dei problemi di code. Creato un ambiente di staging su AWS EC2.',
        flow: [
          'Dati degli erogatori',
          'Aggregazione per periodo',
          'Template PDF',
          'Invio automatico al cliente',
        ],
        outcome: [
          'Generazione dei report ripristinata dopo mesi di inattività.',
          'Template multi-pagina con selezione libera del periodo.',
          'Ambiente di staging per testare prima del rilascio.',
          'Firma cliente e invio automatico del report via email.',
        ],
      },
      en: {
        title: 'Hubwater — Backoffice and reporting',
        label: 'Client · Backoffice and IoT',
        summary:
          'Laravel backoffice for managing IoT water dispensers and producing sustainability reports.',
        role: 'Full-stack development and infrastructure',
        status: 'Active engagement',
        challenge:
          'The report generation system, inherited from a previous team, had been down for months: zero-value data, unstable job queues and no staging environment to test fixes.',
        solution:
          'Rebuilt report generation: new multi-page PDF templates with dynamic monthly chunking, flexible period selection in Filament, fixed queries and aggregations, resolved queue issues. Set up a staging environment on AWS EC2.',
        flow: [
          'Dispenser data',
          'Aggregation by period',
          'PDF template',
          'Automatic delivery to the client',
        ],
        outcome: [
          'Report generation restored after months of downtime.',
          'Multi-page templates with free period selection.',
          'Staging environment to test before release.',
          'Client signature and automatic report delivery by email.',
        ],
      },
    },
  },
  {
    slug: 'codfood',
    stack: ['Next.js'],
    content: {
      it: {
        title: 'Codfood.it — Sito B2B',
        label: 'Cliente · Web',
        summary:
          'Sito aziendale in Next.js per un grossista di baccalà, con un’estensione e-commerce B2B in fase di analisi.',
        role: 'Sviluppo web',
        status: 'Online',
        challenge:
          'Presentare online un grossista B2B con un sito veloce e curato, in grado di evolvere verso la vendita online.',
        solution:
          'Sito sviluppato in Next.js. In corso l’analisi dei requisiti per un’estensione e-commerce B2B.',
        flow: ['Catalogo e contenuti', 'Sito Next.js', 'Richiesta del cliente', 'E-commerce B2B (in analisi)'],
        outcome: [
          'Sito B2B online sviluppato in Next.js.',
          'Estensione e-commerce B2B in fase di analisi.',
        ],
      },
      en: {
        title: 'Codfood.it — B2B website',
        label: 'Client · Web',
        summary:
          'Next.js company website for a cod wholesaler, with a B2B e-commerce extension under evaluation.',
        role: 'Web development',
        status: 'Live',
        challenge:
          'Presenting a B2B wholesaler online with a fast, polished website that can grow into online sales.',
        solution:
          'Website built with Next.js. Requirements for a B2B e-commerce extension are being scoped.',
        flow: ['Catalogue and content', 'Next.js website', 'Customer enquiry', 'B2B e-commerce (scoping)'],
        outcome: [
          'B2B website live, built with Next.js.',
          'B2B e-commerce extension under evaluation.',
        ],
      },
    },
  },
];

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((c) => c.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
