'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type OfferCTAProps = {
  /** Main CTA heading */
  title: string;
  /** Optional description/subtext */
  description?: string;
  /** CTA button text */
  buttonText: string;
  /** CTA button href */
  buttonHref: string;
  /** Animation delay (ms) */
  delay?: number;
};

export default function OfferCTA({
  title,
  description,
  buttonText,
  buttonHref,
  delay = 0,
}: OfferCTAProps) {
  return (
    <section className="py-16 lg:py-20 px-6 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-[32px] font-medium text-sabbia mb-4">{title}</h2>
        
        {description && (
          <p className="text-[15px] text-sabbia/70 mb-8 max-w-xl mx-auto">
            {description}
          </p>
        )}
        
        <motion.a
          href={buttonHref}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-oliva text-sabbia text-[15px] font-medium hover:bg-oliva/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
        >
          {buttonText}
          <ArrowRight size={18} />
        </motion.a>
      </motion.div>
    </section>
  );
}
