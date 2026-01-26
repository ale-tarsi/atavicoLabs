'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import OfferCard from './OfferCard';
import { OFFERS } from '../constants/offers';

export default function StartingPoints() {
  const locale = useLocale() as string;
  const tHome = useTranslations('home');
  const tOffers = useTranslations('offers');

  const options = [
    { id: 'opsQuickWin', label: tHome('startingPoints.selector.automateProcess') },
    { id: 'continuityRetainer', label: tHome('startingPoints.selector.stabilizeAutomation') },
    { id: 'productBuild', label: tHome('startingPoints.selector.buildProduct') },
  ];

  const [selectedId, setSelectedId] = useState<string>(options[0].id);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((option) => {
          const isActive = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedId(option.id)}
              aria-pressed={isActive}
              className={`w-full text-left px-4 py-3 border text-[14px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone ${
                isActive
                  ? 'border-oliva/60 bg-oliva/5 text-sabbia shadow-[0_0_0_1px_rgba(168,183,92,0.2)]'
                  : 'border-grigio/25 bg-grafite/30 text-sabbia/80 hover:border-oliva/50'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
        {OFFERS.map((offer, index) => (
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
            highlighted={offer.id === selectedId}
          />
        ))}
      </div>
    </div>
  );
}
