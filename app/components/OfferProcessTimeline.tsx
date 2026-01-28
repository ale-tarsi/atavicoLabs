'use client';

import { motion } from 'framer-motion';
import OfferSectionHeading from './OfferSectionHeading';

type Step = {
  dayRange: string;
  title: string;
  description: string;
};

type OfferProcessTimelineProps = {
  title: string;
  steps: Step[];
  rightCard?: {
    title: string;
    bullets: string[];
  };
};

export default function OfferProcessTimeline({ title, steps, rightCard }: OfferProcessTimelineProps) {
  return (
    <section className="space-y-6">
      <OfferSectionHeading title={title} />
      <div className={`grid gap-7 ${rightCard ? 'lg:grid-cols-[1.35fr_0.9fr]' : ''}`}>
        <div className="space-y-5">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full border border-oliva/30 bg-oliva/10 text-oliva font-semibold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 border border-grigio/20 bg-grafite/30 p-4 lg:p-5">
                <div className="text-[12px] uppercase tracking-[0.18em] text-grigio/70 mb-1">
                  {step.dayRange}
                </div>
                <h3 className="text-[17px] font-medium text-sabbia mb-1">{step.title}</h3>
                <p className="text-[14px] text-sabbia/80 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {rightCard && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border border-grigio/25 bg-grafite/40 p-5 lg:p-6 h-fit"
          >
            <h3 className="text-[18px] font-medium text-sabbia mb-3">{rightCard.title}</h3>
            <ul className="space-y-3 text-[14px] text-sabbia/85">
              {rightCard.bullets.map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-oliva mt-[2px]">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
