'use client';

import { motion } from 'framer-motion';
import OfferSectionHeading from './OfferSectionHeading';

type CardProps = {
  title: string;
  items: string[];
  tone?: 'positive' | 'negative';
};

type OfferIncludesBoundariesProps = {
  include: CardProps;
  boundaries: CardProps;
  sectionTitle?: string;
};

function Card({ title, items, tone = 'positive' }: CardProps) {
  const accent =
    tone === 'positive'
      ? 'border-oliva/30 bg-oliva/5 text-sabbia'
      : 'border-warm-subtle/50 bg-warm-subtle/10 text-sabbia';
  const bulletColor = tone === 'positive' ? 'text-oliva' : 'text-warm-accent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className={`border p-6 lg:p-7 ${accent} h-full`}
    >
      <h3 className="text-[20px] font-medium mb-4">{title}</h3>
      <ul className="space-y-3 text-[14px] text-sabbia/85">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 items-start">
            <span className={`${bulletColor} mt-[2px]`}>●</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function OfferIncludesBoundaries({ include, boundaries, sectionTitle }: OfferIncludesBoundariesProps) {
  return (
    <section className="space-y-6">
      <OfferSectionHeading title={sectionTitle || 'Scope'} />
      <div className="grid gap-6 lg:gap-7 grid-cols-1 md:grid-cols-2 items-stretch">
        <Card {...include} tone="positive" />
        <Card {...boundaries} tone="negative" />
      </div>
    </section>
  );
}
