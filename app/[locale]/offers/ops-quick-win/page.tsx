import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getOffer } from '@/app/constants/offers';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import OfferTemplate from '@/app/components/OfferTemplate';
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
  const offer = getOffer('ops-quick-win');

  if (!offer) {
    return null;
  }

  const heroBullets = Array.from({ length: 3 }).map((_, i) => t(`hero.bullets.${i}`));
  const outcomes = Array.from({ length: 3 }).map((_, i) => ({
    title: t(`outcomes.${i}.title`),
    description: t(`outcomes.${i}.description`),
    bullets: Array.from({ length: 3 })
      .map((__, j) => t(`outcomes.${i}.bullets.${j}`))
      .filter(Boolean),
  }));

  const includeItems = Array.from({ length: offer.deliverablesCount }).map((_, i) =>
    t(`deliverables.${i}`)
  );
  const boundaryItems = Array.from({ length: offer.boundariesCount }).map((_, i) =>
    t(`boundaries.${i}`)
  );

  const useCases = Array.from({ length: offer.examplesCount }).map((_, i) => {
    const tools = t(`useCases.${i}.tools`)
      .split(',')
      .map((tool) => tool.trim())
      .filter(Boolean);

    return {
      title: t(`useCases.${i}.title`),
      output: t(`useCases.${i}.output`),
      tools,
    };
  });

  const processSteps = Array.from({ length: offer.stepsCount }).map((_, i) => ({
    dayRange: t(`steps.${i}.day`),
    title: t(`process.${i}.title`),
    description: t(`process.${i}.description`),
  }));

  const faqItems = Array.from({ length: offer.faqsCount }).map((_, i) => ({
    question: t(`faqs.${i}.question`),
    answer: t(`faqs.${i}.answer`),
  }));

  return (
    <>
      <Navbar />
      <OfferTemplate
        hero={{
          eyebrow: t('hero.eyebrow'),
          title: t('title'),
          promise: t('promise'),
          bullets: heroBullets,
        }}
        summary={{
          priceRange: t('price'),
          priceNote: t('summary.priceNote'),
          timeline: t('timeline'),
          timelineLabel: t('meta.timeline'),
          priceLabel: t('meta.investment'),
          note: t('summary.note'),
          ctaText: t('cta'),
          ctaHref: getCalendlyUrl(locale as 'it' | 'en'),
        }}
        outcomes={{
          title: t('sections.outcomes'),
          items: outcomes,
        }}
        include={{
          title: t('sections.included'),
          items: includeItems,
        }}
        boundaries={{
          title: t('sections.boundaries'),
          items: boundaryItems,
        }}
        useCases={{
          title: t('sections.examples'),
          items: useCases,
        }}
        process={{
          title: t('sections.process'),
          steps: processSteps,
        }}
        faq={{
          title: 'FAQ',
          items: faqItems,
        }}
        finalCta={{
          title: t('finalCta.title'),
          bullets: Array.from({ length: 3 }).map((_, i) => t(`finalCta.bullets.${i}`)),
          note: t('finalCta.note'),
          ctaText: t('cta'),
          ctaHref: getCalendlyUrl(locale as 'it' | 'en'),
        }}
        locale={locale}
      />
      <Footer />
    </>
  );
}
