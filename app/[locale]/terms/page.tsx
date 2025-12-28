import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function TermsPage({ params }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-carbone text-sabbia">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <Link
          href={`/${params.locale}`}
          className="inline-flex items-center gap-2 text-oliva hover:text-sabbia mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {params.locale === 'it' ? 'Torna alla Home' : 'Back to Home'}
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-sabbia">
          {params.locale === 'it' ? 'Termini di Servizio' : 'Terms of Service'}
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-grigio mb-4">
            <strong>Ultimo aggiornamento: 23 dicembre 2025</strong>
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4 mt-8">
              {params.locale === 'it' ? '1. Accettazione dei Termini' : '1. Acceptance of Terms'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? "Utilizzando questo sito web, accetti di essere vincolato dai presenti Termini di Servizio. Se non accetti questi termini, ti preghiamo di non utilizzare il nostro sito."
                : "By using this website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '2. Servizi Offerti' : '2. Services Offered'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? "Atavico Labs offre servizi di sviluppo software, design UX/UI, consulenza tecnologica e soluzioni digitali personalizzate. I dettagli specifici di ogni progetto saranno definiti in accordi separati."
                : "Atavico Labs offers software development, UX/UI design, technology consulting, and custom digital solutions. Specific details of each project will be defined in separate agreements."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '3. Proprietà Intellettuale' : '3. Intellectual Property'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? "Tutti i contenuti presenti su questo sito, inclusi testi, grafiche, loghi, immagini e software, sono di proprietà di Atavico Labs o dei rispettivi proprietari e sono protetti dalle leggi sul copyright."
                : "All content on this site, including text, graphics, logos, images, and software, is the property of Atavico Labs or their respective owners and is protected by copyright laws."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '4. Uso Accettabile' : '4. Acceptable Use'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? "Ti impegni a utilizzare il nostro sito solo per scopi legali e in modo da non violare i diritti di terzi. È vietato utilizzare il sito per attività illecite, dannose o inappropriate."
                : "You agree to use our site only for lawful purposes and in a way that does not violate the rights of others. Using the site for illegal, harmful, or inappropriate activities is prohibited."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '5. Limitazione di Responsabilità' : '5. Limitation of Liability'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? "Atavico Labs non sarà responsabile per danni diretti, indiretti, incidentali o consequenziali derivanti dall'uso o dall'impossibilità di utilizzare il nostro sito o i nostri servizi."
                : "Atavico Labs will not be liable for direct, indirect, incidental, or consequential damages arising from the use or inability to use our site or services."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '6. Collegamenti a Siti di Terze Parti' : '6. Third-Party Links'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? "Il nostro sito può contenere collegamenti a siti web di terze parti. Non siamo responsabili per il contenuto o le pratiche di privacy di questi siti esterni."
                : "Our site may contain links to third-party websites. We are not responsible for the content or privacy practices of these external sites."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '7. Modifiche ai Termini' : '7. Changes to Terms'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? "Ci riserviamo il diritto di modificare questi Termini di Servizio in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina e entreranno in vigore immediatamente."
                : "We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page and take effect immediately."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '8. Legge Applicabile' : '8. Governing Law'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? "Questi termini sono regolati dalle leggi italiane. Qualsiasi controversia sarà sottoposta alla giurisdizione esclusiva dei tribunali italiani."
                : "These terms are governed by Italian law. Any disputes will be subject to the exclusive jurisdiction of Italian courts."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '9. Contatti' : '9. Contact'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? "Per domande sui Termini di Servizio, contattaci via email o attraverso il form di contatto sul sito."
                : "For questions about our Terms of Service, contact us via email or through the contact form on the site."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
