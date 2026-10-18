'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import OfferCard from './OfferCard';
import { OFFERS } from '../constants/offers';

export default function StartingPoints() {
  const locale = useLocale() as string;
  const tHome = useTranslations('home');
  const tOffers = useTranslations('offers');

  const [selectedId, setSelectedId] = useState<string>(OFFERS[0].id);

  const getHighlights = (baseKey: string) => {
    const raw = tOffers.raw(`${baseKey}.highlights`);
    return Array.isArray(raw) ? (raw as string[]).slice(0, 3) : [];
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch" role="radiogroup" aria-label={tHome('startingPoints.title')}>
      {OFFERS.map((offer, index) => {
        const isSelected = offer.id === selectedId;
        const baseKey = offer.promiseKey.split('.')[0];

        return (
          <OfferCard
            key={offer.id}
            slug={offer.slug}
            title={tOffers(offer.titleKey)}
            tagline={tOffers(offer.taglineKey)}
            promise={tOffers(offer.promiseKey)}
            timeline={tOffers(offer.timelineKey)}
            priceRange={tOffers(offer.priceKey)}
            badge={offer.badgeKey ? tOffers(offer.badgeKey) : undefined}
            timelineLabel={tOffers('hub.meta.timeline')}
            priceLabel={tOffers('hub.meta.from')}
            locale={locale}
            featured={false}
            delay={index * 100}
            detailsLabel={tHome('startingPoints.learnMore')}
            selectable
            isSelected={isSelected}
            onSelect={() => setSelectedId(offer.id)}
            highlights={getHighlights(baseKey)}
          />
        );
      })}
    </div>
  );
}
