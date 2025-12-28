import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function PrivacyPage({ params }: { params: { locale: string } }) {
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
          {params.locale === 'it' ? 'Privacy Policy' : 'Privacy Policy'}
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-grigio mb-4">
            <strong>Ultimo aggiornamento: 23 dicembre 2025</strong>
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4 mt-8">
              {params.locale === 'it' ? '1. Informazioni Raccolte' : '1. Information We Collect'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? 'Raccogliamo informazioni che ci fornisci direttamente, come nome, email e messaggio quando ci contatti attraverso il form sul sito.'
                : 'We collect information you provide directly to us, such as name, email, and message when you contact us through the website form.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '2. Uso delle Informazioni' : '2. Use of Information'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? 'Utilizziamo le informazioni raccolte per rispondere alle tue richieste, migliorare i nostri servizi e comunicare con te riguardo progetti e servizi.'
                : 'We use the information collected to respond to your requests, improve our services, and communicate with you about projects and services.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '3. Condivisione delle Informazioni' : '3. Information Sharing'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? 'Non vendiamo né condividiamo le tue informazioni personali con terze parti per scopi di marketing. Possiamo condividere informazioni solo quando necessario per fornire i nostri servizi o se richiesto dalla legge.'
                : 'We do not sell or share your personal information with third parties for marketing purposes. We may share information only when necessary to provide our services or if required by law.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '4. Cookie e Tecnologie di Tracciamento' : '4. Cookies and Tracking Technologies'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? 'Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza sul nostro sito, analizzare il traffico e personalizzare i contenuti. Puoi gestire le preferenze sui cookie attraverso le impostazioni del tuo browser.'
                : 'We use cookies and similar technologies to improve your experience on our site, analyze traffic, and personalize content. You can manage cookie preferences through your browser settings.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '5. Sicurezza' : '5. Security'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? 'Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali da accessi non autorizzati, alterazioni o divulgazioni.'
                : 'We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '6. I Tuoi Diritti' : '6. Your Rights'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? 'Hai il diritto di accedere, correggere o eliminare le tue informazioni personali. Puoi anche opporti al trattamento dei tuoi dati o richiederne la portabilità. Per esercitare questi diritti, contattaci.'
                : 'You have the right to access, correct, or delete your personal information. You can also object to the processing of your data or request its portability. To exercise these rights, contact us.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '7. Modifiche alla Privacy Policy' : '7. Changes to Privacy Policy'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? 'Potremmo aggiornare questa Privacy Policy periodicamente. Ti notificheremo eventuali modifiche sostanziali pubblicando la nuova versione sul nostro sito.'
                : 'We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new version on our site.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sabbia mb-4">
              {params.locale === 'it' ? '8. Contatti' : '8. Contact'}
            </h2>
            <p className="text-grigio leading-relaxed mb-4">
              {params.locale === 'it'
                ? 'Per domande sulla nostra Privacy Policy, contattaci via email o attraverso il form di contatto sul sito.'
                : 'For questions about our Privacy Policy, contact us via email or through the contact form on the site.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
