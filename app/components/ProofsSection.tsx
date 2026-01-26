'use client';

import { useTranslations } from 'next-intl';
import { useReveal } from '../hooks/useReveal';
import { PROOFS } from '../constants/proofs';

export default function ProofsSection() {
  const t = useTranslations('proofs');
  const { ref, isRevealed } = useReveal();

  return (
    <section 
      ref={ref}
      className="relative py-20 lg:py-28 px-6 lg:px-16 bg-carbone border-y border-grigio/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4">
            {t('eyebrow')}
          </div>
          <h2 className={`font-display text-[32px] lg:text-[40px] font-medium text-sabbia mb-4 leading-[1.1] fade-up ${isRevealed ? 'revealed' : ''}`}>
            {t('title')}
          </h2>
          <p className={`text-[15px] leading-[1.65] text-sabbia/70 font-light max-w-2xl mx-auto fade-up ${isRevealed ? 'revealed' : ''}`} style={{ animationDelay: '100ms' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Proofs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROOFS.map((proof, index) => (
            <div
              key={proof.id}
              className={`border border-grigio/20 bg-grafite/30 p-6 hover:border-oliva/40 transition-all duration-300 hover:-translate-y-1 fade-up ${isRevealed ? 'revealed' : ''}`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-wider">
                {proof.badges.internal && (
                  <span className="text-grigio/60">{t('badges.internal')}</span>
                )}
                {proof.badges.internal && proof.badges.inProgress && (
                  <span className="text-grigio/40">•</span>
                )}
                {proof.badges.inProgress && (
                  <span className="text-oliva/70">{t('badges.inProgress')}</span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-[18px] font-medium text-sabbia mb-3 leading-[1.3]">
                {t(proof.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-sabbia/70 leading-[1.6] mb-4 font-light">
                {t(proof.descriptionKey)}
              </p>

              {/* Highlights */}
              <ul className="space-y-2 text-[13px]">
                {proof.highlights.map((highlightKey, i) => (
                  <li key={i} className="flex items-start gap-2 text-sabbia/70">
                    <span className="text-oliva/60 mt-1">•</span>
                    <span>{t(highlightKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
