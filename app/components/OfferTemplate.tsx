'use client';

import OfferSummaryCard from './OfferSummaryCard';
import OfferOutcomes from './OfferOutcomes';
import OfferIncludesBoundaries from './OfferIncludesBoundaries';
import OfferUseCasesGrid from './OfferUseCasesGrid';
import OfferProcessTimeline from './OfferProcessTimeline';
import OfferFAQ from './OfferFAQ';
import OfferFinalCTA from './OfferFinalCTA';
import OfferSectionWrap from './OfferSectionWrap';
import OfferSectionHeading from './OfferSectionHeading';

type HeroProps = {
  eyebrow?: string;
  title: string;
  promise: string;
  bullets: string[];
};

type SummaryProps = {
  priceRange: string;
  priceNote?: string;
  timeline: string;
  timelineLabel?: string;
  priceLabel?: string;
  note?: string;
  ctaText: string;
  ctaHref: string;
};

type OutcomeItem = {
  title: string;
  description: string;
  bullets: string[];
};

type UseCase = {
  title: string;
  output: string;
  tools: string[];
};

type Step = {
  dayRange: string;
  title: string;
  description: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type FinalCta = {
  title: string;
  bullets: string[];
  note?: string;
  ctaText: string;
  ctaHref: string;
};

type OfferTemplateProps = {
  hero: HeroProps;
  summary: SummaryProps;
  outcomes: { title: string; items: OutcomeItem[] };
  include: { title: string; items: string[] };
  boundaries: { title: string; items: string[] };
  useCases: { title: string; items: UseCase[] };
  process: { title: string; steps: Step[] };
  faq: { title: string; items: FAQItem[] };
  finalCta: FinalCta;
  locale: string;
};

export default function OfferTemplate({
  hero,
  summary,
  outcomes,
  include,
  boundaries,
  useCases,
  process,
  faq,
  finalCta,
  locale,
}: OfferTemplateProps) {
  return (
    <main className="bg-carbone min-h-screen pt-20">
      {/* Hero: two-column with sticky summary on desktop */}
      <section className="px-6 lg:px-16 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.35fr_0.9fr] gap-10 lg:gap-14 items-start">
          <div className="order-1 space-y-10 lg:space-y-14">
            <div className="space-y-6 border-b border-grigio/15 pb-8">
              {hero.eyebrow && (
                <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/70">
                  {hero.eyebrow}
                </div>
              )}
              <h1 className="text-[36px] lg:text-[48px] font-medium text-sabbia leading-[1.1]">
                {hero.title}
              </h1>
              <p className="text-[18px] lg:text-[22px] text-sabbia/85 leading-relaxed">{hero.promise}</p>
              <ul className="space-y-3 text-[14px] text-sabbia/80">
                {hero.bullets.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-oliva mt-[2px]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile summary (non-sticky) */}
            <div className="mt-8 lg:hidden">
              <OfferSummaryCard
                priceRange={summary.priceRange}
                priceNote={summary.priceNote}
                timeline={summary.timeline}
                timelineLabel={summary.timelineLabel}
                priceLabel={summary.priceLabel}
                note={summary.note}
                ctaText={summary.ctaText}
                ctaHref={summary.ctaHref}
                locale={locale}
              />
            </div>
          </div>

          {/* Desktop sticky summary */}
          <aside className="order-2 lg:sticky lg:top-28 hidden lg:block h-full">
            <OfferSummaryCard
              priceRange={summary.priceRange}
              priceNote={summary.priceNote}
              timeline={summary.timeline}
              timelineLabel={summary.timelineLabel}
              priceLabel={summary.priceLabel}
              note={summary.note}
              ctaText={summary.ctaText}
              ctaHref={summary.ctaHref}
              locale={locale}
            />
          </aside>
        </div>
      </section>

      {/* Main content: single centered column */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="mx-auto w-full max-w-7xl space-y-12 lg:space-y-16">
          <section>
            <OfferSectionWrap>
              <OfferOutcomes title={outcomes.title} items={outcomes.items} />
            </OfferSectionWrap>
          </section>

          <section>
            <OfferSectionWrap>
              <OfferIncludesBoundaries
                include={{ title: include.title, items: include.items }}
                boundaries={{ title: boundaries.title, items: boundaries.items, tone: 'negative' }}
                sectionTitle={`${include.title} / ${boundaries.title}`}
              />
            </OfferSectionWrap>
          </section>

          <section>
            <OfferSectionWrap>
              <OfferUseCasesGrid title={useCases.title} items={useCases.items} />
            </OfferSectionWrap>
          </section>

          <section>
            <OfferSectionWrap>
              <OfferProcessTimeline
                title={process.title}
                steps={process.steps}
                rightCard={
                  process.steps.length
                    ? {
                        title: include.title,
                        bullets: include.items,
                      }
                    : undefined
                }
              />
            </OfferSectionWrap>
          </section>

          <section className="border-t border-grigio/20 pt-12 lg:pt-16">
            <OfferSectionWrap>
              <div className="space-y-6">
                <OfferSectionHeading title={faq.title} />
                <OfferFAQ items={faq.items} />
              </div>
            </OfferSectionWrap>
          </section>
        </div>
      </section>

      {/* Final CTA */}
      <OfferFinalCTA
        title={finalCta.title}
        bullets={finalCta.bullets}
        ctaText={finalCta.ctaText}
        ctaHref={finalCta.ctaHref}
        note={finalCta.note}
        locale={locale}
      />
    </main>
  );
}
