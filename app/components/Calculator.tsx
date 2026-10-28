'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { getCalendlyUrl } from '../constants/links';
import { trackCtaClick } from '../utils/track';

const WEEKS_PER_YEAR = 46;

function toNumber(value: string): number {
  const n = parseFloat(value.replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

const inputClass =
  'w-full bg-carbone border border-grigio/30 px-4 py-3 text-[16px] text-sabbia placeholder:text-grigio/50 focus:border-oliva focus:outline-none transition-colors';

export default function Calculator() {
  const locale = useLocale() as 'it' | 'en';
  const t = useTranslations('calculator');

  const [hours, setHours] = useState('10');
  const [rate, setRate] = useState('25');
  const [share, setShare] = useState(70);
  const [budget, setBudget] = useState('');

  const r = useMemo(() => {
    const annualHours = toNumber(hours) * WEEKS_PER_YEAR;
    const annualCost = annualHours * toNumber(rate);
    const savedHours = (annualHours * share) / 100;
    const savedCost = (annualCost * share) / 100;
    const b = toNumber(budget);
    const paybackMonths = b > 0 && savedCost > 0 ? b / (savedCost / 12) : null;
    return { annualCost, savedHours, savedCost, paybackMonths };
  }, [hours, rate, share, budget]);

  // Formattazione manuale: identica su server e browser (Intl cambia il
  // raggruppamento delle migliaia tra ambienti e causa errori di idratazione).
  const sep = locale === 'it' ? '.' : ',';
  const group = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  const num = (n: number) => group(n);
  const money = (n: number) => (locale === 'it' ? `${group(n)}\u00A0€` : `€${group(n)}`);

  let payback: string | null = null;
  if (r.paybackMonths !== null) {
    if (r.paybackMonths < 1) payback = t('results.lessThanMonth');
    else if (r.paybackMonths > 60) payback = t('results.overYears');
    else payback = t('results.months', { value: Math.round(r.paybackMonths) });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start">
      <form
        className="space-y-8 border border-grigio/20 bg-grafite/30 p-8 lg:p-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="calc-hours" className="block text-[15px] font-medium text-sabbia mb-2">
            {t('inputs.hours.label')}
          </label>
          <input
            id="calc-hours"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className={inputClass}
          />
          <p className="mt-2 text-[13px] text-sabbia/60">{t('inputs.hours.hint')}</p>
        </div>

        <div>
          <label htmlFor="calc-rate" className="block text-[15px] font-medium text-sabbia mb-2">
            {t('inputs.rate.label')}
          </label>
          <input
            id="calc-rate"
            type="number"
            inputMode="decimal"
            min="0"
            step="1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={inputClass}
          />
          <p className="mt-2 text-[13px] text-sabbia/60">{t('inputs.rate.hint')}</p>
        </div>

        <div>
          <label htmlFor="calc-share" className="flex items-baseline justify-between text-[15px] font-medium text-sabbia mb-3">
            <span>{t('inputs.share.label')}</span>
            <span className="font-mono text-oliva">{share}%</span>
          </label>
          <input
            id="calc-share"
            type="range"
            min="10"
            max="100"
            step="5"
            value={share}
            onChange={(e) => setShare(Number(e.target.value))}
            className="w-full accent-oliva"
          />
          <p className="mt-2 text-[13px] text-sabbia/60">{t('inputs.share.hint')}</p>
        </div>

        <div>
          <label htmlFor="calc-budget" className="block text-[15px] font-medium text-sabbia mb-2">
            {t('inputs.budget.label')}
          </label>
          <input
            id="calc-budget"
            type="number"
            inputMode="decimal"
            min="0"
            step="100"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={inputClass}
          />
          <p className="mt-2 text-[13px] text-sabbia/60">{t('inputs.budget.hint')}</p>
        </div>
      </form>

      <div className="lg:sticky lg:top-28 space-y-6">
        <div
          className="border border-oliva/40 bg-grafite/50 p-8 lg:p-10"
          aria-live="polite"
        >
          <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-6">
            {t('results.title')}
          </div>

          <dl className="space-y-6">
            <div>
              <dt className="text-[13px] text-sabbia/60 mb-1">{t('results.annualCost')}</dt>
              <dd className="font-display text-[40px] leading-none font-medium text-sabbia">
                {money(r.annualCost)}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-grigio/20 pt-6">
              <div>
                <dt className="text-[13px] text-sabbia/60 mb-1">{t('results.hoursSaved')}</dt>
                <dd className="text-[24px] font-medium text-oliva">{num(r.savedHours)}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-sabbia/60 mb-1">{t('results.moneySaved')}</dt>
                <dd className="text-[24px] font-medium text-oliva">{money(r.savedCost)}</dd>
              </div>
            </div>
            <div className="border-t border-grigio/20 pt-6">
              <dt className="text-[13px] text-sabbia/60 mb-1">{t('results.payback')}</dt>
              <dd className="text-[20px] font-medium text-sabbia">
                {payback ?? <span className="text-[14px] font-light text-sabbia/60">{t('results.paybackNone')}</span>}
              </dd>
            </div>
          </dl>

          <p className="mt-8 text-[12px] leading-[1.6] text-sabbia/50">
            {t('results.note', { weeks: WEEKS_PER_YEAR })}
          </p>
        </div>

        <div className="border border-grigio/20 bg-grafite/30 p-8">
          <h2 className="text-[20px] font-medium text-sabbia mb-2">{t('cta.title')}</h2>
          <p className="text-[15px] leading-[1.65] text-sabbia/70 font-light mb-6">{t('cta.text')}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={getCalendlyUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick('calculator', locale)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-oliva text-carbone text-[14px] font-medium hover:bg-oliva/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
            >
              {t('cta.button')}
              <ArrowRight size={16} />
            </a>
            <Link
              href={`/${locale}/contact`}
              className="text-[14px] text-sabbia/70 hover:text-oliva transition-colors"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
