'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getCalendlyUrl } from '../constants/links';
import { trackCtaClick } from '../utils/track';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale() as 'it' | 'en';
  const { ref, isRevealed } = useReveal({ threshold: 0.1, once: true });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden w-full min-h-screen flex items-center bg-carbone"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-carbone via-grafite/30 to-grafite/60" />

      <div className="relative w-full px-6 lg:px-16 py-32 lg:py-40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <div
              className={`inline-flex items-center gap-3 text-[12px] uppercase mb-8 tracking-[0.15em] text-oliva/60 font-medium fade-up ${
                isRevealed ? 'revealed' : ''
              }`}
            >
              <span className="w-10 h-[1px] bg-oliva/40"></span>
              {t('label')}
            </div>

            <h1
              className={`font-display text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.1] font-medium mb-8 fade-up ${
                isRevealed ? 'revealed' : ''
              }`}
              style={{ color: '#EAEAE6', animationDelay: '100ms', letterSpacing: '-0.015em' }}
            >
              {t('title')}
            </h1>

            <p
              className={`text-[18px] sm:text-[20px] font-light mb-10 leading-[1.6] max-w-xl fade-up ${
                isRevealed ? 'revealed' : ''
              }`}
              style={{ color: '#C8C5B8', animationDelay: '200ms' }}
            >
              {t('description')}
            </p>

            <div
              className={`flex flex-col sm:flex-row sm:items-center gap-6 fade-up ${isRevealed ? 'revealed' : ''}`}
              style={{ animationDelay: '300ms' }}
            >
              <a
                href={getCalendlyUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick('hero', locale)}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-oliva text-carbone text-[14px] font-medium tracking-wide hover:bg-oliva/90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
              >
                {t('ctaPrimary')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </a>

              <a
                href="#portfolio"
                className="group inline-flex items-center gap-2 text-[14px] text-sabbia/70 font-medium hover:text-oliva transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
              >
                <span>{t('ctaSecondary')}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </a>
            </div>
          </div>

          <div
            className={`hidden lg:block fade-in ${isRevealed ? 'revealed' : ''}`}
            style={{ animationDelay: '400ms' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/illustrations/hero-workflow.svg"
              alt=""
              aria-hidden="true"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
