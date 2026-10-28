'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle, ArrowRight, Database, Inbox, Keyboard, ScanText, Search, Send, UserCheck,
  type LucideIcon,
} from 'lucide-react';

type Kind = 'manual' | 'auto' | 'person';
type Step = { label: string; caption: string };
type Props = {
  today: { title: string; steps: Step[] };
  after: { title: string; steps: Step[] };
  legend: { manual: string; auto: string; person: string };
};

const STYLE: Record<Kind, string> = {
  manual: 'border-[#7A5340] text-[#C0855F]',
  auto: 'border-[#5A6D5A] text-[#6D8369]',
  person: 'border-sabbia/50 text-sabbia',
};
const TODAY: [LucideIcon, Kind][] = [
  [Inbox, 'manual'], [Search, 'manual'], [Keyboard, 'manual'], [AlertTriangle, 'manual'], [Send, 'manual'],
];
const AFTER: [LucideIcon, Kind][] = [
  [Inbox, 'auto'], [ScanText, 'auto'], [UserCheck, 'person'], [Database, 'auto'], [Send, 'auto'],
];

export default function AnalysisFlow({ today, after, legend }: Props) {
  const [mode, setMode] = useState<'today' | 'after'>('today');
  const reduce = useReducedMotion();
  const data = mode === 'today' ? today : after;
  const config = mode === 'today' ? TODAY : AFTER;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div role="group" className="inline-flex border border-grigio/30">
          {(['today', 'after'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`px-6 py-2.5 text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 ${
                mode === m
                  ? 'bg-[#5A6D5A] text-carbone font-medium'
                  : 'text-sabbia/60 hover:text-sabbia hover:bg-grafite/50'
              }`}
            >
              {(m === 'today' ? today : after).title}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-5 text-[12px] text-sabbia/70">
          <span className="flex items-center gap-2"><i className="w-6 h-[3px] bg-[#C0855F]" /> {legend.manual}</span>
          <span className="flex items-center gap-2"><i className="w-6 h-[3px] bg-[#6D8369]" /> {legend.auto}</span>
          <span className="flex items-center gap-2"><i className="w-6 h-[3px] bg-sabbia/70" /> {legend.person}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ol
          key={mode}
          className="grid grid-cols-1 md:grid-cols-5 gap-3"
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.15 } }}
          variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.09 } } }}
        >
          {data.steps.map((s, i) => {
            const [Icon, kind] = config[i];
            return (
              <motion.li
                key={s.label + i}
                className="relative"
                variants={{
                  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.35 } },
                }}
              >
                <div className={`h-full border bg-grafite/30 p-4 ${STYLE[kind]}`}>
                  <Icon size={22} aria-hidden="true" className="mb-3" />
                  <div className="text-[15px] font-medium text-sabbia leading-snug">{s.label}</div>
                  <div className="mt-1 text-[13px] text-sabbia/60 font-light leading-snug">{s.caption}</div>
                </div>
                {i < data.steps.length - 1 && (
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="hidden md:block absolute -right-[14px] top-1/2 -translate-y-1/2 text-grigio/50 z-10"
                  />
                )}
              </motion.li>
            );
          })}
        </motion.ol>
      </AnimatePresence>
    </div>
  );
}
