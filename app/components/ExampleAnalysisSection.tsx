import { ArrowRight, FileText, Mail, Phone, Table2, Users, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Reveal from './Reveal';
import AnalysisFlow from './AnalysisFlow';

const NS = 'exampleAnalysis';

type Item = { text: string };
type Field = { k: string; v: string; flag?: boolean };
type Step = { label: string; caption: string };

async function Block({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: LucideIcon;
  items: Item[];
}) {
  return (
    <div className="border border-grigio/20 bg-grafite/30 p-6">
      <Icon size={22} className="text-oliva mb-3" aria-hidden="true" />
      <h3 className="text-[17px] font-medium text-sabbia mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.text} className="text-[15px] text-sabbia/70 font-light leading-snug">
            • {it.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ExampleAnalysisSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: NS });

  return (
    <section id="esempio" className="mt-24 lg:mt-32 border-t border-grigio/20 pt-16 lg:pt-20">
      <Reveal>
        <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4">
          {t('sectionEyebrow')}
        </div>
        <h2 className="font-display text-[30px] lg:text-[38px] font-medium text-sabbia leading-[1.15] mb-6 max-w-2xl">
          {t('sectionTitle')}
        </h2>
        <div className="border-l-2 border-oliva pl-5 py-1 max-w-2xl">
          <p className="text-[16px] text-sabbia leading-[1.6]">{t('deliverable')}</p>
          <p className="mt-1.5 text-[14px] text-sabbia/50">{t('notice')}</p>
        </div>
        <p className="mt-8 text-[17px] text-sabbia/70 font-light max-w-2xl">
          <span className="text-sabbia">{t('title')}.</span> {t('subtitle')}
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <AnalysisFlow
          today={t.raw('today') as { title: string; steps: Step[] }}
          after={t.raw('after') as { title: string; steps: Step[] }}
          legend={t.raw('legend') as { manual: string; auto: string; person: string }}
        />
      </Reveal>

      <Reveal className="mt-16">
        <h3 className="text-[20px] font-medium text-sabbia mb-6">{t('transform.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          <div className="border border-grigio/20 bg-grafite/30 p-6">
            <div className="flex items-center gap-2 text-grigio/70 text-[12px] uppercase tracking-[0.12em] mb-4">
              <Mail size={16} aria-hidden="true" /> {t('transform.emailLabel')}
            </div>
            <div className="text-[13px] text-sabbia/50 mb-1">{t('transform.from')}</div>
            <div className="text-[15px] font-medium text-sabbia mb-3">{t('transform.subject')}</div>
            <p className="text-[15px] leading-[1.7] text-sabbia/80 font-light">
              {t('transform.body')}
            </p>
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

      <Reveal className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Block title={t('manual.title')} icon={Phone} items={t.raw('manual.items') as Item[]} />
        <Block title={t('needs.title')} icon={Users} items={t.raw('needs.items') as Item[]} />
      </Reveal>

      <Reveal className="mt-10 border border-grigio/20 bg-grafite/30 p-6 max-w-2xl">
        <div className="flex items-center gap-2 text-oliva text-[12px] uppercase tracking-[0.12em] mb-2">
          <FileText size={16} aria-hidden="true" /> {t('next.title')}
        </div>
        <p className="text-[16px] text-sabbia/80 font-light">{t('next.text')}</p>
      </Reveal>
    </section>
  );
}
