'use client';

import { useTranslations } from 'next-intl';
import { FileText, Activity, ClipboardCheck } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const ICONS = [FileText, Activity, ClipboardCheck];

export default function About() {
  const t = useTranslations('about');
  const { ref, isRevealed } = useReveal();
  const commitments = t.raw('commitments') as { label: string; detail: string }[];
  const tags = t.raw('expertiseTags') as string[];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 lg:py-32 bg-carbone w-full"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light mb-4">
            {t('eyebrow')}
          </div>
          <h2
            className={`font-display text-[32px] font-medium text-sabbia mb-6 leading-[1.2] fade-up ${
              isRevealed ? 'revealed' : ''
            }`}
          >
            {t('title')}
          </h2>
          <p
            className={`text-[17px] leading-[1.65] text-sabbia/70 font-light fade-up ${
              isRevealed ? 'revealed' : ''
            }`}
            style={{ animationDelay: '100ms' }}
          >
            {t('subtitle')}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-grigio/20 border border-grigio/20">
          {commitments.map((item, i) => {
            const Icon = ICONS[i] ?? FileText;
            return (
              <li key={i} className="bg-carbone p-8">
                <Icon className="w-6 h-6 text-oliva mb-6" strokeWidth={1.5} aria-hidden="true" />
                <div className="text-[16px] font-medium text-sabbia mb-2">{item.label}</div>
                <div className="text-[14px] leading-[1.65] text-sabbia/60 font-light">{item.detail}</div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-[12px] text-grigio border border-grigio/30 tracking-wide">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
