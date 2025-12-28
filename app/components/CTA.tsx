'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useReveal } from '../hooks/useReveal';
import { getMetrics } from '../constants/metrics';

export default function CTA() {
  const t = useTranslations('cta');
  const locale = useLocale() as 'it' | 'en';
  const { ref, isRevealed } = useReveal();

  return (
    <section 
      id="contact" 
      ref={ref}
      className="relative py-40 px-6 lg:px-16 bg-carbone border-t border-grigio/20 overflow-hidden w-full"
    >
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23D3D1C8'/%3E%3C/svg%3E")`,
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Section Number */}
      <div className="absolute top-12 right-6 lg:right-16 text-[11px] font-mono text-oliva/30">[07]</div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Left Column - Content */}
        <div className="space-y-8">
          {/* Micro Label */}
          <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light mb-4">{t('label')}</div>

          {/* Title */}
          <h2 
            className={`font-display text-[32px] font-medium text-sabbia leading-[1.2] fade-up ${isRevealed ? 'revealed' : ''}`}
          >
            {t('title')}
          </h2>

          {/* Subtitle */}
          <p 
            className={`text-[17px] leading-[1.65] text-sabbia/60 font-light max-w-[520px] fade-up ${isRevealed ? 'revealed' : ''}`}
            style={{ animationDelay: '100ms' }}
          >
            {t('subtitle')}
          </p>

          {/* What happens next */}
          <p 
            className={`text-[14px] leading-[1.7] text-sabbia/50 font-light max-w-[520px] fade-up ${isRevealed ? 'revealed' : ''}`}
            style={{ animationDelay: '160ms' }}
          >
            {t('nextSteps')}
          </p>

          {/* CTA Button */}
          <div 
            className={`pt-4 fade-up ${isRevealed ? 'revealed' : ''}`}
            style={{ animationDelay: '200ms' }}
          >
            <a
              href={`mailto:${t('email')}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-7 py-3.5 border border-sabbia/30 text-sabbia text-[13px] tracking-wide hover:border-oliva hover:text-oliva hover:bg-oliva/5 transition-all duration-300 uppercase"
            >
              {t('cta')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Stats Row */}
          <div 
            className={`grid grid-cols-4 gap-4 pt-8 border-t border-grigio/20 fade-up ${isRevealed ? 'revealed' : ''}`}
            style={{ animationDelay: '300ms' }}
          >
            {getMetrics(locale).map((stat, index) => (
              <div key={index}>
                <div className="text-[28px] font-medium text-oliva">{stat.value}</div>
                <div className="text-[11px] text-grigio/70 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Contact Info Box */}
        <div 
          className={`fade-up ${isRevealed ? 'revealed' : ''}`}
          style={{ animationDelay: '400ms' }}
        >
          <div className="border border-grigio/20 bg-grafite/30 p-8 space-y-6">
            {/* Availability Indicator */}
            <div className="flex items-center gap-2 text-[13px] text-sabbia/70 pb-6 border-b border-grigio/20">
              <div className="w-2 h-2 rounded-full bg-oliva animate-pulse"></div>
              <span className="uppercase tracking-wider">{t('availability')}</span>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {/* Email */}
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-1">{t('emailLabel')}</div>
                <a 
                  href={`mailto:${t('email')}`}
                  className="text-[15px] text-sabbia hover:text-oliva transition-colors"
                >
                  {t('email')}
                </a>
              </div>

              {/* Location */}
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-1">{t('workModeLabel')}</div>
                <div className="text-[15px] text-sabbia/70">{t('workMode')}</div>
              </div>

              {/* Response Time - Highlighted */}
              <div className="bg-oliva/10 border border-oliva/30 p-4 -mx-2">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-oliva" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-oliva font-medium">{t('responseTimeLabel')}</div>
                </div>
                <div className="text-[16px] font-medium text-sabbia">{t('responseTime')}</div>
                <div className="text-[12px] text-sabbia/60 mt-1">{t('responseTimeDetail')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
