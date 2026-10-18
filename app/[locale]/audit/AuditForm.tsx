'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ArrowRight, Globe, Mail, Loader2, Zap } from 'lucide-react';

type Step = 'url' | 'email' | 'loading';

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color =
    value >= 90 ? 'bg-green-500' :
    value >= 50 ? 'bg-yellow-500' :
    'bg-red-500';

  return (
    <div className="flex items-center gap-3">
      <span className="text-text-tertiary text-body-sm w-28 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-text-secondary text-body-sm w-8 text-right">{value}</span>
    </div>
  );
}

export default function AuditForm() {
  const t = useTranslations('audit');
  const locale = useLocale();
  const router = useRouter();

  const [step, setStep] = useState<Step>('url');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [urlError, setUrlError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');

  function isValidUrl(str: string): boolean {
    try {
      const u = new URL(str.startsWith('http') ? str : `https://${str}`);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  }

  function normalizeUrl(str: string): string {
    return str.startsWith('http') ? str : `https://${str}`;
  }

  function handleUrlSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizeUrl(url.trim());
    if (!isValidUrl(url.trim())) {
      setUrlError(t('form.urlError'));
      return;
    }
    setUrl(normalized);
    setUrlError('');
    setStep('email');
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError(t('form.emailError'));
      return;
    }
    setEmailError('');
    setApiError('');
    setStep('loading');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email: email.trim(), locale, website: honeypot }),
      });

      const data = await res.json();
      if (!res.ok || !data.reportId) {
        setApiError(data.error ?? 'Unknown error');
        setStep('email');
        return;
      }

      router.push(`/${locale}/audit/${data.reportId}`);
    } catch {
      setApiError('Network error. Please try again.');
      setStep('email');
    }
  }

  return (
    <main className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <div className="border-b border-warm-subtle/40 px-6 py-4">
        <a href={`/${locale}`} className="text-text-tertiary text-body-sm hover:text-text-primary transition-colors">
          ← AtavicoLabs
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-xl">

          {/* Hero text */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-accent-primary/40 bg-accent-subtle/30">
              <Zap className="w-3.5 h-3.5 text-accent-hover" />
              <span className="text-label text-accent-hover uppercase tracking-wider">
                {t('hero.eyebrow')}
              </span>
            </div>
            <h1 className="font-display text-h1 text-text-primary mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-body text-text-secondary max-w-md mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Step 1: URL */}
          {step === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <label className="block text-label text-text-tertiary uppercase tracking-wider mb-2">
                  {t('form.urlLabel')}
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t('form.urlPlaceholder')}
                    className="w-full bg-bg-secondary border border-warm-subtle/60 rounded-xl pl-11 pr-4 py-4 text-text-primary text-body placeholder:text-text-muted focus:outline-none focus:border-accent-primary/70 transition-colors"
                    autoFocus
                  />
                </div>
                {urlError && (
                  <p className="mt-2 text-body-sm text-red-400">{urlError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-hover text-text-primary font-display text-button py-4 px-6 rounded-xl transition-colors duration-200"
              >
                {t('form.nextStep')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 2: Email gate */}
          {step === 'email' && (
            <div className="space-y-6">
              {/* URL recap */}
              <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary rounded-xl border border-warm-subtle/40">
                <Globe className="w-4 h-4 text-accent-hover shrink-0" />
                <span className="text-body-sm text-text-secondary truncate">{url}</span>
                <button
                  onClick={() => setStep('url')}
                  className="ml-auto text-body-sm text-text-muted hover:text-text-tertiary transition-colors shrink-0"
                >
                  Edit
                </button>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {/* Honeypot: hidden from real users, bots fill it — rejected server-side */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                />
                <div>
                  <label className="block text-label text-text-tertiary uppercase tracking-wider mb-2">
                    {t('form.emailLabel')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('form.emailPlaceholder')}
                      className="w-full bg-bg-secondary border border-warm-subtle/60 rounded-xl pl-11 pr-4 py-4 text-text-primary text-body placeholder:text-text-muted focus:outline-none focus:border-accent-primary/70 transition-colors"
                      autoFocus
                    />
                  </div>
                  <p className="mt-2 text-body-sm text-text-muted">{t('form.emailHint')}</p>
                  {emailError && (
                    <p className="mt-1 text-body-sm text-red-400">{emailError}</p>
                  )}
                  {apiError && (
                    <p className="mt-1 text-body-sm text-red-400">{apiError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-hover text-text-primary font-display text-button py-4 px-6 rounded-xl transition-colors duration-200"
                >
                  {t('form.submit')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Loading */}
          {step === 'loading' && (
            <div className="text-center space-y-6 py-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-accent-subtle animate-spin border-t-accent-primary" />
                  <Zap className="absolute inset-0 m-auto w-6 h-6 text-accent-hover" />
                </div>
              </div>
              <div>
                <p className="text-body text-text-primary font-display">{t('form.analyzing')}</p>
                <p className="text-body-sm text-text-tertiary mt-2">{t('form.analyzingHint')}</p>
              </div>

              {/* Animated steps */}
              <div className="text-left space-y-3 max-w-xs mx-auto">
                {[
                  'Running Lighthouse audit…',
                  'Extracting Core Web Vitals…',
                  'AI analysis with Claude…',
                  'Generating report…',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-body-sm text-text-muted">
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
