'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

type OfferCardProps = {
  /** Offer slug for link */
  slug: string;
  /** Localized title */
  title: string;
  /** Localized tagline/subtitle */
  tagline: string;
  /** Localized promise/description */
  promise: string;
  /** Localized timeline (e.g., "7 giorni", "Monthly") */
  timeline: string;
  /** Localized price range */
  priceRange: string;
  /** Optional badge text */
  badge?: string;
  /** Timeline label (e.g., "Timeline") */
  timelineLabel: string;
  /** Price label (e.g., "Da") */
  priceLabel: string;
  /** Current locale for link */
  locale?: string;
  /** Featured styling */
  featured?: boolean;
  /** Animation delay (ms) */
  delay?: number;
  /** Details link label */
  detailsLabel: string;
  /** Enable selection mode (card behaves like a toggle) */
  selectable?: boolean;
  /** Selection state */
  isSelected?: boolean;
  /** Selection handler */
  onSelect?: () => void;
  /** Override link href */
  href?: string;
  /** Optional highlights to show when selected */
  highlights?: string[];
};

export default function OfferCard({
  slug,
  title,
  tagline,
  promise,
  timeline,
  priceRange,
  badge,
  timelineLabel,
  priceLabel,
  locale = 'en',
  featured = false,
  delay = 0,
  detailsLabel,
  selectable = false,
  isSelected = false,
  onSelect,
  href,
  highlights = [],
}: OfferCardProps) {
  const offerHref = href || `/${locale}/offers/${slug}`;
  const highlightsTitle = locale === 'it' ? 'Cosa ottieni' : 'What you get';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selectable || !onSelect) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  const handleClick = () => {
    if (!selectable || !onSelect) return;
    onSelect();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="h-full"
    >
      <div className="h-full flex flex-col">
        <div
          role={selectable ? 'button' : undefined}
          tabIndex={selectable ? 0 : undefined}
          aria-pressed={selectable ? isSelected : undefined}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          className={`group h-full flex flex-col relative transition-all duration-200 ease-out ${
            isSelected
              ? 'border border-oliva/70 bg-grafite/45 shadow-[0_10px_30px_rgba(0,0,0,0.25),0_0_0_1px_rgba(168,183,92,0.35)] -translate-y-[2px]'
              : 'border border-grigio/20 bg-grafite/30 hover:border-oliva/40 hover:-translate-y-1 brightness-[0.97]'
          } ${featured ? 'p-10 lg:p-12' : 'p-8 lg:p-10'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone`}
        >
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4 text-[10px] uppercase tracking-wider px-3 py-1.5 bg-oliva/20 text-oliva border border-oliva/30">
              {badge}
            </div>
          )}

          {selectable ? (
            <>
              {/* Title */}
              <h3 className={`font-medium text-sabbia mb-3 ${featured ? 'text-[32px]' : 'text-[28px]'}`}>
                {title}
              </h3>

              {/* Tagline */}
              <p className={`text-sabbia/85 font-light mb-4 max-w-2xl ${featured ? 'text-[17px]' : 'text-[16px]'}`}>
                {tagline}
              </p>

              {/* Promise */}
              {promise && (
                <p className="text-[15px] leading-[1.7] text-sabbia/70 mb-5 max-w-xl flex-grow">
                  {promise}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-[13px] text-grigio/70">
                <div>
                  <span className="text-grigio/60">{timelineLabel}: </span>
                  <span className="text-sabbia">{timeline}</span>
                </div>
                <div>
                  <span className="text-grigio/60">{priceLabel}: </span>
                  <span className="text-sabbia font-medium">{priceRange}</span>
                </div>
              </div>

              {isSelected && highlights.length > 0 && (
                <div className="mt-5 rounded-lg border border-oliva/25 bg-oliva/5 p-4 text-[13px] text-sabbia/85 transition-opacity duration-200">
                  <div className="text-[12px] uppercase tracking-[0.14em] text-oliva/80 mb-2">{highlightsTitle}</div>
                  <ul className="space-y-2">
                    {highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="mt-[3px] text-oliva/70">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isSelected && (
                <div className="mt-6 flex items-center justify-start gap-3 pt-5 border-t border-grigio/15">
                  <Link
                    href={offerHref}
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 text-[14px] text-oliva font-medium hover:text-oliva/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
                  >
                    <span>{`${detailsLabel} ↗`}</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                href={offerHref}
                className="flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
              >
                {/* Title */}
                <h3 className={`font-medium text-sabbia mb-3 ${featured ? 'text-[32px]' : 'text-[28px]'}`}>
                  {title}
                </h3>

                {/* Tagline */}
                <p className={`text-sabbia/80 font-light mb-4 max-w-2xl ${featured ? 'text-[17px]' : 'text-[16px]'}`}>
                  {tagline}
                </p>

                {/* Promise */}
                {promise && (
                  <p className="text-[15px] leading-[1.7] text-sabbia/70 mb-6 max-w-xl flex-grow">
                    {promise}
                  </p>
                )}

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-[13px] text-grigio/70 mt-auto">
                  <div>
                    <span className="text-grigio/60">{timelineLabel}: </span>
                    <span className="text-sabbia">{timeline}</span>
                  </div>
                  <div>
                    <span className="text-grigio/60">{priceLabel}: </span>
                    <span className="text-sabbia font-medium">{priceRange}</span>
                  </div>
                </div>
              </Link>

              <div className="mt-6 flex items-center justify-start gap-3 pt-5 border-t border-grigio/15">
                <Link
                  href={offerHref}
                  className="inline-flex items-center gap-2 text-[14px] text-oliva font-medium hover:text-oliva/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
                >
                  <span>{detailsLabel}</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
