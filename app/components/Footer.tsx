'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useReveal } from '../hooks/useReveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const locale = useLocale();
  const { ref, isRevealed } = useReveal();

  return (
    <footer 
      ref={ref}
      className="relative bg-carbone py-20 px-6 lg:px-16 border-t border-grigio/20 w-full overflow-hidden"
    >
      <div className={`relative max-w-7xl mx-auto fade-up ${isRevealed ? 'revealed' : ''}`}>
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-16">
          
          {/* Column 1: Brand */}
          <div className="max-w-[280px]">
            <h3 className="text-[18px] font-medium text-sabbia mb-4 uppercase tracking-wider">
              {t('brand')}
            </h3>
            <p className="text-grigio text-[13px] leading-[1.7] opacity-70 mb-6">
              {t('description')}
            </p>
            <div className="text-[10px] font-mono text-grigio/60">
              Milano, Italia<br />
              45.4642° N, 9.1900° E
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-[14px] font-medium text-sabbia mb-4 uppercase tracking-wider">
              {locale === 'it' ? 'Offerte' : 'Offers'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/offers/ops-quick-win`} className="text-[13px] text-sabbia/70 hover:text-oliva transition-colors duration-300">
                  Ops Quick Win
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/offers/continuity-retainer`} className="text-[13px] text-sabbia/70 hover:text-oliva transition-colors duration-300">
                  Continuity Retainer
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/offers/product-build`} className="text-[13px] text-sabbia/70 hover:text-oliva transition-colors duration-300">
                  Product Build
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-[14px] font-medium text-sabbia mb-4 uppercase tracking-wider">
              {locale === 'it' ? 'Risorse' : 'Resources'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}#portfolio`} className="text-[13px] text-sabbia/70 hover:text-oliva transition-colors duration-300">
                  {t('quickLinks.portfolio')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#process`} className="text-[13px] text-sabbia/70 hover:text-oliva transition-colors duration-300">
                  {t('quickLinks.process')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#blog`} className="text-[13px] text-sabbia/70 hover:text-oliva transition-colors duration-300">
                  {locale === 'it' ? 'Approfondimenti' : 'Insights'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-[13px] text-sabbia/70 hover:text-oliva transition-colors duration-300">
                  {t('quickLinks.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4 font-light">Newsletter</h4>
            <p className="text-[12px] text-sabbia/60 leading-[1.6] mb-4">
              Aggiornamenti mensili su design, sviluppo e best practice.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="La tua email"
                className="w-full bg-grafite border border-grigio/20 px-3 py-2 text-[13px] text-sabbia placeholder:text-grigio/40 rounded-sm focus:border-oliva/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone transition-colors"
              />
              <button
                type="submit"
                className="w-full border border-sabbia/40 text-sabbia text-[11px] uppercase tracking-wider py-2 rounded-sm hover:border-oliva hover:text-oliva hover:bg-oliva/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
              >
                Iscriviti
              </button>
            </form>
            <p className="text-[10px] text-grigio/50 mt-3">
              Join 1,200+ subscribers
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-grigio/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <p className="text-grigio/50 text-[11px]">
              {t('copyright', {year: currentYear})}
            </p>
            <p className="text-[10px] font-mono text-grigio/30">
              Built with Next.js • Hosted on Vercel • P.IVA 01234567890
            </p>
          </div>
          <div className="flex gap-6 text-[11px]">
            <Link href="/privacy" className="text-grigio/60 hover:text-oliva transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone">
              {t('legal.privacy')}
            </Link>
            <Link href="/terms" className="text-grigio/60 hover:text-oliva transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone">
              {t('legal.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
