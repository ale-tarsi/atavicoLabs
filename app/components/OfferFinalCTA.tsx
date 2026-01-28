'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackCtaClick } from '../utils/track';

type OfferFinalCTAProps = {
  title: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
  note?: string;
  locale: string;
};

export default function OfferFinalCTA({ title, bullets, ctaText, ctaHref, note, locale }: OfferFinalCTAProps) {
  return (
    <section className="px-6 lg:px-16 py-11 lg:py-12 border-t border-grigio/12 bg-grafite/25">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45 }}
        className="max-w-6xl mx-auto text-center space-y-5"
      >
        <h2 className="text-[28px] lg:text-[32px] font-medium text-sabbia">{title}</h2>

        <ul className="space-y-1.5 text-[14px] text-sabbia/80 max-w-3xl mx-auto">
          {bullets.map((item, i) => (
            <li key={i} className="flex gap-2 items-start justify-center">
              <span className="text-oliva mt-[2px]">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-2.5">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick('offer_final', locale)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-oliva text-carbone text-[15px] font-medium hover:bg-oliva/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-grafite"
          >
            {ctaText}
            <ArrowRight size={18} />
          </a>
          {note && <p className="text-[13px] text-sabbia/70">{note}</p>}
        </div>
      </motion.div>
    </section>
  );
}
