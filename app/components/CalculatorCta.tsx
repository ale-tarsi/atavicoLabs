'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { getCalendlyUrl } from '../constants/links';
import { trackCtaClick } from '../utils/track';

export default function CalculatorCta() {
  const locale = useLocale() as 'it' | 'en';
  const t = useTranslations('calculator.cta');

  return (
    <div className="border border-oliva/30 bg-oliva/5 p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="max-w-xl">
        <h2 className="font-display text-[24px] lg:text-[28px] font-medium text-sabbia leading-[1.2] mb-2">
          {t('title')}
        </h2>
        <p className="text-[15px] leading-[1.65] text-sabbia/70 font-light">{t('text')}</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-shrink-0">
        <a
          href={getCalendlyUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCtaClick('calculator', locale)}
          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-oliva text-carbone text-[14px] font-medium hover:bg-oliva/90 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
        >
          {t('button')}
          <ArrowRight size={16} />
        </a>
        <Link
          href={`/${locale}/contact`}
          className="text-[14px] text-sabbia/70 hover:text-oliva transition-colors whitespace-nowrap"
        >
          {t('secondary')}
        </Link>
      </div>
    </div>
  );
}
