import { getTranslations } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === 'it' ? 'Privacy Policy' : 'Privacy Policy',
    description:
      locale === 'it'
        ? 'Informativa sul trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679).'
        : 'Privacy notice on the processing of personal data pursuant to GDPR (EU Reg. 2016/679).',
    robots: { index: true, follow: false },
    alternates: {
      canonical: `https://atavicolabs.com/${locale}/privacy`,
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIt = locale === 'it';

  return (
    <>
      <Navbar />
      <main className="bg-carbone min-h-screen pt-20">
        <section className="py-24 lg:py-32 px-6 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4">
              {isIt ? 'Informativa' : 'Legal'}
            </p>
            <h1 className="font-display text-[36px] lg:text-[48px] font-medium text-sabbia mb-10 leading-[1.1]">
              Privacy Policy
            </h1>

            <div className="prose prose-invert max-w-none space-y-8 text-sabbia/70 text-[15px] leading-[1.75]">

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Titolare del trattamento' : 'Data Controller'}
                </h2>
                <p>
                  {isIt
                    ? 'AtavicoLabs — digital product studio. Per qualsiasi questione relativa ai dati personali, scrivere a:'
                    : 'AtavicoLabs — digital product studio. For any question related to personal data, write to:'}
                  {' '}
                  <a href="mailto:contact@atavicolabs.com" className="text-oliva hover:underline">
                    contact@atavicolabs.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Dati raccolti' : 'Data collected'}
                </h2>
                <p>
                  {isIt
                    ? 'Raccogliamo esclusivamente i dati che l\'utente inserisce volontariamente nel form di contatto: nome, indirizzo email, nome azienda (opzionale), descrizione del processo da automatizzare, strumenti in uso. Nessun dato viene raccolto automaticamente tramite sistemi di profilazione o tracciamento comportamentale.'
                    : 'We only collect data voluntarily submitted through the contact form: name, email address, company name (optional), description of the process to automate, tools in use. No data is collected automatically via profiling or behavioural tracking systems.'}
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Finalità e base giuridica' : 'Purpose and legal basis'}
                </h2>
                <p>
                  {isIt
                    ? 'I dati raccolti sono utilizzati esclusivamente per rispondere alle richieste di contatto e per erogare i servizi richiesti (audit gratuito, proposta commerciale). La base giuridica è il consenso dell\'interessato (Art. 6(1)(a) GDPR) prestato al momento dell\'invio del form.'
                    : 'Collected data is used solely to respond to contact requests and deliver the requested services (free audit, commercial proposal). The legal basis is the data subject\'s consent (Art. 6(1)(a) GDPR) given at the time of form submission.'}
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Modalità di trattamento e conservazione' : 'Processing and retention'}
                </h2>
                <p>
                  {isIt
                    ? 'Le comunicazioni avvengono via email. I dati non vengono conservati su server propri al di fuori del normale archivio email. Non utilizziamo database di marketing di terze parti. I dati vengono conservati per il tempo strettamente necessario alla gestione della richiesta e, in caso di rapporto contrattuale, per gli obblighi di legge applicabili.'
                    : 'Communications occur via email. Data is not stored on proprietary servers beyond the normal email archive. We do not use third-party marketing databases. Data is retained for the time strictly necessary to manage the request and, where a contractual relationship exists, as required by applicable law.'}
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">Cookie</h2>
                <p>
                  {isIt
                    ? 'Il sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento delle pagine. Non sono presenti cookie di profilazione o di tracciamento di terze parti.'
                    : 'This site uses only technical cookies necessary for the correct functioning of the pages. No profiling or third-party tracking cookies are present.'}
                </p>
              </section>

              <section>
                <h2 className="text-sabbia text-[20px] font-medium mb-3">
                  {isIt ? 'Diritti dell\'interessato' : 'Data subject rights'}
                </h2>
                <p>
                  {isIt
                    ? 'In qualità di interessato, hai il diritto di: accedere ai tuoi dati, ottenerne la rettifica o la cancellazione, richiedere la limitazione del trattamento, opporti al trattamento, richiedere la portabilità dei dati. Per esercitare questi diritti, scrivi a contact@atavicolabs.com. Hai inoltre il diritto di proporre reclamo all\'Autorità Garante per la Protezione dei Dati Personali (www.garanteprivacy.it).'
                    : 'As a data subject, you have the right to: access your data, obtain its rectification or erasure, request restriction of processing, object to processing, request data portability. To exercise these rights, write to contact@atavicolabs.com. You also have the right to lodge a complaint with the relevant supervisory authority.'}
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
