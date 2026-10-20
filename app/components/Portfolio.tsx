'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES, type Locale } from '../constants/caseStudies';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const tNavbar = useTranslations('navbar');
  const locale = useLocale();
  const lang: Locale = locale === 'en' ? 'en' : 'it';

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 bg-carbone w-full">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow={tNavbar('work')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="max-w-[750px] mb-14 [&_h2]:text-[32px] [&_h2]:leading-[1.2] [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-sabbia/60 [&_p]:font-light"
        />

        <ul className="border-t border-grigio/20">
          {CASE_STUDIES.map((study, i) => {
            const c = study.content[lang];
            return (
              <Reveal as="li" key={study.slug} delay={i * 0.08} className="border-b border-grigio/20">
                <Link
                  href={`/${lang}/projects/${study.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-[280px_1fr_auto] gap-6 lg:gap-12 items-center py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
                >
                  <div className="overflow-hidden border border-grigio/20 group-hover:border-oliva/40 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/illustrations/case-${study.slug}.svg`}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-grigio/60 mb-2">
                      {c.label}
                    </div>
                    <h3 className="text-[22px] font-medium text-sabbia group-hover:text-oliva transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-sabbia/70 font-light max-w-xl">
                      {c.summary}
                    </p>
                    <p className="mt-3 text-[12px] text-grigio/70">{study.stack.join(' · ')}</p>
                  </div>
                  <ArrowUpRight
                    className="hidden lg:block w-5 h-5 text-oliva/70 group-hover:text-oliva transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                    strokeWidth={1.5}
                  />
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
