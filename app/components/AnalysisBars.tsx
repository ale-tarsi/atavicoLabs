'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Bar = { label: string; value: string; share: number };

export default function AnalysisBars({ bars }: { bars: Bar[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="space-y-6">
      {bars.map((bar, i) => (
        <div key={bar.label}>
          <div className="flex items-baseline justify-between mb-2 text-[15px]">
            <span className="text-sabbia">{bar.label}</span>
            <span className="font-mono text-oliva">{bar.value}</span>
          </div>
          <div className="h-3 bg-grafite/60 overflow-hidden">
            <motion.div
              className="h-full bg-oliva"
              initial={reduce ? false : { width: 0 }}
              whileInView={{ width: `${bar.share}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: 'easeOut' }}
              style={reduce ? { width: `${bar.share}%` } : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
