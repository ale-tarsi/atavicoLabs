import type { PageSpeedData } from '@/types/audit';

const PAGESPEED_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const CATEGORIES = ['performance', 'seo', 'accessibility', 'best-practices'];

function scorePercent(score: number | null): number {
  return score != null ? Math.round(score * 100) : 0;
}

function metricValue(audits: Record<string, any>, id: string): number | null {
  const audit = audits[id];
  if (!audit?.numericValue) return null;
  return Math.round(audit.numericValue);
}

export async function fetchPageSpeed(url: string): Promise<PageSpeedData> {
  const apiKey = process.env.PAGESPEED_API_KEY;
  const params = new URLSearchParams({
    url,
    strategy: 'mobile',
    ...(apiKey ? { key: apiKey } : {}),
    ...Object.fromEntries(CATEGORIES.map((c) => ['category', c])),
  });

  // URLSearchParams doesn't support duplicate keys — rebuild manually
  const qs = CATEGORIES.map((c) => `category=${c}`).join('&');
  const base = `${PAGESPEED_API}?url=${encodeURIComponent(url)}&strategy=mobile${apiKey ? `&key=${apiKey}` : ''}&${qs}`;

  const res = await fetch(base, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`PageSpeed API error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const cats = data.lighthouseResult?.categories ?? {};
  const audits = data.lighthouseResult?.audits ?? {};

  const scores = {
    performance: scorePercent(cats['performance']?.score ?? null),
    seo: scorePercent(cats['seo']?.score ?? null),
    accessibility: scorePercent(cats['accessibility']?.score ?? null),
    bestPractices: scorePercent(cats['best-practices']?.score ?? null),
  };

  const coreWebVitals = {
    lcp: metricValue(audits, 'largest-contentful-paint'),
    cls: audits['cumulative-layout-shift']?.numericValue != null
      ? Number(audits['cumulative-layout-shift'].numericValue.toFixed(3))
      : null,
    fcp: metricValue(audits, 'first-contentful-paint'),
    ttfb: metricValue(audits, 'server-response-time'),
    tti: metricValue(audits, 'interactive'),
    tbt: metricValue(audits, 'total-blocking-time'),
  };

  // Collect failing audits as top issues
  const issueAudits = Object.entries(audits)
    .filter(([, audit]: [string, any]) =>
      audit.score !== null && audit.score < 0.9 && audit.title && audit.description
    )
    .sort(([, a]: [string, any], [, b]: [string, any]) => (a.score ?? 1) - (b.score ?? 1))
    .slice(0, 12);

  const categoryMap: Record<string, string> = {
    performance: 'performance',
    seo: 'seo',
    accessibility: 'accessibility',
    'best-practices': 'best-practices',
  };

  const auditCategories: Record<string, string> = {};
  for (const [catKey, cat] of Object.entries(cats) as any[]) {
    for (const ref of cat.auditRefs ?? []) {
      auditCategories[ref.id] = catKey;
    }
  }

  const topIssues = issueAudits.map(([id, audit]: [string, any]) => ({
    id,
    title: audit.title,
    description: audit.description?.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') ?? '',
    score: audit.score != null ? Math.round(audit.score * 100) : null,
    category: (auditCategories[id] ?? 'performance') as any,
  }));

  // Extract SEO meta from the audit items
  const seoMeta = {
    title: audits['document-title']?.details?.items?.[0]?.node?.snippet ?? null,
    description: audits['meta-description']?.score === 1
      ? 'present'
      : null,
    hasCanonical: audits['canonical']?.score === 1,
    hasH1: audits['heading-order']?.score !== 0,
    headingCount: 0,
    imagesMissingAlt: audits['image-alt']?.details?.items?.length ?? 0,
    hasRobotsMeta: audits['robots-txt']?.score === 1,
    isIndexable: audits['is-crawlable']?.score === 1,
  };

  return { scores, coreWebVitals, topIssues, seoMeta };
}
