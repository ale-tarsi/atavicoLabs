'use client';

import { motion } from 'framer-motion';
import OfferSectionHeading from './OfferSectionHeading';

type UseCase = {
  title: string;
  output: string;
  tools: string[];
};

type OfferUseCasesGridProps = {
  title: string;
  items: UseCase[];
};

export default function OfferUseCasesGrid({ title, items }: OfferUseCasesGridProps) {
  return (
    <section className="space-y-6">
      <OfferSectionHeading title={title} />
      <div className="grid gap-6 lg:gap-7 md:grid-cols-2 items-stretch">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="border border-grigio/20 bg-grafite/30 p-5 lg:p-6 space-y-3 h-full"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[18px] font-medium text-sabbia">{item.title}</h3>
            </div>
            <p className="text-[13px] text-sabbia/80 leading-relaxed">
              <span className="text-grigio/70 uppercase tracking-[0.14em] text-[11px] mr-2">Output</span>
              {item.output}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-grafite/50 border border-grigio/25 text-[12px] text-sabbia/85 rounded-full tracking-wide"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
