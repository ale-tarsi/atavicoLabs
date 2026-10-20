'use client';

import { useTranslations } from 'next-intl';
import { Search, Plug, ShieldCheck, Rocket } from 'lucide-react';
import SectionHeader from './SectionHeader';

type Step = { title: string; description: string; duration?: string };

const ICONS = [Search, Plug, ShieldCheck, Rocket];

export default function HomeProcess() {
  const t = useTranslations('process');
  const steps = (t.raw('opsQuickWin.steps') as Step[]).slice(0, 4);

  return (
    <section id="process" className="relative py-24 lg:py-32 bg-grafite/40 w-full scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          title={t('opsQuickWin.title')}
          subtitle={t('opsQuickWin.subtitle')}
          className="max-w-[750px] mb-14 [&_h2]:text-[32px] [&_h2]:leading-[1.2] [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-sabbia/60 [&_p]:font-light"
        />

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-grigio/20 border border-grigio/20">
          {steps.map((step, i) => {
            const Icon = ICONS[i] ?? Rocket;
            return (
              <li key={i} className="bg-carbone p-8">
                <div className="flex items-center justify-between mb-8">
                  <span className="flex h-11 w-11 items-center justify-center border border-oliva/40 text-oliva">
                    <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] text-oliva/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                {step.duration && (
                  <div className="text-[11px] uppercase tracking-wider text-grigio/60 mb-2">
                    {step.duration}
                  </div>
                )}
                <h3 className="text-[18px] font-medium text-sabbia mb-3 leading-snug">{step.title}</h3>
                <p className="text-[14px] leading-[1.65] text-sabbia/60 font-light">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
