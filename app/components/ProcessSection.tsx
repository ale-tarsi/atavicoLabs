'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionHeader from './SectionHeader';
import { useReveal } from '../hooks/useReveal';

type Variant = 'opsQuickWin' | 'continuityRetainer' | 'productBuild';

type Deliverable = {
  text: string;
  done?: boolean;
};

type Step = {
  phaseLabel?: string;
  percent?: string;
  title: string;
  description: string;
  duration?: string;
  next?: string;
  deliverablesLabel?: string;
  deliverables: Deliverable[];
};

type VariantContent = {
  title: string;
  subtitle: string;
  deliverablesLabel: string;
  methodologyLabel: string;
  methodologyText: string;
  tools: string[];
  finalNudge: string;
  steps: Step[];
};

const toString = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const toDeliverables = (value: unknown): Deliverable[] => {
  if (!Array.isArray(value)) return [];

  const result: Deliverable[] = [];

  value.forEach((item) => {
    if (typeof item === 'string') {
      result.push({ text: item, done: true });
      return;
    }
    if (item && typeof item === 'object' && 'text' in item) {
      const obj = item as { text?: unknown; done?: unknown };
      const text = toString(obj.text);
      if (!text) return;
      const done = obj.done === undefined ? true : Boolean(obj.done);
      result.push({ text, done });
    }
  });

  return result;
};

const toSteps = (value: unknown): Step[] => {
  if (!Array.isArray(value)) return [];
  const steps: Step[] = [];
  value.forEach((item) => {
    if (!item || typeof item !== 'object') return;
    const step = item as Record<string, unknown>;
    const title = toString(step.title);
    const description = toString(step.description);
    if (!title && !description) return;

    steps.push({
      phaseLabel: toString(step.phaseLabel),
      percent: toString(step.percent),
      title,
      description,
      duration: toString(step.duration),
      next: toString(step.next),
      deliverablesLabel: toString(step.deliverablesLabel),
      deliverables: toDeliverables(step.deliverables),
    });
  });
  return steps;
};

const loadVariant = (raw: unknown): VariantContent => {
  const record = (raw as Record<string, unknown>) || {};
  return {
    title: toString(record.title),
    subtitle: toString(record.subtitle),
    deliverablesLabel: toString(record.deliverablesLabel, 'Deliverables'),
    methodologyLabel: toString(record.methodologyLabel, 'Methodology'),
    methodologyText: toString(record.methodologyText),
    tools: toStringArray(record.tools),
    finalNudge: toString(record.finalNudge),
    steps: toSteps(record.steps),
  };
};

type ProcessSectionProps = {
  variant: Variant;
  id?: string;
};

