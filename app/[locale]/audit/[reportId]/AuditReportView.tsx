'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  Globe,
  Share2,
  ArrowLeft,
  Zap,
  ExternalLink,
  Lock,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import type { AuditReport, AuditIssue } from '@/types/audit';

const GRADE_COLORS: Record<string, string> = {
  A: 'text-green-400 border-green-400/30 bg-green-400/10',
  B: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  C: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  D: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
  F: 'text-red-400 border-red-400/30 bg-red-400/10',
};

const PRIORITY_COLORS: Record<string, string> = {
  critical: 'text-red-400 bg-red-400/10 border-red-400/20',
  high: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  low: 'text-text-tertiary bg-bg-tertiary border-warm-subtle/40',
};

function ScoreGauge({ value, label }: { value: number; label: string }) {
  const color =
    value >= 90 ? '#22c55e' :
    value >= 50 ? '#eab308' :
    '#ef4444';

  const r = 30;
  const circ = 2 * Math.PI * r;
  const progress = (value / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#1C1D20" strokeWidth="6" />
          <circle
            cx="40" cy="40" r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={circ - progress}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-h3 text-text-primary">
          {value}
        </span>
      </div>
      <span className="text-body-sm text-text-tertiary text-center">{label}</span>
    </div>
  );
}

function CwvPill({
  label,
  value,
  unit,
  good,
}: {
  label: string;
  value: number | null;
  unit: string;
  good: boolean | null;
}) {
  if (value === null) return null;
  const statusColor =
    good === true ? 'text-green-400' :
    good === false ? 'text-red-400' :
    'text-yellow-400';

  return (
    <div className="flex flex-col gap-1 p-3 bg-bg-secondary rounded-xl border border-warm-subtle/40">
      <span className="text-label text-text-muted uppercase tracking-wider">{label}</span>
      <span className={`font-display text-h3 ${statusColor}`}>
        {value}
        <span className="text-body-sm text-text-muted ml-1">{unit}</span>
      </span>
    </div>
  );
}

function IssueCard({ issue, t }: { issue: AuditIssue; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="p-5 bg-bg-secondary rounded-xl border border-warm-subtle/40 space-y-3">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`text-label uppercase tracking-wider px-2 py-0.5 rounded-full border ${PRIORITY_COLORS[issue.priority]}`}
            >
              {t(`report.priorities.${issue.priority}`)}
            </span>
            <span className="text-body-sm text-text-muted">
              {t(`report.categories.${issue.category}`)}
            </span>
          </div>
          <h3 className="text-body text-text-primary font-display">{issue.title}</h3>
        </div>
      </div>
      <p className="text-body-sm text-text-secondary">{issue.description}</p>
      <div className="pt-2 border-t border-warm-subtle/30">
        <p className="text-body-sm text-accent-hover">→ {issue.recommendation}</p>
      </div>
    </div>
  );
}

// Blurred placeholder shown in preview mode for each detected issue
function BlurredIssueCard({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="relative p-5 bg-bg-secondary rounded-xl border border-warm-subtle/40 overflow-hidden">
      <div className="blur-sm select-none pointer-events-none space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-label uppercase tracking-wider px-2 py-0.5 rounded-full border text-red-400 bg-red-400/10 border-red-400/20">
            Critical
          </span>
          <span className="text-body-sm text-text-muted">Performance</span>
        </div>
        <div className="h-4 bg-warm-subtle/40 rounded w-3/4" />
        <div className="h-3 bg-warm-subtle/30 rounded w-full" />
        <div className="h-3 bg-warm-subtle/30 rounded w-5/6" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-primary/80 border border-warm-subtle/60">
          <Lock className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-body-sm text-text-tertiary">{t('report.unlock.blurredHint')}</span>
        </div>
      </div>
    </div>
  );
}

