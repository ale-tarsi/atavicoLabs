import type { Metadata } from 'next';
import { ArrowRight, FileText, Mail, Phone, Table2, Users, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Reveal from '@/app/components/Reveal';
import AnalysisFlow from '@/app/components/AnalysisFlow';
import AnalysisBars from '@/app/components/AnalysisBars';
import { getCalendlyUrl } from '@/app/constants/links';

const BASE_URL = 'https://atavicolabs.com';
const NS = 'exampleAnalysis';

type Item = { text: string };
type Field = { k: string; v: string; flag?: boolean };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: `${NS}.meta` });
  const url = `${BASE_URL}/${locale}/esempio-analisi`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        it: `${BASE_URL}/it/esempio-analisi`,
        en: `${BASE_URL}/en/esempio-analisi`,
      },
    },
    openGraph: { title: `${t('title')} — AtavicoLabs`, description: t('description'), type: 'website', url },
  };
}

function Block({ title, icon: Icon, items }: { title: string; icon: LucideIcon; items: Item[] }) {
  return (
    <div className="border border-grigio/20 bg-grafite/30 p-6">
      <Icon size={22} className="text-oliva mb-3" aria-hidden="true" />
      <h3 className="text-[17px] font-medium text-sabbia mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.text} className="text-[15px] text-sabbia/70 font-light leading-snug">• {it.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function ExampleAnalysisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: NS });
  const stats = t.raw('stats') as { value: string; label: string }[];
  const bars = t.raw('time.bars') as { label: string; value: string; share: number }[];

  return (
    <>
      <Navbar />
      <main className="bg-carbone min-h-screen pt-28 lg:pt-32 pb-24">
        <article className="max-w-5xl mx-auto px-6">
          <div className="border-l-2 border-oliva pl-5 py-1 mb-10 max-w-2xl">
            <p className="text-[17px] text-sabbia leading-[1.6]">{t('deliverable')}</p>
            <p className="mt-1.5 text-[14px] text-sabbia/50">{t('notice')}</p>
          </div>

          <header>
            <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-3">{t('eyebrow')}</div>
            <h1 className="font-display text-[34px] lg:text-[48px] font-medium text-sabbia leading-[1.1] mb-4">
              {t('title')}
            </h1>
            <p className="text-[17px] text-sabbia/70 font-light max-w-2xl">{t('subtitle')}</p>
          </header>

          <Reveal className="mt-10">
            <div className="text-[12px] uppercase tracking-[0.12em] text-grigio/60 mb-4">
              {t('statsLabel')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-grigio/20 border border-grigio/20">
              {stats.map((s) => (
                <div key={s.label} className="bg-carbone px-5 py-4">
                  <div className="text-[24px] font-medium text-sabbia leading-none">{s.value}</div>
                  <div className="mt-2 text-[13px] text-sabbia/55 font-light leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" className="mt-16">
            <AnalysisFlow
              today={t.raw('today') as { title: string; steps: { label: string; caption: string }[] }}
              after={t.raw('after') as { title: string; steps: { label: string; caption: string }[] }}
              legend={t.raw('legend') as { manual: string; auto: string; person: string }}
            />
          </Reveal>

          <Reveal as="section" className="mt-16">
            <h2 className="text-[22px] font-medium text-sabbia mb-6">{t('transform.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
              <div className="border border-grigio/20 bg-grafite/30 p-6">
                <div className="flex items-center gap-2 text-grigio/70 text-[12px] uppercase tracking-[0.12em] mb-4">
                  <Mail size={16} aria-hidden="true" /> {t('transform.emailLabel')}
                </div>
                <div className="text-[13px] text-sabbia/50 mb-1">{t('transform.from')}</div>
                <div className="text-[15px] font-medium text-sabbia mb-3">{t('transform.subject')}</div>
                <p className="text-[15px] leading-[1.7] text-sabbia/80 font-light">{t('transform.body')}</p>
                <p className="mt-4 text-[15px] text-sabbia/60 font-light">{t('transform.sign')}</p>
              </div>
              <div className="flex items-center justify-center text-oliva">
                <ArrowRight size={28} className="rotate-90 md:rotate-0" aria-hidden="true" />
              </div>
              <div className="border border-oliva/40 bg-oliva/5 p-6">
                <div className="flex items-center gap-2 text-oliva text-[12px] uppercase tracking-[0.12em] mb-4">
                  <Table2 size={16} aria-hidden="true" /> {t('transform.dataLabel')}
                </div>
                <dl className="divide-y divide-grigio/20">
                  {(t.raw('transform.fields') as Field[]).map((f) => (
                    <div key={f.k} className="flex justify-between gap-4 py-2.5 text-[14px]">
                      <dt className="text-sabbia/60">{f.k}</dt>
                      <dd className={f.flag ? 'text-sabbia font-medium text-right' : 'text-sabbia text-right'}>
                        {f.v}
                        {f.flag && (
                          <span className="ml-2 inline-block border border-sabbia/50 px-1.5 py-0.5 text-[11px] align-middle">
                            {t('transform.check')}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal as="section" className="mt-16 max-w-2xl">
            <h2 className="text-[22px] font-medium text-sabbia mb-6">{t('time.title')}</h2>
            <AnalysisBars bars={bars} />
            <p className="mt-5 text-[13px] text-sabbia/50">{t('time.note')}</p>
          </Reveal>

          <Reveal className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Block title={t('manual.title')} icon={Phone} items={t.raw('manual.items') as Item[]} />
            <Block title={t('needs.title')} icon={Users} items={t.raw('needs.items') as Item[]} />
          </Reveal>

          <Reveal as="section" className="mt-16 border border-oliva/30 bg-oliva/5 p-8 flex flex-col md:flex-row md:items-center gap-6 md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-oliva text-[13px] uppercase tracking-[0.15em] mb-2">
                <FileText size={16} aria-hidden="true" /> {t('next.title')}
              </div>
              <p className="text-[17px] text-sabbia max-w-xl">{t('next.text')}</p>
            </div>
            <a
              href={getCalendlyUrl(locale as 'it' | 'en')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-oliva text-carbone text-[14px] font-medium hover:bg-oliva/90 transition-all whitespace-nowrap"
            >
              {t('cta.button')} <ArrowRight size={16} />
            </a>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
