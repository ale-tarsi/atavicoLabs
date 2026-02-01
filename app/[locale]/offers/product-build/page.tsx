import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getOffer } from '@/app/constants/offers';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import OfferHero from '@/app/components/OfferHero';
import OfferSection from '@/app/components/OfferSection';
import OfferBullets from '@/app/components/OfferBullets';
import OfferFAQ from '@/app/components/OfferFAQ';
import OfferCTA from '@/app/components/OfferCTA';
import { getCalendlyUrl } from '@/app/constants/links';
import { Info } from 'lucide-react';
import ProcessSection from '@/app/components/ProcessSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offers.product' });

  return {
    title: `${t('title')} — AtavicoLabs`,
    description: t('promise'),
    openGraph: {
      title: `${t('title')} — AtavicoLabs`,
      description: t('promise'),
      type: 'website',
      url: `/${locale}/offers/product-build`,
      images: [
        {
          url: '/og/product-build.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
        {
          url: '/og/default.png',
          width: 1200,
          height: 630,
          alt: 'AtavicoLabs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} — AtavicoLabs`,
      description: t('promise'),
      images: ['/og/product-build.png', '/og/default.png'],
    },
    alternates: {
      canonical: `/${locale}/offers/product-build`,
      languages: {
        'it': '/it/offers/product-build',
        'en': '/en/offers/product-build',
      },
    },
  };
}

export default async function ProductBuildPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offers.product' });
  const tOffers = await getTranslations({ locale, namespace: 'offers' });
  
  const offer = getOffer('product-build');

  if (!offer) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="bg-carbone min-h-screen pt-20">
        {/* Hero */}
        <OfferHero
          badge={offer.badge ? tOffers(`badges.${offer.badge}`) : undefined}
          eyebrow={t('hero.eyebrow')}
          title={t('title')}
          promise={t('promise')}
          timeline={t('timeline')}
          priceRange={t('price')}
          ctaText={t('cta')}
          ctaHref={getCalendlyUrl(locale as 'it' | 'en')}
          locale={locale}
          timelineLabel={t('meta.timeline')}
          priceLabel={t('meta.investment')}
        />

        {/* Mobile Note */}
        <section className="py-6 px-6 lg:px-16 bg-oliva/5 border-y border-oliva/20">
          <div className="max-w-4xl mx-auto flex items-start gap-3">
            <Info size={18} className="text-oliva flex-shrink-0 mt-0.5" />
            <p className="text-[14px] text-sabbia/80 leading-[1.6]">
              {t('mobileNote')}
            </p>
          </div>
        </section>

        {/* Examples */}
        <OfferSection title={t('sections.examples')}>
          <OfferBullets
            type="check"
            items={Array.from({ length: offer.examplesCount }).map((_, i) => t(`examples.${i}`))}
          />
        </OfferSection>

        {/* Included & Boundaries */}
        <OfferSection variant="muted" title={`${t('sections.included')} & ${t('sections.boundaries')}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <OfferBullets
                type="check"
                title={t('sections.included')}
                items={Array.from({ length: offer.deliverablesCount }).map((_, i) => t(`deliverables.${i}`))}
              />
            </div>
            <div>
              <OfferBullets
                type="cross"
                title={t('sections.boundaries')}
                items={Array.from({ length: offer.boundariesCount }).map((_, i) => t(`boundaries.${i}`))}
              />
            </div>
          </div>
        </OfferSection>

        <ProcessSection variant="productBuild" id="process-product" />

        {/* FAQ */}
        <OfferSection title="FAQ">
          <OfferFAQ
            items={Array.from({ length: offer.faqsCount }).map((_, i) => ({
              question: t(`faqs.${i}.question`),
              answer: t(`faqs.${i}.answer`),
            }))}
          />
        </OfferSection>

        {/* CTA Final */}
        <OfferCTA
          title={t('sections.readyToStart')}
          description={t('sections.readyDescription')}
          buttonText={t('cta')}
          buttonHref={getCalendlyUrl(locale as 'it' | 'en')}
          locale={locale}
        />
      </main>
      <Footer />
    </>
  );
}