function UnlockBanner({
  reportId,
  locale,
  t,
}: {
  reportId: string;
  locale: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleUnlock() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/audit/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, locale }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        setError(data.error ?? 'Unexpected error');
        setLoading(false);
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-primary/30 bg-gradient-to-br from-accent-subtle/50 to-bg-secondary p-8">
      {/* decorative glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent-primary/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-accent-hover" />
            <span className="text-label text-accent-hover uppercase tracking-wider">
              {t('report.unlock.previewLabel')}
            </span>
          </div>
          <h2 className="font-display text-h2 text-text-primary mb-2">
            {t('report.unlock.bannerTitle')}
          </h2>
          <p className="text-body text-text-secondary max-w-md">
            {t('report.unlock.bannerDescription')}
          </p>
          {error && (
            <p className="mt-3 text-body-sm text-red-400">{error}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0">
          <button
            onClick={handleUnlock}
            disabled={loading}
            className="flex items-center gap-2 bg-accent-primary hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-text-primary font-display text-button py-4 px-8 rounded-xl transition-colors duration-200 whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('report.unlock.redirecting')}
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                {t('report.unlock.bannerCta')}
              </>
            )}
          </button>
          <p className="text-body-sm text-text-muted">Pagamento sicuro via Stripe</p>
        </div>
      </div>
    </div>
  );
}

function PaymentProcessingBanner({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl border border-green-400/30 bg-green-400/5">
      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-display text-body text-text-primary mb-1">
          {t('report.unlock.processingTitle')}
        </p>
        <p className="text-body-sm text-text-secondary">
          {t('report.unlock.processingDescription')}
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-1.5 text-body-sm text-text-muted hover:text-text-tertiary transition-colors shrink-0"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Aggiorna
      </button>
    </div>
  );
}

export default function AuditReportView({
  report,
  locale,
}: {
  report: AuditReport;
  locale: string;
}) {
  const t = useTranslations('audit');
  const searchParams = useSearchParams();
  const paymentJustCompleted = searchParams.get('payment') === 'success';

  function handleShare() {
    // Strip the ?payment=success param from the shared URL
    const url = new URL(window.location.href);
    url.searchParams.delete('payment');
    navigator.clipboard.writeText(url.toString());
  }

  if (report.status === 'error') {
    return (
      <main className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="font-display text-h2 text-text-primary mb-3">{t('report.errorTitle')}</h1>
          <p className="text-body text-text-secondary mb-8">{t('report.errorHint')}</p>
          <Link
            href={`/${locale}/audit`}
            className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-hover text-text-primary font-display text-button py-3 px-6 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('report.retry')}
          </Link>
        </div>
      </main>
    );
  }

  const ps = report.pagespeedData;
  if (!ps) return null;

  const isUnlocked = report.unlocked && report.status === 'done';
  const ai = report.aiReport;

  // If Stripe redirected back with ?payment=success but the webhook hasn't
  // finished yet (report still locked), show the processing banner.
  const showProcessingBanner = paymentJustCompleted && !isUnlocked;

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="border-b border-warm-subtle/40 px-6 py-4 flex items-center justify-between">
        <Link
          href={`/${locale}/audit`}
          className="flex items-center gap-2 text-text-tertiary text-body-sm hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('report.backToAudit')}
        </Link>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-text-muted text-body-sm hover:text-text-tertiary transition-colors"
          title={t('report.shareHint')}
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      <div className="max-w-content mx-auto px-6 py-12 space-y-12">

        {/* Payment processing notice */}
        {showProcessingBanner && <PaymentProcessingBanner t={t} />}

        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-text-muted" />
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-text-tertiary hover:text-text-secondary transition-colors flex items-center gap-1"
              >
                {new URL(report.url).hostname}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h1 className="font-display text-display-sm text-text-primary mb-2">
              Website Audit Report
            </h1>
            <p className="text-body-sm text-text-muted">
              {t('report.analyzedOn')}{' '}
              {new Date(report.createdAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Overall grade — only shown when unlocked */}
          {isUnlocked && ai && (
            <div
              className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-2 font-display shrink-0 ${GRADE_COLORS[ai.overallGrade]}`}
            >
              <span className="text-label uppercase tracking-wider opacity-70">
                {t('report.grade')}
              </span>
              <span className="text-display-md leading-none">{ai.overallGrade}</span>
            </div>
          )}
        </div>

        {/* ── SCORES (always visible) ─────────────────────────────── */}
        <section>
          <h2 className="font-display text-h3 text-text-primary mb-6">
            {t('report.scores')}
          </h2>
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            <ScoreGauge value={ps.scores.performance} label={t('report.performance')} />
            <ScoreGauge value={ps.scores.seo} label={t('report.seo')} />
            <ScoreGauge value={ps.scores.accessibility} label={t('report.accessibility')} />
          </div>
        </section>

        {/* ── CORE WEB VITALS (always visible) ───────────────────── */}
        <section>
          <h2 className="font-display text-h3 text-text-primary mb-4">
            {t('report.cwv')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <CwvPill label="LCP" value={ps.coreWebVitals.lcp} unit="ms"
              good={ps.coreWebVitals.lcp != null ? ps.coreWebVitals.lcp <= 2500 : null} />
            <CwvPill label="CLS" value={ps.coreWebVitals.cls} unit=""
              good={ps.coreWebVitals.cls != null ? ps.coreWebVitals.cls <= 0.1 : null} />
            <CwvPill label="FCP" value={ps.coreWebVitals.fcp} unit="ms"
              good={ps.coreWebVitals.fcp != null ? ps.coreWebVitals.fcp <= 1800 : null} />
            <CwvPill label="TTFB" value={ps.coreWebVitals.ttfb} unit="ms"
              good={ps.coreWebVitals.ttfb != null ? ps.coreWebVitals.ttfb <= 800 : null} />
            <CwvPill label="TBT" value={ps.coreWebVitals.tbt} unit="ms"
              good={ps.coreWebVitals.tbt != null ? ps.coreWebVitals.tbt <= 200 : null} />
          </div>
        </section>

        {/* ── UNLOCK BANNER (preview mode only) ──────────────────── */}
        {!isUnlocked && !showProcessingBanner && (
          <UnlockBanner reportId={report.id} locale={locale} t={t} />
        )}

        {/* ── ISSUES ─────────────────────────────────────────────── */}
        <section>
          <h2 className="font-display text-h3 text-text-primary mb-4">
            {t('report.issues')}{' '}
            ({isUnlocked && ai ? ai.issues.length : ps.topIssues.length})
          </h2>

          {isUnlocked && ai ? (
            <div className="space-y-4">
              {ai.issues.map((issue, i) => (
                <IssueCard key={i} issue={issue} t={t} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Show count label */}
              <p className="text-body-sm text-text-muted">
                {ps.topIssues.length} {t('report.unlock.issuesFound')}
              </p>
              {/* Render blurred placeholders equal to detected issues count */}
              {ps.topIssues.map((_, i) => (
                <BlurredIssueCard key={i} t={t} />
              ))}
            </div>
          )}
        </section>

        {/* ── AI SUMMARY + QUICK WINS (unlocked only) ────────────── */}
        {isUnlocked && ai && (
          <>
            <section className="p-6 bg-bg-secondary rounded-2xl border border-warm-subtle/40">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-accent-hover" />
                <h2 className="font-display text-h3 text-text-primary">{t('report.summary')}</h2>
              </div>
              <p className="text-body text-text-secondary leading-relaxed">{ai.summary}</p>
            </section>

            {ai.quickWins.length > 0 && (
              <section>
                <h2 className="font-display text-h3 text-text-primary mb-4">
                  {t('report.quickWins')}
                </h2>
                <ul className="space-y-3">
                  {ai.quickWins.map((win, i) => (
                    <li key={i} className="flex items-start gap-3 text-body text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-accent-hover shrink-0 mt-0.5" />
                      {win}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* CTA */}
            <section className="p-8 bg-accent-subtle/40 rounded-2xl border border-accent-primary/20 text-center">
              <p className="text-body text-text-secondary mb-6 max-w-lg mx-auto">{ai.cta}</p>
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-hover text-text-primary font-display text-button py-3 px-6 rounded-xl transition-colors"
              >
                {t('report.cta')}
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          </>
        )}

      </div>
    </main>
  );
}
