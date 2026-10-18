import { getTranslations } from 'next-intl/server';
import { locales } from '@/src/i18n/config';
import CrmBoard from './CrmBoard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'crm.meta' });

  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function CrmPage() {
  return <CrmBoard />;
}
