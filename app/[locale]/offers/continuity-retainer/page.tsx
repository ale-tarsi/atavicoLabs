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
import { Check } from 'lucide-react';
import ProcessSection from '@/app/components/ProcessSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offers.retainer' });

  return {
    title: `${t('title')} — AtavicoLabs`,
    description: t('promise'),
    openGraph: {
      title: `${t('title')} — AtavicoLabs`,
      description: t('promise'),
      type: 'website',
      url: `/${locale}/offers/continuity-retainer`,
      images: [
        {
          url: '/og/continuity-retainer.png',
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
      images: ['/og/continuity-retainer.png', '/og/default.png'],
    },
    alternates: {
      canonical: `/${locale}/offers/continuity-retainer`,
      languages: {
        'it': '/it/offers/continuity-retainer',
        'en': '/en/offers/continuity-retainer',
      },
    },
  };
}

export default async function ContinuityRetainerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offers.retainer' });
  const tOffers = await getTranslations({ locale, namespace: 'offers' });
  
  const offer = getOffer('continuity-retainer');

  if (!offer) {
    return null;
  }

  const plans = ['care', 'growth', 'opsPlus'] as const;

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

        {/* Plans */}
        <OfferSection title={t('sections.plans')}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={plan}
                className={`border p-8 transition-colors duration-300 ${
                  index === 1
                    ? 'border-oliva/40 bg-grafite/30'
                    : 'border-grigio/20 bg-carbone hover:border-oliva/20'
                }`}
              >
                {index === 1 && (
                  <div className="inline-block text-[10px] uppercase tracking-wider px-2 py-1 bg-oliva/20 text-oliva border border-oliva/30 mb-4">
                    {t('plans.recommended')}
                  </div>
                )}
                
                <h3 className="text-[22px] font-medium text-sabbia mb-2">
                  {t(`plans.${plan}.name`)}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-[32px] font-medium text-sabbia">
                    {t(`plans.${plan}.price`)}
                  </span>
                  <span className="text-[13px] text-grigio/60">{t('plans.perMonth')}</span>
                </div>

                <ul className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-sabbia/80">
                      <Check size={16} className="text-oliva flex-shrink-0 mt-0.5" />
                      <span>{t(`plans.${plan}.features.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </OfferSection>

        <ProcessSection variant="continuityRetainer" id="process-retainer" />

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
