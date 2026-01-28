'use client';

import { useTranslations } from 'next-intl';
import { useReveal } from '../hooks/useReveal';
import { useEffect, useRef, useState } from 'react';
import SectionHeader from './SectionHeader';

export default function Process() {
  const t = useTranslations('process');
  const tNavbar = useTranslations('navbar');
  const { ref, isRevealed } = useReveal();

  // per-step reveal state and refs (one observer per step)
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [revealed, setRevealed] = useState<boolean[]>(new Array(4).fill(false));

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = stepRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx === -1) return;
          if (entry.isIntersecting) {
            setRevealed((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.45, rootMargin: '0px 0px -30% 0px' }
    );

    // observe any refs already set
    stepRefs.current.forEach((el) => {
      if (el && observerRef.current) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <section 
      id="process" 
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-carbone w-full overflow-hidden"
    >
      {/* Section Number - top right */}
      <div className="absolute top-12 right-6 lg:right-16 text-[11px] font-mono text-oliva/30">[05]</div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-[900px] mx-auto">

        {/* Header */}
        <SectionHeader
          eyebrow={tNavbar('process')}
          title={t('title')}
          subtitle={t('subtitle')}
          className={`max-w-[750px] mb-16 ${isRevealed ? 'revealed fade-up' : 'fade-up'} [&_h2]:text-[32px] [&_h2]:leading-[1.2] [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-sabbia/60 [&_p]:font-light [&_p]:max-w-[520px]`}
        />

        {/* Timeline - vertical line with dots */}
        <div className="relative">
          {/* Vertical line */}
          <div 
            className="absolute left-[24px] top-8 bottom-8 w-px bg-grigio/20"
            style={{ 
              transform: isRevealed ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'transform 1.2s ease-out'
            }}
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {[0, 1, 2, 3].map((index) => {
              const percentages = ['15%', '25%', '50%', '10%'];
              // Offset diagonale solo su schermi >= sm (640px), crescente per ogni step
              const offsetClass = index === 0 ? '' : 
                                  index === 1 ? 'sm:ml-[40px]' :
                                  index === 2 ? 'sm:ml-[80px]' :
                                  'sm:ml-[120px]';
              return (
                <div
                  key={index}
                  ref={(el) => { stepRefs.current[index] = el; if (el && observerRef.current) observerRef.current.observe(el); }}
                  className={`relative fade-up max-w-full ${revealed[index] ? 'revealed' : 'opacity-0'} ${offsetClass}`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                {/* Dot on timeline */}
                <div 
                  className="absolute left-0 top-4 w-12 h-12 flex items-center justify-center"
                  style={{
                    opacity: revealed[index] ? 1 : 0,
                    transform: revealed[index] ? 'scale(1)' : 'scale(0)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    transitionDelay: `${index * 150 + 200}ms`
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-oliva" />
                </div>

                {/* Content */}
                <div className="pl-16">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-[10px] font-mono text-grigio/60">PHASE_0{index + 1}</span>
                    <span className="text-[10px] text-grigio/50">•</span>
                    <span className="text-[10px] text-grigio/50">{percentages[index]} del progetto</span>
                  </div>
                  <h3 className="text-[20px] font-medium text-sabbia mb-2 leading-[1.3]">
                    {t(`steps.${index}.title`)}
                  </h3>
                  <p className="text-[14px] leading-[1.7] text-sabbia/70 font-light mb-3 max-w-[520px]">
                    {t(`steps.${index}.description`)}
                  </p>
                  <div className="text-[13px] text-oliva font-medium mb-4">
                    {t(`steps.${index}.duration`)}
                  </div>

                  {/* Micro-CTA: when this step ends */}
                  <div className="text-[13px] text-sabbia/60 mb-3">
                    {t(`steps.${index}.next`)}
                  </div>

                  {/* Deliverables */}
                  <div className="border border-grigio/30 bg-carbone/50 p-5">
                    <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/70 mb-3">Deliverables</div>
                  <div className="space-y-2.5">
                    {index === 0 && (
                      <>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <rect x="0.5" y="0.5" width="15" height="15" fill="rgb(78, 88, 78)" stroke="rgb(78, 88, 78)" strokeWidth="1" />
                            <path d="M4 8l2.5 2.5L12 5" stroke="rgb(232, 230, 220)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Product brief condiviso</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <rect x="0.5" y="0.5" width="15" height="15" fill="rgb(78, 88, 78)" stroke="rgb(78, 88, 78)" strokeWidth="1" />
                            <path d="M4 8l2.5 2.5L12 5" stroke="rgb(232, 230, 220)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Technical requirements</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <div className="w-4 h-4 border border-grigio/40 flex-shrink-0" />
                          <span>Project timeline</span>
                        </div>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <rect x="0.5" y="0.5" width="15" height="15" fill="rgb(78, 88, 78)" stroke="rgb(78, 88, 78)" strokeWidth="1" />
                            <path d="M4 8l2.5 2.5L12 5" stroke="rgb(232, 230, 220)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Design system library</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <rect x="0.5" y="0.5" width="15" height="15" fill="rgb(78, 88, 78)" stroke="rgb(78, 88, 78)" strokeWidth="1" />
                            <path d="M4 8l2.5 2.5L12 5" stroke="rgb(232, 230, 220)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Clickable prototype</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <div className="w-4 h-4 border border-grigio/40 flex-shrink-0" />
                          <span>Architecture diagram</span>
                        </div>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <rect x="0.5" y="0.5" width="15" height="15" fill="rgb(78, 88, 78)" stroke="rgb(78, 88, 78)" strokeWidth="1" />
                            <path d="M4 8l2.5 2.5L12 5" stroke="rgb(232, 230, 220)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Production-ready code</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <div className="w-4 h-4 border border-grigio/40 flex-shrink-0" />
                          <span>Test coverage &gt;80%</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <div className="w-4 h-4 border border-grigio/40 flex-shrink-0" />
                          <span>CI/CD pipeline</span>
                        </div>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <rect x="0.5" y="0.5" width="15" height="15" fill="rgb(78, 88, 78)" stroke="rgb(78, 88, 78)" strokeWidth="1" />
                            <path d="M4 8l2.5 2.5L12 5" stroke="rgb(232, 230, 220)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>App live in produzione</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <rect x="0.5" y="0.5" width="15" height="15" fill="rgb(78, 88, 78)" stroke="rgb(78, 88, 78)" strokeWidth="1" />
                            <path d="M4 8l2.5 2.5L12 5" stroke="rgb(232, 230, 220)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Monitoring setup</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] text-sabbia/70">
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <rect x="0.5" y="0.5" width="15" height="15" fill="rgb(78, 88, 78)" stroke="rgb(78, 88, 78)" strokeWidth="1" />
                            <path d="M4 8l2.5 2.5L12 5" stroke="rgb(232, 230, 220)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Documentation</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>

        {/* Methodology */}
        <div className="mt-16 pt-12 border-t border-grigio/20">
          <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light mb-4">Methodology</div>
          <div className="text-[14px] text-sabbia/70 leading-relaxed mb-4">
            Agile · Test-Driven Development · Continuous Integration
          </div>
          <div className="flex flex-wrap gap-3">
            {['Figma', 'GitHub', 'Linear', 'Slack'].map((tool, i) => (
              <div key={i} className="px-3 py-1.5 border border-grigio/30 text-[11px] text-grigio/60">
                {tool}
              </div>
            ))}
          </div>

          {/* Final nudge to contact */}
          <a
            href="#contact"
            className="inline-flex items-center px-2 py-1 mt-6 text-[13px] text-oliva hover:text-oliva/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 focus-visible:ring-offset-carbone transition-colors"
          >
            Vuoi capire come applichiamo questo processo al tuo prodotto?
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
