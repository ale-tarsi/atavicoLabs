'use client';

import type { ElementType, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  /** Ritardo in secondi (per creare sequenze) */
  delay?: number;
  /** Spostamento verticale iniziale in px */
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
};

/**
 * Ingresso graduale allo scroll (una sola volta).
 * Con prefers-reduced-motion mostra il contenuto subito, senza animazione.
 */
export default function Reveal({ children, delay = 0, y = 16, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
