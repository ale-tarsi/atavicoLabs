import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getReport, updateReport } from '@/lib/store';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  let body: { reportId?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { reportId, locale = 'it' } = body;

  if (!reportId) {
    return NextResponse.json({ error: 'Missing reportId' }, { status: 400 });
  }

  let report;
  try {
    report = await getReport(reportId);
  } catch (err) {
    console.error('[checkout:store]', err);
    return NextResponse.json({ error: 'Store unavailable' }, { status: 502 });
  }

  if (!report) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }

  if (report.unlocked) {
    return NextResponse.json({ error: 'Report already unlocked' }, { status: 400 });
  }

  if (report.status === 'error') {
    return NextResponse.json({ error: 'Report is in error state' }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atavicolabs.com';
  const hostname = new URL(report.url).hostname;

  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: 1400, // 14.00 €
          product_data: {
            name: 'Website Audit Report',
            description: `Analisi AI completa per ${hostname}`,
          },
        },
        quantity: 1,
      },
    ],
    // reportId is stored in metadata so the webhook can find the row without
    // an extra DB lookup by stripe_session_id.
    metadata: { reportId },
    success_url: `${baseUrl}/${locale}/audit/${reportId}?payment=success`,
    cancel_url: `${baseUrl}/${locale}/audit/${reportId}`,
  });

  // Persist the session ID for traceability and idempotency checks in the webhook.
  await updateReport(reportId, { stripe_session_id: session.id }).catch((err) =>
    console.error('[checkout:store]', err)
  );

  return NextResponse.json({ checkoutUrl: session.url });
}
