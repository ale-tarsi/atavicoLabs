'use client';

import { useTranslations } from 'next-intl';
import { useReveal } from '../hooks/useReveal';

export default function Outcomes() {
  const t = useTranslations('outcomes');
  const { ref, isRevealed } = useReveal();

  const items = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-24 px-6 lg:px-16 bg-bg-primary border-t border-grigio/10 w-full"
    >
      {/* Section Number */}
      <div className="absolute top-12 right-6 lg:right-16 text-[11px] font-mono text-oliva/30">[002]</div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light mb-4">
            Sprint Outcomes
          </div>
          <h2
            className={`font-display text-[32px] lg:text-[42px] font-medium text-text-primary mb-4 leading-[1.2] fade-up ${
              isRevealed ? 'revealed' : ''
            }`}
          >
            {t('title')}
          </h2>
          <p
            className={`text-[17px] leading-[1.65] text-text-secondary/70 font-light fade-up ${
              isRevealed ? 'revealed' : ''
            }`}
            style={{ animationDelay: '100ms' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`border border-grigio/20 bg-carbone/30 p-6 hover:border-oliva/30 transition-all duration-300 fade-up ${
                isRevealed ? 'revealed' : ''
              }`}
              style={{ animationDelay: `${index * 80 + 200}ms` }}
            >
              {/* Number */}
              <div className="text-[11px] font-mono text-oliva/60 mb-3">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <h3 className="text-[18px] font-medium text-text-primary mb-2 leading-[1.3]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-text-secondary/60 leading-[1.65] font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