export default function ProcessSection({ variant, id }: ProcessSectionProps) {
  const t = useTranslations('process');
  const tNavbar = useTranslations('navbar');
  const { ref: sectionRef, isRevealed, isMounted } = useReveal({
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px',
  });

  const content = useMemo<VariantContent>(() => loadVariant(t.raw(variant)), [t, variant]);
  const steps = content.steps;
  const processId = id || `process-${variant}`;

  const [revealedSteps, setRevealedSteps] = useState<boolean[]>(() =>
    new Array(steps.length).fill(false)
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setRevealedSteps(new Array(steps.length).fill(false));
  }, [steps.length]);

  useEffect(() => {
    if (!isMounted) return;
    const sectionEl = document.querySelector<HTMLElement>(`[data-process="${processId}"]`);
    if (!sectionEl) return;

    observerRef.current?.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const idx = Number(target.dataset.stepIndex ?? -1);
          if (idx < 0) return;
          if (entry.isIntersecting) {
            setRevealedSteps((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.45, rootMargin: '0px 0px -25% 0px' }
    );

    observerRef.current = observer;
    const targets = sectionEl.querySelectorAll<HTMLElement>('[data-step-index]');
    targets.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [processId, steps.length, isMounted]);

  const diagonalOffset = variant === 'productBuild';

  return (
    <section
      id={processId}
      data-process={processId}
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 bg-carbone w-full overflow-hidden scroll-mt-24"
    >
      <div className="absolute top-12 right-6 lg:right-16 text-[11px] font-mono text-oliva/30">
        [05]
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-[900px] mx-auto">
          <SectionHeader
            eyebrow={tNavbar('process')}
            title={content.title}
            subtitle={content.subtitle}
            className={`max-w-[780px] mb-16 ${isRevealed ? 'revealed fade-up' : 'fade-up'} [&_h2]:text-[32px] [&_h2]:leading-[1.2] [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-sabbia/60 [&_p]:font-light [&_p]:max-w-[560px]`}
          />

          <div className="relative">
            <div
              className="absolute left-[24px] top-8 bottom-8 w-px bg-grigio/20"
              style={{
                transform: isRevealed ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
                transition: 'transform 1.2s ease-out',
              }}
            />

            <div className="space-y-12 md:space-y-16">
              {steps.map((step, index) => {
                const diagonalOffsets = [
                  '',
                  'sm:ml-[28px]',
                  'sm:ml-[56px]',
                  'sm:ml-[84px]',
                  'sm:ml-[112px]',
                  'sm:ml-[128px]',
                ];
                const offset =
                  diagonalOffset && index < diagonalOffsets.length
                    ? diagonalOffsets[index]
                    : diagonalOffset
                      ? diagonalOffsets[diagonalOffsets.length - 1]
                      : '';
                return (
                  <div
                    key={`${processId}-step-${index}`}
                    data-step-index={index}
                    className={`relative fade-up max-w-full ${
                      revealedSteps[index] ? 'revealed' : 'opacity-0'
                    } ${offset}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div
                      className="absolute left-0 top-4 w-12 h-12 flex items-center justify-center"
                      style={{
                        opacity: revealedSteps[index] ? 1 : 0,
                        transform: revealedSteps[index] ? 'scale(1)' : 'scale(0)',
                        transition: 'opacity 0.4s ease, transform 0.4s ease',
                        transitionDelay: `${index * 150 + 200}ms`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-oliva" />
                    </div>

                    <div className="pl-16">
                      <div className="mb-2 flex items-center gap-3">
                        {step.phaseLabel && (
                          <span className="text-[10px] font-mono text-grigio/60">
                            {step.phaseLabel}
                          </span>
                        )}
                        {step.phaseLabel && step.percent && (
                          <span className="text-[10px] text-grigio/50">•</span>
                        )}
                        {step.percent && (
                          <span className="text-[10px] text-grigio/50">{step.percent}</span>
                        )}
                      </div>

                      <h3 className="text-[20px] font-medium text-sabbia mb-2 leading-[1.3]">
                        {step.title}
                      </h3>
                      <p className="text-[14px] leading-[1.7] text-sabbia/70 font-light mb-3 max-w-[620px]">
                        {step.description}
                      </p>
                      {step.duration && (
                        <div className="text-[13px] text-oliva font-medium mb-3">{step.duration}</div>
                      )}
                      {step.next && (
                        <div className="text-[13px] text-sabbia/60 mb-3">{step.next}</div>
                      )}

                      {step.deliverables.length > 0 && (
                        <div className="border border-grigio/30 bg-carbone/50 p-5">
                          <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/70 mb-3">
                            {step.deliverablesLabel || content.deliverablesLabel}
                          </div>
                          <div className="space-y-2.5">
                            {step.deliverables.map((item, i) => (
                              <div
                                key={`${processId}-deliv-${index}-${i}`}
                                className="flex items-center gap-2.5 text-[13px] text-sabbia/70"
                              >
                                {item.done === false ? (
                                  <div className="w-4 h-4 border border-grigio/40 flex-shrink-0" />
                                ) : (
                                  <svg
                                    className="w-4 h-4 flex-shrink-0"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    aria-hidden
                                  >
                                    <rect
                                      x="0.5"
                                      y="0.5"
                                      width="15"
                                      height="15"
                                      fill="rgb(78, 88, 78)"
                                      stroke="rgb(78, 88, 78)"
                                      strokeWidth="1"
                                    />
                                    <path
                                      d="M4 8l2.5 2.5L12 5"
                                      stroke="rgb(232, 230, 220)"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                                <span>{item.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-grigio/20">
            <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light mb-4">
              {content.methodologyLabel}
            </div>
            <div className="text-[14px] text-sabbia/70 leading-relaxed mb-4">
              {content.methodologyText}
            </div>
            <div className="flex flex-wrap gap-3">
              {content.tools.map((tool) => (
                <div
                  key={tool}
                  className="px-3 py-1.5 border border-grigio/30 text-[11px] text-grigio/60"
                >
                  {tool}
                </div>
              ))}
            </div>

            {content.finalNudge && (
              <a
                href="#contact"
                className="inline-flex items-center px-2 py-1 mt-6 text-[13px] text-oliva hover:text-oliva/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 focus-visible:ring-offset-carbone transition-colors"
              >
                {content.finalNudge}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
