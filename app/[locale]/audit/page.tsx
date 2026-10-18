import { getTranslations } from 'next-intl/server';
import AuditForm from './AuditForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'audit.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://atavicolabs.com/${locale}/audit`,
      languages: {
        it: 'https://atavicolabs.com/it/audit',
        en: 'https://atavicolabs.com/en/audit',
      },
    },
  };
}

export default function AuditPage() {
  return <AuditForm />;
}
