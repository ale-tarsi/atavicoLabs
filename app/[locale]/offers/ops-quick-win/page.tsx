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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offers.quickWin' });

  return {
    title: `${t('title')} — AtavicoLabs`,
    description: t('promise'),
    openGraph: {
      title: `${t('title')} — AtavicoLabs`,
      description: t('promise'),
      type: 'website',
      url: `/${locale}/offers/ops-quick-win`,
      images: [
        {
          url: '/og/ops-quick-win.png',
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
      images: ['/og/ops-quick-win.png', '/og/default.png'],
    },
    alternates: {
      canonical: `/${locale}/offers/ops-quick-win`,
      languages: {
        'it': '/it/offers/ops-quick-win',
        'en': '/en/offers/ops-quick-win',
      },
    },
  };
}

export default async function OpsQuickWinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offers.quickWin' });
  const tOffers = await getTranslations({ locale, namespace: 'offers' });
  
  const offer = getOffer('ops-quick-win');

  if (!offer) {
    return null;
  }

  const pricingIncludedCount = 3;

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

        {/* Timeline */}
        <OfferSection title={t('sections.timeline')}>
          <div className="space-y-6">
            {Array.from({ length: offer.stepsCount }).map((_, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-oliva/30 bg-oliva/10 text-oliva font-medium">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-sabbia mb-1">{t(`steps.${i}.day`)}</div>
                  <div className="text-[14px] text-sabbia/70 leading-[1.6]">{t(`steps.${i}.activity`)}</div>
                </div>
              </div>
            ))}
          </div>
        </OfferSection>

        {/* Pricing */}
        <OfferSection variant="muted" title={t('sections.pricing')}>
          <div className="bg-carbone border border-grigio/20 p-8 max-w-2xl">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-[36px] font-medium text-sabbia">{t('pricing.amount')}</span>
              <span className="text-[14px] text-grigio/60">{t('pricing.note')}</span>
            </div>
            <p className="text-[14px] text-sabbia/70 leading-[1.6] mb-6">{t('pricing.description')}</p>
            <div className="space-y-2 text-[13px]">
              {Array.from({ length: pricingIncludedCount }).map((_, i) => (
                <div key={i} className="flex items-start gap-2 text-sabbia/70">
                  <span className="text-oliva">•</span>
                  <span>{t(`pricing.included.${i}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </OfferSection>

        {/* How It Works (Steps) */}
        <OfferSection title={t('sections.howItWorks')}>
          <div className="space-y-8">
            {Array.from({ length: offer.stepsCount }).map((_, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-oliva/10 text-oliva font-medium text-[14px]">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-[17px] font-medium text-sabbia mb-2">{t(`process.${i}.title`)}</h3>
                  <p className="text-[14px] text-sabbia/70 leading-[1.6]">{t(`process.${i}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </OfferSection>

        {/* FAQ */}
        <OfferSection variant="muted" title="FAQ">
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
