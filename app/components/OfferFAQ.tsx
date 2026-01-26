'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FAQItem = {
  question: string;
  answer: string;
};

type OfferFAQProps = {
  /** Array of FAQ items with localized text */
  items: FAQItem[];
  /** Optional section title */
  title?: string;
  /** Animation delay (ms) */
  delay?: number;
};

export default function OfferFAQ({ items, title = 'FAQ', delay = 0 }: OfferFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="space-y-6"
    >
      {title && <h2 className="text-[28px] font-medium text-sabbia mb-8">{title}</h2>}
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (delay + index * 100) / 1000 }}
            className="border-b border-grigio/20 pb-4 last:border-0"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="text-[16px] font-medium text-sabbia group-hover:text-oliva transition-colors">
                {item.question}
              </h3>
              <ChevronDown
                size={20}
                className={`text-grigio flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-[14px] text-sabbia/70 leading-[1.7] mt-3 pr-8">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
