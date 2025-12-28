'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useReveal } from '../hooks/useReveal';
import { useState, useEffect, useRef } from 'react';

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const { ref, isRevealed } = useReveal();
  
  // per-card reveal
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [revealed, setRevealed] = useState<boolean[]>(() => new Array(4).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            if (!Number.isNaN(idx)) {
              setRevealed((prev) => {
                if (prev[idx]) return prev;
                const next = [...prev];
                next[idx] = true;
                return next;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5, // roughly center of viewport
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // cleanup
    return () => observer.disconnect();
  }, []);

  const services = [
    { title: t('items.0.title'), description: t('items.0.description') },
    { title: t('items.1.title'), description: t('items.1.description') },
    { title: t('items.2.title'), description: t('items.2.description') },
    { title: t('items.3.title'), description: t('items.3.description') },
  ];

  return (
    <section 
      ref={ref}
      className="relative w-full py-24 sm:py-32 lg:py-40 px-6 lg:px-24 bg-bg-primary overflow-hidden border-t border-text-ghost/10"
    >
      {/* Section Number - top right */}
      <div className="absolute top-16 right-6 lg:right-24 text-mono text-text-ghost">[03]</div>

      <div className="relative max-w-content mx-auto">
        {/* Header - max-width 780px */}
        <div className="max-w-text mb-20">
          <div className="text-label uppercase text-text-muted font-medium mb-6">What we do</div>
          <h2 className="font-display text-h1 lg:text-h2 text-text-primary mb-5">
            {t('title')}
          </h2>
          <p className="text-body lg:text-body-lg text-text-tertiary font-light max-w-paragraph">
            {t('subtitle')}
          </p>
        </div>

        {/* Services Grid - 4 columns, gap aumentato */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              data-index={i}
              className="relative p-6 sm:p-8 lg:p-10 bg-bg-secondary border border-text-ghost/15 min-h-[420px] rounded-sm hover:border-accent-primary hover:bg-bg-tertiary hover:-translate-y-2 hover:shadow-premium transition-all duration-400 group"
              style={{
                opacity: revealed[i] ? 1 : 0,
                transform: revealed[i] ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
                transitionDelay: revealed[i] ? `${i * 0.1}s` : '0s'
              }}
            >
              {/* Index Number - top left */}
              <div className="text-mono text-text-ghost mb-6">0{i + 1}</div>
              
              {/* Icon - più grande */}
              <div className="w-10 h-10 mb-8 text-text-tertiary group-hover:text-accent-primary transition-colors">
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />}
                  {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />}
                  {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />}
                  {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />}
                </svg>
              </div>
              
              <h3 className="text-h3 text-text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-body text-text-secondary mb-7">
                {service.description}
              </p>

              {/* CTA towards Sprint page */}
              <a
                href={`/${locale}/sprint`}
                className="inline-flex items-center px-2 py-1 text-body-sm text-accent-primary hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary transition-colors mb-5"
              >
                {t('sprintDetails')}
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Status Badge */}
              <div className="text-body-sm text-text-muted mb-5">
                <span className="uppercase tracking-wider font-medium">Status: </span>
                <span className="text-accent-primary">
                  Incluso nello Sprint
                </span>
              </div>
              
              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-text-ghost/15">
                {i === 0 && <><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">Figma</span><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">Prototyping</span><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">User Testing</span></>}
                {i === 1 && <><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">React</span><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">Next.js</span><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">Flutter</span></>}
                {i === 2 && <><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">Node.js</span><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">PostgreSQL</span><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">API Design</span></>}
                {i === 3 && <><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">OpenAI</span><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">Automation</span><span className="px-3 py-1.5 text-[12px] text-text-secondary border border-text-ghost/25 rounded-sm hover:border-accent-primary hover:text-text-primary transition-colors">Integration</span></>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
