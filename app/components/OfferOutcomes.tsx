'use client';

import { motion } from 'framer-motion';
import OfferSectionHeading from './OfferSectionHeading';

type OutcomeItem = {
  title: string;
  description: string;
  bullets: string[];
};

type OfferOutcomesProps = {
  title: string;
  items: OutcomeItem[];
};

export default function OfferOutcomes({ title, items }: OfferOutcomesProps) {
  return (
    <section className="space-y-6">
      <OfferSectionHeading title={title} />
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="border border-grigio/20 bg-grafite/40 p-5 lg:p-6 flex flex-col gap-3"
          >
            <h3 className="text-[18px] font-medium text-sabbia">{item.title}</h3>
            <p className="text-[14px] text-sabbia/75 leading-relaxed">{item.description}</p>
            <ul className="space-y-2 text-[13px] text-sabbia/80">
              {item.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-oliva mt-[2px]">●</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
