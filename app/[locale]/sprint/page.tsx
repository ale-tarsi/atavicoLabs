import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sprint.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

function SprintHero() {
  const t = useTranslations('sprint.hero');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 lg:px-24 pt-32 pb-20 bg-carbone overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23D3D1C8'/%3E%3C/svg%3E")`,
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center space-y-8">
        {/* Label */}
        <div className="text-[11px] uppercase tracking-[0.15em] text-oliva/70 font-light">
          {t('label')}
        </div>

        {/* Title */}
        <h1 className="font-display text-[48px] lg:text-[72px] font-medium text-sabbia leading-[1.1] tracking-tight">
          {t('title')}
        </h1>

        {/* Subtitle */}
        <p className="text-[18px] lg:text-[21px] leading-[1.6] text-sabbia/70 font-light max-w-3xl mx-auto">
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-oliva text-carbone text-[14px] font-medium tracking-wide hover:bg-oliva/90 transition-all duration-300 hover:translate-y-[-2px] w-full sm:w-auto justify-center"
          >
            {t('ctaPrimary')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#deliverables"
            className="inline-flex items-center gap-3 px-8 py-4 border border-sabbia/30 text-sabbia text-[14px] font-medium tracking-wide hover:border-oliva hover:text-oliva hover:bg-oliva/5 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            {t('ctaSecondary')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function SprintDeliverables() {
  const t = useTranslations('sprint.deliverables');
  const items = [0, 1, 2, 3, 4].map((i) => ({
    number: t(`items.${i}.number`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <section id="deliverables" className="relative py-24 lg:py-32 px-6 lg:px-24 bg-bg-primary border-t border-grigio/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-[36px] lg:text-[48px] font-medium text-text-primary leading-[1.15] mb-4">
            {t('title')}
          </h2>
          <p className="text-[17px] text-text-secondary/70 font-light leading-[1.6]">
            {t('subtitle')}
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-grigio/20 bg-carbone/30 p-8 lg:p-10 hover:border-oliva/40 transition-all duration-300 group"
            >
              {/* Number */}
              <div className="text-[14px] font-mono text-oliva/60 mb-4 group-hover:text-oliva transition-colors">
                {item.number}
              </div>

              {/* Title */}
              <h3 className="text-[24px] font-medium text-sabbia mb-3 leading-[1.3]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[15px] text-sabbia/60 leading-[1.65] font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SprintTimeline() {
  const t = useTranslations('sprint.timeline');
  const phases = [0, 1, 2, 3, 4].map((i) => ({
    days: t(`phases.${i}.days`),
    title: t(`phases.${i}.title`),
    description: t(`phases.${i}.description`),
  }));

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-24 bg-carbone border-t border-grigio/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-[36px] lg:text-[48px] font-medium text-sabbia leading-[1.15] mb-4">
            {t('title')}
          </h2>
          <p className="text-[17px] text-sabbia/70 font-light leading-[1.6]">
            {t('subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="border border-grigio/20 bg-grafite/20 p-6 lg:p-8 hover:border-oliva/30 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                {/* Days */}
                <div className="text-[13px] uppercase tracking-wider text-oliva/80 font-medium min-w-[140px]">
                  {phase.days}
                </div>

                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-[20px] font-medium text-sabbia mb-2 leading-[1.3]">
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-sabbia/60 leading-[1.65] font-light">
                    {phase.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SprintForWho() {
  const t = useTranslations('sprint.forWho');
  const isForItems = [0, 1, 2, 3].map((i) => t(`isFor.items.${i}`));
  const notForItems = [0, 1, 2, 3].map((i) => t(`notFor.items.${i}`));

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-24 bg-bg-primary border-t border-grigio/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="font-display text-[36px] lg:text-[48px] font-medium text-text-primary leading-[1.15] mb-16 text-center">
          {t('title')}
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Is For */}
          <div className="border border-oliva/30 bg-oliva/5 p-8 lg:p-10">
            <h3 className="text-[24px] font-medium text-oliva mb-6">
              {t('isFor.title')}
            </h3>
            <ul className="space-y-4">
              {isForItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-oliva text-[18px] mt-0.5">•</span>
                  <span className="text-[15px] text-text-secondary leading-[1.65] font-light">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For */}
          <div className="border border-grigio/30 bg-carbone/30 p-8 lg:p-10">
            <h3 className="text-[24px] font-medium text-sabbia/80 mb-6">
              {t('notFor.title')}
            </h3>
            <ul className="space-y-4">
              {notForItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-grigio text-[18px] mt-0.5">•</span>
                  <span className="text-[15px] text-sabbia/60 leading-[1.65] font-light">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SprintPricing() {
  const t = useTranslations('sprint.pricing');
  const sprintIncludes = [0, 1, 2, 3, 4].map((i) => t(`sprint.includes.${i}`));
  const careIncludes = [0, 1, 2, 3].map((i) => t(`care.includes.${i}`));

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-24 bg-carbone border-t border-grigio/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="font-display text-[36px] lg:text-[48px] font-medium text-sabbia leading-[1.15] mb-16 text-center">
          {t('title')}
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sprint Package */}
          <div className="border-2 border-oliva/40 bg-grafite/30 p-8 lg:p-10">
            <div className="mb-6">
              <div className="text-[13px] uppercase tracking-wider text-oliva/70 mb-3">
                {t('sprint.label')}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[48px] font-medium text-oliva">{t('sprint.price')}</span>
                <span className="text-[16px] text-sabbia/60">{t('sprint.vat')}</span>
              </div>
              <p className="text-[14px] text-sabbia/70 leading-[1.6]">
                {t('sprint.description')}
              </p>
            </div>

            <div className="border-t border-grigio/20 pt-6 mt-6">
              <ul className="space-y-3">
                {sprintIncludes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-oliva mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[14px] text-sabbia/80 leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Care Plan */}
          <div className="border border-grigio/30 bg-grafite/20 p-8 lg:p-10">
            <div className="mb-6">
              <div className="text-[13px] uppercase tracking-wider text-sabbia/60 mb-3">
                {t('care.label')}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[48px] font-medium text-sabbia">{t('care.price')}</span>
                <span className="text-[16px] text-sabbia/60">{t('care.period')}</span>
              </div>
              <p className="text-[14px] text-sabbia/70 leading-[1.6]">
                {t('care.description')}
              </p>
            </div>

            <div className="border-t border-grigio/20 pt-6 mt-6">
              <ul className="space-y-3">
                {careIncludes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-sabbia/60 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[14px] text-sabbia/80 leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SprintFAQ() {
  const t = useTranslations('sprint.faq');
  const items = [0, 1, 2, 3, 4, 5].map((i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-24 bg-bg-primary border-t border-grigio/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="font-display text-[36px] lg:text-[48px] font-medium text-text-primary leading-[1.15] mb-16">
          {t('title')}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="border-b border-grigio/20 pb-8">
              <h3 className="text-[18px] lg:text-[20px] font-medium text-text-primary mb-3 leading-[1.4]">
                {item.question}
              </h3>
              <p className="text-[15px] text-text-secondary/70 leading-[1.7] font-light">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SprintFinalCTA() {
  const t = useTranslations('sprint.finalCta');

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-24 bg-carbone border-t border-grigio/10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="font-display text-[36px] lg:text-[48px] font-medium text-sabbia leading-[1.15]">
          {t('title')}
        </h2>

        <p className="text-[17px] lg:text-[19px] text-sabbia/70 leading-[1.65] font-light max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="pt-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-oliva text-carbone text-[15px] font-medium tracking-wide hover:bg-oliva/90 transition-all duration-300 hover:translate-y-[-2px]"
          >
            {t('cta')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <p className="text-[13px] text-sabbia/50 font-light pt-4">
          {t('note')}
        </p>
      </div>
    </section>
  );
}

export default function SprintPage() {
  return (
    <main className="relative min-h-screen bg-bg-primary">
      <Navbar />
      <SprintHero />
      <SprintDeliverables />
      <SprintTimeline />
      <SprintForWho />
      <SprintPricing />
      <SprintFAQ />
      <SprintFinalCTA />
      <Footer />
    </main>
  );
}
