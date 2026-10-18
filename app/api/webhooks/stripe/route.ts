import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
import { analyzeWithClaude } from '@/lib/audit/analyze';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Next.js App Router: disable body parsing so we can read the raw bytes
// for Stripe signature verification.
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[webhook:signature]', message);
    return NextResponse.json({ error: `Signature verification failed: ${message}` }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    // Acknowledge other events without acting on them
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const reportId = session.metadata?.reportId;

  if (!reportId) {
    console.error('[webhook] checkout.session.completed missing reportId in metadata', session.id);
    return NextResponse.json({ error: 'Missing reportId in session metadata' }, { status: 400 });
  }

  const { data: report, error: fetchError } = await supabase
    .from('audit_reports')
    .select('id, url, locale, pagespeed_data, unlocked')
    .eq('id', reportId)
    .single();

  if (fetchError || !report) {
    console.error('[webhook] report not found for reportId', reportId);
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }

  // Idempotency guard: if a duplicate event arrives, do nothing.
  if (report.unlocked) {
    console.log('[webhook] report already unlocked, skipping', reportId);
    return NextResponse.json({ received: true });
  }

  if (!report.pagespeed_data) {
    console.error('[webhook] pagespeed_data missing for report', reportId);
    return NextResponse.json({ error: 'PageSpeed data not available' }, { status: 422 });
  }

  try {
    // This is the ONLY place Claude is called — after Stripe confirms payment.
    const aiReport = await analyzeWithClaude(
      report.url,
      report.pagespeed_data,
      (report.locale as 'it' | 'en') ?? 'it'
    );

    await supabase
      .from('audit_reports')
      .update({
        ai_report: aiReport,
        status: 'done',
        unlocked: true,
        paid_at: new Date().toISOString(),
        stripe_session_id: session.id,
      })
      .eq('id', reportId);

    console.log('[webhook] report unlocked successfully', reportId);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[webhook:claude]', message);
    // Store the error so the user can see something went wrong,
    // but return 500 so Stripe retries the webhook.
    await supabase
      .from('audit_reports')
      .update({ error_message: `Claude error after payment: ${message}` })
      .eq('id', reportId);
    return NextResponse.json({ error: 'Claude analysis failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
