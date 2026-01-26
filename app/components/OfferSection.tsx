'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type OfferSectionProps = {
  /** Section heading */
  title: string;
  /** Section content */
  children: ReactNode;
  /** Optional background variant */
  variant?: 'default' | 'muted';
  /** Optional max width constraint */
  maxWidth?: 'default' | 'narrow' | 'wide';
  /** Animation delay (ms) */
  delay?: number;
};

export default function OfferSection({
  title,
  children,
  variant = 'default',
  maxWidth = 'default',
  delay = 0,
}: OfferSectionProps) {
  const bgClass = variant === 'muted' ? 'bg-grafite/30' : '';
  const maxWidthClass =
    maxWidth === 'narrow'
      ? 'max-w-3xl'
      : maxWidth === 'wide'
      ? 'max-w-6xl'
      : 'max-w-4xl';

  return (
    <section className={`py-16 lg:py-24 px-6 lg:px-16 border-b border-grigio/20 ${bgClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        className={`${maxWidthClass} mx-auto`}
      >
        <h2 className="text-[28px] font-medium text-sabbia mb-8">{title}</h2>
        {children}
      </motion.div>
    </section>
  );
}
