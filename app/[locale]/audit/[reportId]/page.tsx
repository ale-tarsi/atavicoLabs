import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { AuditReport } from '@/types/audit';
import AuditReportView from './AuditReportView';

async function fetchReport(reportId: string): Promise<AuditReport | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atavicolabs.com';
  const res = await fetch(`${baseUrl}/api/audit/${reportId}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; reportId: string }>;
}) {
  const { locale, reportId } = await params;
  const t = await getTranslations({ locale, namespace: 'audit.meta' });
  const report = await fetchReport(reportId);
  const title = report
    ? `Audit — ${new URL(report.url).hostname}`
    : t('title');

  return {
    title,
    robots: { index: false },
  };
}

export default async function AuditReportPage({
  params,
}: {
  params: Promise<{ locale: string; reportId: string }>;
}) {
  const { reportId, locale } = await params;
  const report = await fetchReport(reportId);

  if (!report) notFound();

  return <AuditReportView report={report} locale={locale} />;
}
