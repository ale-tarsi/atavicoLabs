import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Reveal from './Reveal';

export default function CalculatorBand() {
  const locale = useLocale();
  const t = useTranslations('calculator.band');

  return (
    <section className="relative py-16 lg:py-20 bg-carbone w-full">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-grigio/20 bg-grafite/30 p-8 lg:p-10">
          <div className="max-w-xl">
            <h2 className="font-display text-[24px] lg:text-[28px] font-medium text-sabbia leading-[1.2] mb-2">
              {t('title')}
            </h2>
            <p className="text-[15px] leading-[1.65] text-sabbia/70 font-light">{t('text')}</p>
          </div>
          <Link
            href={`/${locale}/calcolatore`}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-oliva/60 text-oliva text-[14px] font-medium hover:bg-oliva/10 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
          >
            {t('button')}
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
