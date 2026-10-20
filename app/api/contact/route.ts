import { NextResponse } from 'next/server';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Evita che Google Sheets interpreti il testo come formula.
function cell(value: unknown, max: number): string {
  const s = String(value ?? '').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? `'${s}` : s;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: i bot compilano il campo nascosto. Rispondiamo ok senza salvare.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const name = cell(body.name, 100);
  const email = cell(body.email, 200);
  const workflow = cell(body.workflow, 3000);
  if (!name || !workflow || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const tools = Array.isArray(body.tools)
    ? body.tools.slice(0, 10).map((t) => cell(t, 50))
    : [];

  const url = process.env.LEAD_WEBHOOK_URL;
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error('[contact] LEAD_WEBHOOK_URL / LEAD_WEBHOOK_SECRET non configurati');
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret,
        name,
        email,
        company: cell(body.company, 150),
        workflow,
        tools,
        locale: cell(body.locale, 5),
        page: cell(body.page, 200),
      }),
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });
    const raw = await res.text();
    let data: { ok?: boolean } | null = null;
    try {
      data = JSON.parse(raw);
    } catch {
      data = null;
    }
    if (!res.ok || !data?.ok) {
      const text = raw
        .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      console.error('[contact:webhook]', res.status, text.slice(0, 250));
      throw new Error('webhook_failed');
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact:error]', error);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
}
