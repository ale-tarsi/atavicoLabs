'use client';

import { useTranslations } from 'next-intl';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const t = useTranslations('about');
  const tProof = useTranslations('proofPoints');
  const { ref, isRevealed } = useReveal();
  const proofItems = tProof.raw('items') as { title: string; description: string }[];

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-carbone w-full overflow-hidden"
    >
      {/* Section Number */}
      <div className="absolute top-12 right-6 lg:right-16 text-[11px] font-mono text-oliva/30">[02]</div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          
          {/* Left Column */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light mb-4">{t('eyebrow')}</div>
            <h2 className={`font-display text-[32px] font-medium text-sabbia mb-6 leading-[1.2] fade-up ${isRevealed ? 'revealed' : ''}`}>
              {t('title')}
            </h2>
            <p className={`text-[17px] leading-[1.65] text-sabbia/70 font-light mb-12 max-w-[580px] fade-up ${isRevealed ? 'revealed' : ''}`} style={{ animationDelay: '100ms' }}>
              {t('subtitle')}
            </p>

            {/* Commitments list */}
            <div className="space-y-6 mt-8">
              {(t.raw('commitments') as { label: string; detail: string }[]).map((item, i) => (
                <div 
                  key={i}
                  className={`flex gap-4 fade-up ${isRevealed ? 'revealed' : ''}`}
                  style={{ animationDelay: `${(i + 2) * 100}ms` }}
                >
                  <span className="text-[11px] font-mono text-oliva/50 mt-1 shrink-0">0{i + 1}</span>
                  <div>
                    <div className="text-[15px] font-medium text-sabbia mb-1">{item.label}</div>
                    <div className="text-[13px] leading-[1.7] text-sabbia/60 font-light">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Stats Grid (prominent) */}
          <div className="space-y-4">
            <div className="border border-grigio/20 p-6 bg-grafite/30">
              <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/50 font-light mb-6">{tProof('label')}</div>
              <div className="grid grid-cols-2 gap-8">
                {proofItems.map((item, i) => (
                  <div 
                    key={i} 
                    className={`space-y-2 fade-up ${isRevealed ? 'revealed' : ''}`}
                    style={{ animationDelay: `${(i + 1) * 80}ms` }}
                  >
                    <div className="text-[32px] font-medium text-oliva leading-[1.1]">{item.title}</div>
                    <div className="text-[12px] text-grigio/70 leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise tags */}
            <div className="border border-grigio/20 p-6">
              <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light mb-4">{t('expertiseLabel')}</div>
              <div className="flex flex-wrap gap-2">
                {(t.raw('expertiseTags') as string[]).map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-[12px] text-grigio border border-grigio/30 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
