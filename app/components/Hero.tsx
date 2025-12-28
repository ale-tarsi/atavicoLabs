'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const { ref, isRevealed } = useReveal({ threshold: 0.1, once: true });

  return (
    <section 
      ref={ref}
      className="relative overflow-hidden w-full min-h-screen flex items-center bg-carbone"
    >
      {/* Background Gradient + Noise - enhanced */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbone via-grafite/30 to-grafite/60" />
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Section Number - more visible */}
      <div 
        className={`absolute top-32 right-8 lg:right-16 text-[11px] font-mono text-oliva/30 tracking-wider fade-in ${isRevealed ? 'revealed' : ''}`}
      >
        [001]
      </div>
      
      {/* Main Container - centered composition */}
      <div className="relative w-full px-6 lg:px-16 py-32 lg:py-40">
        <div className="max-w-6xl mx-auto">
          
          {/* Content - centered, single column */}
          <div className="max-w-4xl mx-auto text-left">
            
            {/* Eyebrow - refined */}
            <div 
              className={`inline-flex items-center gap-3 text-[12px] uppercase mb-8 tracking-[0.15em] text-oliva/60 font-medium fade-up ${
                isRevealed ? 'revealed' : ''
              }`}
            >
              <span className="w-10 h-[1px] bg-oliva/40"></span>
              {t('label')}
            </div>

            {/* H1 Title - optimized spacing & tracking */}
            <h1
              className={`font-display text-[48px] sm:text-[56px] lg:text-[72px] leading-[1.1] font-medium mb-8 max-w-3xl fade-up ${
                isRevealed ? 'revealed' : ''
              }`}
              style={{ 
                color: '#EAEAE6', 
                animationDelay: '100ms',
                letterSpacing: '-0.015em'
              }}
            >
              {t('title')}
            </h1>

            {/* Paragraph - tighter line-height */}
            <p 
              className={`text-[19px] sm:text-[21px] font-light mb-10 leading-[1.6] max-w-2xl fade-up ${
                isRevealed ? 'revealed' : ''
              }`}
              style={{ color: '#C8C5B8', animationDelay: '200ms' }}
            >
              {t('description')}
            </p>

            {/* CTA Buttons - refined hierarchy */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 mb-10 fade-up ${isRevealed ? 'revealed' : ''}`}
              style={{ animationDelay: '300ms' }}
            >
              {/* Primary CTA - Booking */}
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-oliva text-carbone text-[14px] font-medium tracking-wide hover:bg-oliva/90 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
              >
                {t('ctaPrimary')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </a>

              {/* Secondary CTA - Sprint page */}
              <a
                href={`/${locale}/sprint`}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-sabbia/30 bg-transparent text-[14px] font-medium text-sabbia tracking-wide hover:border-oliva/50 hover:bg-oliva/5 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
              >
                {t('ctaSecondary')}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </a>
            </div>

            {/* Info Row + Delivery Note */}
            <div 
              className={`mb-8 fade-in ${isRevealed ? 'revealed' : ''}`}
              style={{ animationDelay: '400ms' }}
            >
              {/* Primary info - inline with separators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-sabbia/80 font-light mb-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-oliva"></span>
                  <span>{t('available')}</span>
                </div>
                <span className="hidden sm:inline text-sabbia/40">•</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-oliva/60"></span>
                  <span>{t('since')}</span>
                </div>
                <span className="hidden sm:inline text-sabbia/40">•</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-oliva/60"></span>
                  <span>{t('remote')}</span>
                </div>
                <span className="hidden sm:inline text-sabbia/40">•</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-oliva/60"></span>
                  <span>{t('onsite')}</span>
                </div>
              </div>
              
              {/* Delivery note - improved readability */}
              <p className="text-[14px] text-sabbia/60 font-light max-w-xl leading-[1.6]">
                {t('deliveryNote')}
              </p>
            </div>

            {/* BUILD STATUS - inline compact badge */}
            <div 
              className={`inline-flex items-center flex-wrap gap-x-8 gap-y-3 px-6 py-3 border border-grigio/20 bg-grafite/20 backdrop-blur-sm fade-in ${isRevealed ? 'revealed' : ''}`}
              style={{ animationDelay: '500ms' }}
            >
              {/* Header label */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-oliva/60"></span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sabbia/60">
                  {t('statusLabel')}
                </span>
              </div>

              {/* Metrics - inline */}
              <div className="flex items-center gap-6">
                {/* Build */}
                <div className="flex items-center gap-2">
                  <span className="text-oliva text-[14px]">✓</span>
                  <span className="text-[12px] text-sabbia/70 font-light">{t('statusBuild')}</span>
                </div>

                {/* Tests */}
                <div className="flex items-center gap-2">
                  <span className="text-oliva text-[14px]">✓</span>
                  <span className="text-[12px] text-sabbia/70 font-light font-mono">{t('statusTests')} 120+</span>
                </div>

                {/* Performance */}
                <div className="flex items-center gap-2">
                  <span className="text-oliva text-[14px]">✓</span>
                  <span className="text-[12px] font-medium text-oliva font-mono">{t('statusPerf')} 95+/100</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
