'use client';

import { useTranslations } from 'next-intl';
import { useReveal } from '../hooks/useReveal';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const { ref, isRevealed } = useReveal();
  
  const testimonials = [0, 1, 2];

  return (
    <section 
      id="testimonials" 
      ref={ref}
      className="relative py-24 sm:py-32 px-6 lg:px-16 bg-grafite w-full overflow-hidden"
    >
      {/* Section Number */}
      <div className="absolute top-12 right-6 lg:right-16 text-[14px] font-mono text-oliva/40">[05]</div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-[750px] mb-16">
          <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light mb-4">Testimonials</div>
          <h2 
            className={`font-display text-[32px] font-medium text-sabbia mb-4 leading-[1.2] fade-up ${isRevealed ? 'revealed' : ''}`}
          >
            {t('title')}
          </h2>
          <p 
            className={`text-[17px] leading-[1.65] text-sabbia/60 font-light max-w-[520px] fade-up ${isRevealed ? 'revealed' : ''}`}
            style={{ animationDelay: '100ms' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((index) => (
            <div
              key={index}
              className={`bg-carbone border border-grigio/30 p-6 sm:p-7 md:p-8 hover:border-oliva/40 transition-all duration-300 hover:-translate-y-1 ${index === 0 ? 'md:col-span-2 md:row-span-1' : ''} fade-up ${isRevealed ? 'revealed' : ''}`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              {/* Star Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-oliva stroke-oliva" viewBox="0 0 24 24" strokeWidth={1}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className={`${index === 0 ? 'text-[18px]' : 'text-[15px]'} text-sabbia leading-[1.6] mb-6 font-light`}>
                “{t(`items.${index}.quote`)}”
              </p>

              {/* Author info */}
              <div className="flex items-start gap-3 pt-4 border-t border-grigio/20">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 border border-grigio/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-grigio font-normal text-[11px] uppercase">
                    {t(`items.${index}.author`).charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sabbia text-[13px]">
                      {t(`items.${index}.author`)}
                    </p>
                    {/* Verified Badge */}
                    <div className="flex items-center gap-1 text-[9px] text-oliva/70">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth={1.5} fill="none" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[11px] text-grigio">
                    {t(`items.${index}.role`)} • {t(`items.${index}.company`)}
                  </p>
                </div>
              </div>
              {/* Micro-CTA under testimonial */}
              <div className="mt-5 pt-4 border-t border-grigio/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-grigio/70">
                <span>Progetto in linea con il tuo?</span>
                <a
                  href="#contact"
                  className="inline-flex items-center px-2 py-1 gap-1 text-[12px] text-oliva hover:text-oliva/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 focus-visible:ring-offset-carbone transition-colors"
                >
                  Parliamone
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
