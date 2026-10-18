import { getTranslations } from 'next-intl/server';
import { locales } from '@/src/i18n/config';
import LoginForm from './LoginForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'toolsLogin' });
  return {
    title: t('title'),
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LoginPage() {
  return <LoginForm />;
}
