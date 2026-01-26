'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackCtaClick } from '../utils/track';

type OfferHeroProps = {
  /** Optional eyebrow text */
  eyebrow?: string;
  /** Main title */
  title: string;
  /** Promise/description */
  promise: string;
  /** Timeline value */
  timeline: string;
  /** Timeline label (e.g., "Timeline") */
  timelineLabel: string;
  /** Price range */
  priceRange: string;
  /** Price label (e.g., "Investimento") */
  priceLabel: string;
  /** Optional badge text */
  badge?: string;
  /** CTA button text */
  ctaText: string;
  /** CTA button href */
  ctaHref: string;
  /** Current locale */
  locale: string;
};

export default function OfferHero({
  eyebrow,
  title,
  promise,
  timeline,
  timelineLabel,
  priceRange,
  priceLabel,
  badge,
  ctaText,
  ctaHref,
  locale,
}: OfferHeroProps) {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-16 border-b border-grigio/20">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-[10px] uppercase tracking-wider px-3 py-1.5 bg-oliva/20 text-oliva border border-oliva/30 mb-6"
          >
            {badge}
          </motion.div>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4"
          >
            {eyebrow}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display text-[40px] lg:text-[56px] font-medium text-sabbia mb-6 leading-[1.1]"
        >
          {title}
        </motion.h1>

        {/* Promise */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[20px] lg:text-[24px] leading-[1.5] text-sabbia/80 font-light mb-8"
        >
          {promise}
        </motion.p>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-wrap items-center gap-8 text-[14px] mb-10"
        >
          <div>
            <span className="text-grigio/60">{timelineLabel}: </span>
            <span className="text-sabbia font-medium">{timeline}</span>
          </div>
          <div>
            <span className="text-grigio/60">{priceLabel}: </span>
            <span className="text-sabbia font-medium">{priceRange}</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick('offer_hero', locale)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-oliva text-sabbia text-[15px] font-medium hover:bg-oliva/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
          >
            {ctaText}
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
