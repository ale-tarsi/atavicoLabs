import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === 'it' ? 'Termini di servizio' : 'Terms of service',
    description:
      locale === 'it'
        ? 'Termini e condizioni di utilizzo del sito e dei servizi AtavicoLabs.'
        : 'Terms and conditions for using the AtavicoLabs website and services.',
    robots: { index: true, follow: false },
    alternates: {
      canonical: `https://atavicolabs.com/${locale}/terms`,
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIt = locale === 'it';

  return (
    <>
      <Navbar />
      <main className="bg-carbone min-h-screen pt-20">
        <section className="py-24 lg:py-32 px-6 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4">
              {isIt ? 'Legale' : 'Legal'}
            </p>
            <h1 className="font-display text-[36px] lg:text-[48px] font-medium text-sabbia mb-10 leading-[1.1]">
              {isIt ? 'Termini di servizio' : 'Terms of service'}
            </h1>

            <div className="space-y-8 text-sabbia/70 text-[15px] leading-[1.75]">

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Ambito di applicazione' : 'Scope'}
                </h2>
                <p>
                  {isIt
                    ? 'I presenti termini regolano l\'utilizzo del sito atavicolabs.com e l\'accesso ai servizi offerti da AtavicoLabs. Utilizzando il sito, l\'utente accetta i presenti termini.'
                    : 'These terms govern the use of atavicolabs.com and access to services offered by AtavicoLabs. By using the site, you accept these terms.'}
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Servizi' : 'Services'}
                </h2>
                <p>
                  {isIt
                    ? 'AtavicoLabs offre servizi di automazione operativa, sviluppo di prodotti digitali e supporto tecnico continuativo per PMI e team operativi. I dettagli specifici di ogni progetto — inclusi deliverable, tempi e compensi — sono definiti nel contratto di servizio firmato dalle parti prima dell\'avvio dei lavori. Le informazioni presenti sul sito hanno carattere indicativo e non costituiscono offerta vincolante.'
                    : 'AtavicoLabs provides ops automation services, digital product development and ongoing technical support for SMEs and operational teams. The specific details of each project — including deliverables, timelines and fees — are defined in the service agreement signed by the parties prior to work commencement. Information on this site is indicative and does not constitute a binding offer.'}
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Proprietà intellettuale' : 'Intellectual property'}
                </h2>
                <p>
                  {isIt
                    ? 'Tutti i contenuti del sito (testi, grafica, codice, logotipi) sono di proprietà di AtavicoLabs e sono protetti dalla normativa sul diritto d\'autore. È vietata la riproduzione senza autorizzazione scritta.'
                    : 'All site content (text, graphics, code, logos) is the property of AtavicoLabs and is protected by copyright law. Reproduction without written permission is prohibited.'}
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Limitazione di responsabilità' : 'Limitation of liability'}
                </h2>
                <p>
                  {isIt
                    ? 'Le informazioni presenti sul sito sono fornite in buona fede e senza garanzia di completezza o accuratezza. AtavicoLabs non è responsabile per danni derivanti dall\'utilizzo del sito o dall\'affidamento sulle informazioni ivi contenute.'
                    : 'Information on this site is provided in good faith and without warranty of completeness or accuracy. AtavicoLabs is not liable for damages arising from use of the site or reliance on information contained therein.'}
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Legge applicabile e foro competente' : 'Governing law and jurisdiction'}
                </h2>
                <p>
                  {isIt
                    ? 'I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il Tribunale di Milano.'
                    : 'These terms are governed by Italian law. The Court of Milan has jurisdiction over any dispute.'}
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Contatti' : 'Contact'}
                </h2>
                <p>
                  {isIt ? 'Per qualsiasi domanda: ' : 'For any question: '}
                  <a href="mailto:contact@atavicolabs.com" className="text-oliva hover:underline">
                    contact@atavicolabs.com
                  </a>
                </p>
              </section>

              <p className="text-[13px] text-grigio/50">
                {isIt ? 'Ultimo aggiornamento: marzo 2026' : 'Last updated: March 2026'}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-grigio/20">
              <Link
                href={`/${locale}`}
                className="text-[13px] text-sabbia/60 hover:text-oliva transition-colors"
              >
                ← {isIt ? 'Torna alla home' : 'Back to home'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
