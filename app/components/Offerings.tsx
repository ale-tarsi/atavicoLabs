'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Search, Workflow } from 'lucide-react';
import { getCalendlyUrl } from '../constants/links';
import { trackCtaClick } from '../utils/track';

const ITEMS = [
  { key: 'analysis', Icon: Search },
  { key: 'build', Icon: Workflow },
] as const;

export default function Offerings() {
  const locale = useLocale() as 'it' | 'en';
  const t = useTranslations('home.startingPoints');

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {ITEMS.map(({ key, Icon }) => (
          <div
            key={key}
            className="flex flex-col border border-grigio/20 bg-grafite/30 p-8 lg:p-10"
          >
            <Icon size={28} className="text-oliva mb-6" aria-hidden="true" />
            <h3 className="text-[26px] lg:text-[28px] font-medium text-sabbia mb-3">
              {t(`${key}.title`)}
            </h3>
            <p className="text-[16px] font-light leading-relaxed text-sabbia/80 mb-6">
              {t(`${key}.tagline`)}
            </p>
            <ul className="mt-auto space-y-3 text-[14px] text-sabbia/80">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-oliva mt-[2px]" aria-hidden="true">●</span>
                  <span>{t(`${key}.bullets.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-[14px] text-sabbia/70">{t('support')}</p>

      <div className="mt-10 flex justify-center">
        <a
          href={getCalendlyUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCtaClick('offerings', locale)}
          className="inline-flex items-center gap-2 px-7 py-3 bg-oliva text-carbone text-[14px] font-medium hover:bg-oliva/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
        >
          {t('cta')}
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
