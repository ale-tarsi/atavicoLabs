import { getTranslations } from 'next-intl/server';
import ContactForm from './ContactForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://atavicolabs.com/${locale}/contact`,
      languages: {
        'it': 'https://atavicolabs.com/it/contact',
        'en': 'https://atavicolabs.com/en/contact',
      },
    },
    openGraph: {
      title: `${t('title')} — AtavicoLabs`,
      description: t('description'),
      type: 'website',
      url: `https://atavicolabs.com/${locale}/contact`,
    },
  };
}

export default function ContactPage() {
  return <ContactForm />;
}
