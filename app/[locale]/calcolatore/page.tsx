import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Calculator from '@/app/components/Calculator';

const BASE_URL = 'https://atavicolabs.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculator.meta' });
  const url = `${BASE_URL}/${locale}/calcolatore`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        it: `${BASE_URL}/it/calcolatore`,
        en: `${BASE_URL}/en/calcolatore`,
      },
    },
    openGraph: {
      title: `${t('title')} — AtavicoLabs`,
      description: t('description'),
      type: 'website',
      url,
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculator' });

  return (
    <>
      <Navbar />
      <main className="bg-carbone min-h-screen pt-28 lg:pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <header className="max-w-3xl mb-12">
            <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4">
              {t('eyebrow')}
            </div>
            <h1 className="font-display text-[36px] lg:text-[48px] font-medium text-sabbia leading-[1.1] mb-6">
              {t('title')}
            </h1>
            <p className="text-[17px] leading-[1.65] text-sabbia/70 font-light">{t('subtitle')}</p>
          </header>
          <Calculator />
        </div>
      </main>
      <Footer />
    </>
  );
}
