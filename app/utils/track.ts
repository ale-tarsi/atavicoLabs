'use client';

type TrackMeta = Record<string, string | number | boolean | null | undefined>;

export function trackCtaClick(source: string, locale: string = 'it', meta: TrackMeta = {}) {
  if (typeof window === 'undefined') return;
  const payload = {
    event: 'book_audit_click',
    source,
    locale,
    path: window.location.pathname,
    ts: Date.now(),
    ...meta,
  };

  if (process.env.NODE_ENV !== 'production') {
    console.info('[track]', payload);
    return;
  }

  const body = JSON.stringify(payload);

  if (navigator?.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/track', blob);
  } else {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      /* silent */
    });
  }
}
