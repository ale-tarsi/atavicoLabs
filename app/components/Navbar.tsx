'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const t = useTranslations('navbar');
  const locale = useLocale();

  // Pre-mount menu on first render to avoid layout shift
  useEffect(() => {
    setMenuMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = y > 20;
          setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open - iOS Safari compatible
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full overflow-hidden ${
        isScrolled ? 'backdrop-blur-2xl bg-bg-primary/90 border-b border-text-ghost/10' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-24">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo + Metadata */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-0">
              <Link 
                href="/" 
                className="text-[22px] font-normal tracking-[0.08em] text-text-primary hover:text-accent-primary transition-colors duration-300 uppercase"
              >
                ATAVICOLABS
              </Link>
              <span className="hidden lg:block text-[9px] uppercase font-light tracking-[0.2em]" style={{ color: 'rgba(255, 255, 255, 0.50)' }}>
                DIGITAL PRODUCT STUDIO
              </span>
            </div>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href={`/${locale}/sprint`}
              className="text-[13px] font-medium tracking-wide text-sabbia/90 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary transition-colors duration-300"
            >
              {t('sprint')}
            </Link>
            <a
              href="#about"
              className="text-[13px] font-medium tracking-wide text-sabbia/90 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary transition-colors duration-300"
            >
              {t('about')}
            </a>
            <a
              href="#portfolio"
              className="text-[13px] font-medium tracking-wide text-sabbia/90 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary transition-colors duration-300"
            >
              {t('work')}
            </a>
            <a
              href="#process"
              className="text-[13px] font-medium tracking-wide text-sabbia/90 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary transition-colors duration-300"
            >
              {t('process')}
            </a>
            <a
              href="#blog"
              className="text-[13px] font-medium tracking-wide text-sabbia/90 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary transition-colors duration-300"
            >
              {t('insights')}
            </a>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium tracking-[0.02em] transition-all duration-300 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              style={{ color: '#E8E5DC' }}
            >
              {t('contact')}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 border text-[13px] font-medium tracking-[0.02em] transition-all duration-300 hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              style={{ 
                borderColor: 'rgba(157, 154, 142, 0.25)',
                color: '#E8E5DC'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#5A6D5A';
                e.currentTarget.style.backgroundColor = 'rgba(90, 109, 90, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(157, 154, 142, 0.25)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {t('bookingCTA')}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 -mr-2 hover:opacity-70 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-[24px] h-[10px] flex flex-col justify-between">
              <span 
                className="block h-[2px] w-full rounded-full transition-all duration-300"
                style={{ backgroundColor: '#ECECE7' }}
              />
              <span 
                className="block h-[2px] w-full rounded-full transition-all duration-300"
                style={{ backgroundColor: '#ECECE7' }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuMounted && (
        <div 
          id="mobile-menu"
          className={`fixed inset-0 z-[100] lg:hidden ${
            menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          aria-hidden={!menuOpen}
        >
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${
              menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Content */}
          <div 
            className={`fixed inset-0 h-full flex flex-col bg-carbone safe-area-inset transition-all duration-300 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
            style={{
              paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
              paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
              paddingRight: 'max(1.5rem, env(safe-area-inset-right))'
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-12">
              {/* Logo */}
              <div className="flex flex-col gap-0">
                <Link 
                  href={`/${locale}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-[22px] font-normal tracking-[0.08em] uppercase text-sabbia hover:text-oliva transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  ATAVICOLABS
                </Link>
                <span className="text-[9px] uppercase font-light tracking-[0.2em] text-sabbia/50">
                  DIGITAL PRODUCT STUDIO
                </span>
              </div>

              {/* Close Button - X animato */}
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 -mr-2 -mt-2 hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
                aria-label="Close menu"
                tabIndex={menuOpen ? 0 : -1}
              >
                <div className="w-[24px] h-[24px] relative flex items-center justify-center">
                  <span 
                    className="absolute block h-[2px] w-full rounded-full bg-sabbia"
                    style={{ 
                      transform: 'rotate(45deg)',
                      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  <span 
                    className="absolute block h-[2px] w-full rounded-full bg-sabbia"
                    style={{ 
                      transform: 'rotate(-45deg)',
                      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col" style={{ gap: '2rem' }}>
              <Link
                href={`/${locale}/sprint`}
                onClick={() => setMenuOpen(false)}
                className="text-[32px] font-light tracking-[-0.02em] text-sabbia hover:text-oliva transition-colors duration-200"
                tabIndex={menuOpen ? 0 : -1}
              >
                {t('sprint')}
              </Link>
              
              <a
                href={`/${locale}#about`}
                onClick={() => setMenuOpen(false)}
                className="text-[32px] font-light tracking-[-0.02em] text-sabbia hover:text-oliva transition-colors duration-200"
                tabIndex={menuOpen ? 0 : -1}
              >
                {t('about')}
              </a>
              
              <a
                href={`/${locale}#portfolio`}
                onClick={() => setMenuOpen(false)}
                className="text-[32px] font-light tracking-[-0.02em] text-sabbia hover:text-oliva transition-colors duration-200"
                tabIndex={menuOpen ? 0 : -1}
              >
                {t('work')}
              </a>
              
              <a
                href={`/${locale}#process`}
                onClick={() => setMenuOpen(false)}
                className="text-[32px] font-light tracking-[-0.02em] text-sabbia hover:text-oliva transition-colors duration-200"
                tabIndex={menuOpen ? 0 : -1}
              >
                {t('process')}
              </a>
              
              <a
                href={`/${locale}#blog`}
                onClick={() => setMenuOpen(false)}
                className="text-[32px] font-light tracking-[-0.02em] text-sabbia hover:text-oliva transition-colors duration-200"
                tabIndex={menuOpen ? 0 : -1}
              >
                {t('insights')}
              </a>

              {/* Divider */}
              <div className="h-px bg-grigio/20" style={{ margin: '1rem 0' }} />

              {/* Booking CTA Button */}
              <a
                href={`/${locale}#contact`}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-oliva/40 text-[15px] font-medium tracking-[0.02em] text-sabbia hover:border-oliva hover:bg-oliva/10 transition-all duration-200"
                tabIndex={menuOpen ? 0 : -1}
              >
                {t('bookingCTA')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Divider */}
              <div className="h-px bg-grigio/20" style={{ margin: '0.5rem 0' }} />

              {/* Contact Button */}
              <a
                href={`/${locale}#contact`}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-sabbia/20 text-[15px] font-normal tracking-[0.02em] text-sabbia hover:border-oliva hover:bg-oliva/10 transition-all duration-200"
                tabIndex={menuOpen ? 0 : -1}
              >
                {t('contact')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </nav>

            {/* Footer: Language Switcher + Meta */}
            <div className="pt-6 border-t border-grigio/20 space-y-4">
              <LanguageSwitcher inline />
              
              <div className="flex items-center gap-2 text-[11px] font-light text-sabbia/60">
                <span className="text-oliva">●</span>
                <span>Remote-first</span>
                <span className="text-oliva">●</span>
                <span>{locale === 'it' ? 'Dal 2017' : 'Since 2017'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
