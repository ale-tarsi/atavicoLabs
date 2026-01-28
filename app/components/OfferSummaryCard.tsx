'use client';

import { ArrowRight } from 'lucide-react';
import { trackCtaClick } from '../utils/track';

type OfferSummaryCardProps = {
  priceRange: string;
  priceNote?: string;
  timeline: string;
  timelineLabel?: string;
  priceLabel?: string;
  note?: string;
  ctaText: string;
  ctaHref: string;
  locale: string;
  className?: string;
};

/**
 * Sticky summary with pricing + CTA.
 * Sticky behavior is controlled by the parent layout via utility classes.
 */
export default function OfferSummaryCard({
  priceRange,
  priceNote,
  timeline,
  timelineLabel,
  priceLabel,
  note,
  ctaText,
  ctaHref,
  locale,
  className = '',
}: OfferSummaryCardProps) {
  return (
    <div
      className={`border border-grigio/25 bg-grafite/50 backdrop-blur-sm p-6 lg:p-7 shadow-lg shadow-black/20 ${className}`}
    >
      <div className="space-y-4">
        <div>
          <div className="text-[13px] uppercase tracking-[0.16em] text-grigio/70 mb-1">
            {timelineLabel || 'Timeline'}
          </div>
          <div className="text-[22px] font-medium text-sabbia">{timeline}</div>
        </div>

        <div>
          <div className="text-[13px] uppercase tracking-[0.16em] text-grigio/70 mb-1">
            {priceLabel || 'Investimento'}
          </div>
          <div className="text-[26px] font-medium text-sabbia">{priceRange}</div>
          {priceNote && <p className="text-[13px] text-sabbia/70 mt-1">{priceNote}</p>}
        </div>

        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCtaClick('offer_summary', locale)}
          className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 bg-oliva text-carbone text-[15px] font-medium hover:bg-oliva/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
        >
          {ctaText}
          <ArrowRight size={18} />
        </a>

        {note && <p className="text-[13px] text-sabbia/70 leading-relaxed">{note}</p>}
      </div>
    </div>
  );
}
