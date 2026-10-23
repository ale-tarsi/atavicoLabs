import type { AiReport, AuditStatus, PageSpeedData } from '@/types/audit';

// Store dei report su Google Sheets (foglio "Audit atavicoLabs") tramite il suo Apps Script.
// Stessi nomi di colonna della vecchia tabella Supabase.

export interface ReportRow {
  id: string;
  url: string;
  email: string;
  locale: string;
  status: AuditStatus;
  unlocked: boolean;
  stripe_session_id: string | null;
  paid_at: string | null;
  ip_address: string | null;
  pagespeed_data: PageSpeedData | null;
  ai_report: AiReport | null;
  error_message: string | null;
  created_at: string;
}

async function call<T extends { ok: boolean }>(payload: Record<string, unknown>): Promise<T> {
  const url = process.env.AUDIT_STORE_URL;
  const secret = process.env.AUDIT_STORE_SECRET;
  if (!url || !secret) {
    throw new Error('Store non configurato: servono AUDIT_STORE_URL e AUDIT_STORE_SECRET');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ secret, ...payload }),
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  });

  const raw = await res.text();
  let data: (T & { error?: string }) | null = null;
  try {
    data = JSON.parse(raw);
  } catch {
    data = null;
  }
  if (!res.ok || !data?.ok) {
    throw new Error(`Store: ${data?.error ?? `HTTP ${res.status}`}`);
  }
  return data;
}

export async function createReport(input: {
  id: string;
  url: string;
  email: string;
  locale: string;
  ip_address: string | null;
}): Promise<void> {
  await call({
    action: 'audit_create',
    row: { ...input, status: 'pending', unlocked: false, created_at: new Date().toISOString() },
  });
}

export async function getReport(id: string): Promise<ReportRow | null> {
  const data = await call<{ ok: boolean; row: ReportRow | null }>({ action: 'audit_get', id });
  return data.row;
}

export async function updateReport(id: string, patch: Partial<ReportRow>): Promise<void> {
  await call({ action: 'audit_update', id, patch });
}

export async function countRecent(args: {
  email: string;
  ip: string | null;
  since: string;
}): Promise<{ emailCount: number; ipCount: number }> {
  const data = await call<{ ok: boolean; emailCount: number; ipCount: number }>({
    action: 'audit_count',
    ...args,
  });
  return { emailCount: data.emailCount, ipCount: data.ipCount };
}
