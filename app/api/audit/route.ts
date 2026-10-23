import { NextResponse } from 'next/server';
import { createReport, countRecent, updateReport } from '@/lib/store';
import { fetchPageSpeed } from '@/lib/audit/pagespeed';

export const maxDuration = 60;

function isValidUrl(str: string): boolean {
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

function getIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

export async function POST(request: Request) {
  let body: { url?: string; email?: string; locale?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot: if the hidden "website" field is filled, a bot submitted the form.
  // Return 200 silently so bots don't know they were rejected.
  if (body.website) {
    return NextResponse.json({ reportId: 'honeypot' });
  }

  const { url, email, locale = 'it' } = body;

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const ip = getIp(request);
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const reportId = crypto.randomUUID();

  try {
    // Rate limit: max 1 request per email and 3 per IP in 24h
    const { emailCount, ipCount } = await countRecent({
      email,
      ip: ip === 'unknown' ? null : ip,
      since,
    });

    if (emailCount >= 1) {
      return NextResponse.json(
        { error: 'Hai già richiesto un audit nelle ultime 24 ore. Riprova domani.' },
        { status: 429 }
      );
    }
    if (ip !== 'unknown' && ipCount >= 3) {
      return NextResponse.json(
        { error: 'Troppe richieste dalla tua rete. Riprova più tardi.' },
        { status: 429 }
      );
    }

    // Insert row with status 'pending'
    await createReport({
      id: reportId,
      url,
      email,
      locale,
      ip_address: ip === 'unknown' ? null : ip,
    });
  } catch (err) {
    console.error('[audit:store]', err);
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }

  try {
    // FASE 1 only: run PageSpeed, save preview — Claude is NOT called here.
    // Claude is called only after Stripe payment is confirmed via webhook.
    const pagespeedData = await fetchPageSpeed(url);

    await updateReport(reportId, { status: 'preview', pagespeed_data: pagespeedData });

    return NextResponse.json({ reportId });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[audit:pagespeed]', message);
    await updateReport(reportId, { status: 'error', error_message: message }).catch(() => {});
    return NextResponse.json({ error: 'PageSpeed analysis failed', reportId }, { status: 500 });
  }
}
