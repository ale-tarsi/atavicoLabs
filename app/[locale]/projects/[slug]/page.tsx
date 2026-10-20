import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FlowDiagram from '@/app/components/FlowDiagram';
import { CASE_STUDIES, getCaseStudy, type Locale } from '@/app/constants/caseStudies';
import { locales } from '@/src/i18n/config';

const BASE_URL = 'https://atavicolabs.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CASE_STUDIES.map((c) => ({ locale, slug: c.slug }))
  );
}

const UI = {
  it: {
    back: 'Tutti i lavori',
    role: 'Ruolo',
    status: 'Stato',
    stack: 'Tecnologie',
    challenge: 'La sfida',
    solution: 'La soluzione',
    flow: 'Come funziona',
    outcome: 'Risultato',
    ctaTitle: 'Hai un problema simile?',
    ctaText: 'Raccontami il flusso che ti fa perdere tempo: ti rispondo entro un giorno lavorativo.',
    cta: 'Contattami',
  },
  en: {
    back: 'All work',
    role: 'Role',
    status: 'Status',
    stack: 'Stack',
    challenge: 'The challenge',
    solution: 'The solution',
    flow: 'How it works',
    outcome: 'Outcome',
    ctaTitle: 'Have a similar problem?',
    ctaText: 'Tell me about the workflow that costs you time. I reply within one business day.',
    cta: 'Get in touch',
  },
} as const;

type Params = { locale: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const c = study.content[(locale as Locale) in study.content ? (locale as Locale) : 'it'];
  const url = `${BASE_URL}/${locale}/projects/${slug}`;

  return {
    title: c.title,
    description: c.summary,
    alternates: {
      canonical: url,
      languages: {
        it: `${BASE_URL}/it/projects/${slug}`,
        en: `${BASE_URL}/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: `${c.title} — AtavicoLabs`,
      description: c.summary,
      type: 'article',
      url,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const lang: Locale = locale === 'en' ? 'en' : 'it';
  const c = study.content[lang];
  const ui = UI[lang];

  return (
    <>
      <Navbar />
      <main className="bg-carbone min-h-screen pt-20">
        <article className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
          <Link
            href={`/${lang}#portfolio`}
            className="text-[13px] text-grigio hover:text-oliva transition-colors"
          >
            ← {ui.back}
          </Link>

          <header className="mt-10">
            <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4">
              {c.label}
            </div>
            <h1 className="font-display text-[36px] lg:text-[48px] font-medium text-sabbia leading-[1.1]">
              {c.title}
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] text-sabbia/70 font-light">
              {c.summary}
            </p>

            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-grigio/20 pt-6 text-[14px]">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-grigio/60 mb-1">{ui.role}</dt>
                <dd className="text-sabbia">{c.role}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-grigio/60 mb-1">{ui.status}</dt>
                <dd className="text-sabbia">{c.status}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-grigio/60 mb-1">{ui.stack}</dt>
                <dd className="text-sabbia">{study.stack.join(' · ')}</dd>
              </div>
            </dl>
          </header>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/illustrations/case-${slug}.svg`}
            alt=""
            aria-hidden="true"
            className="mt-12 w-full h-auto border border-grigio/20"
          />

          <section className="mt-16">
            <h2 className="text-[22px] font-medium text-sabbia mb-4">{ui.challenge}</h2>
            <p className="text-[16px] leading-[1.7] text-sabbia/70 font-light">{c.challenge}</p>
          </section>

          <section className="mt-12">
            <h2 className="text-[22px] font-medium text-sabbia mb-4">{ui.solution}</h2>
            <p className="text-[16px] leading-[1.7] text-sabbia/70 font-light">{c.solution}</p>
          </section>

          <section className="mt-12">
            <h2 className="text-[22px] font-medium text-sabbia mb-6">{ui.flow}</h2>
            <FlowDiagram steps={c.flow} label={ui.flow} />
          </section>

          <section className="mt-12">
            <h2 className="text-[22px] font-medium text-sabbia mb-4">{ui.outcome}</h2>
            <ul className="space-y-3">
              {c.outcome.map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-[1.6] text-sabbia/70 font-light">
                  <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-oliva flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 border-t border-grigio/20 pt-12">
            <h2 className="text-[22px] font-medium text-sabbia mb-3">{ui.ctaTitle}</h2>
            <p className="text-[16px] text-sabbia/70 font-light mb-6">{ui.ctaText}</p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center px-8 py-4 bg-oliva text-carbone text-[15px] font-medium hover:bg-oliva/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
            >
              {ui.cta}
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
