import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { AuditReport } from '@/types/audit';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ reportId: string }> }
) {
  const { reportId } = await params;

  const { data, error } = await supabase
    .from('audit_reports')
    .select(
      'id, url, email, locale, status, unlocked, stripe_session_id, paid_at, ip_address, pagespeed_data, ai_report, error_message, created_at'
    )
    .eq('id', reportId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }

  const report: AuditReport = {
    id: data.id,
    url: data.url,
    email: data.email,
    locale: data.locale,
    status: data.status,
    unlocked: data.unlocked ?? false,
    stripeSessionId: data.stripe_session_id ?? null,
    paidAt: data.paid_at ?? null,
    ipAddress: data.ip_address ?? null,
    pagespeedData: data.pagespeed_data ?? null,
    aiReport: data.ai_report ?? null,
    errorMessage: data.error_message ?? null,
    createdAt: data.created_at,
  };

  return NextResponse.json(report);
}
