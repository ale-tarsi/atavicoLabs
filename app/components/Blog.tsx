'use client';

import { useTranslations } from 'next-intl';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';

export default function Blog() {
  const t = useTranslations('blog');
  const { ref, isRevealed } = useReveal();

  return (
    <section 
      id="blog" 
      ref={ref}
      className="relative py-24 sm:py-32 bg-carbone w-full overflow-hidden"
    >
      {/* Section Number */}
      <div className="absolute top-12 right-6 lg:right-16 text-[11px] font-mono text-oliva/30">[06]</div>

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Insights"
          title={t('title')}
          subtitle={t('subtitle')}
          className={`max-w-[750px] mb-16 ${isRevealed ? 'revealed fade-up' : 'fade-up'} [&_h2]:text-[32px] [&_h2]:leading-[1.2] [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-sabbia/60 [&_p]:font-light [&_p]:max-w-[520px]`}
        />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => {
            const categoryColors = {
              0: 'border-oliva/30 text-oliva', // Business
              1: 'border-sabbia/30 text-sabbia/70', // Product  
              2: 'border-grigio/30 text-grigio/70' // Design
            };
            
            return (
              <article
                key={index}
                className={`group fade-up ${isRevealed ? 'revealed' : ''}`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <a
                  href="#"
                  className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
                >
                  <div className="border-l border-grigio/40 pl-6 py-8 group-hover:border-oliva/80 transition-colors duration-250 h-full flex flex-col min-h-[280px]">
                    {/* Category Badge */}
                    <span className={`inline-block px-2 py-1 text-[11px] border uppercase tracking-wider mb-4 w-fit ${categoryColors[index as keyof typeof categoryColors]}`}>
                      {t(`items.${index}.category`)}
                    </span>

                    {/* Title */}
                    <h3 className="text-[18px] font-medium text-sabbia leading-[1.3] mb-2">
                      {t(`items.${index}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] leading-[1.7] text-sabbia/70 font-light flex-1">
                      {t(`items.${index}.description`)}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-[12px] text-grigio mt-4 pt-4 border-t border-grigio/20">
                      <span>{t(`items.${index}.readTime`)}</span>
                      <span>•</span>
                      <span>{new Date(t(`items.${index}.date`)).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
