'use client';

import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

type BulletType = 'check' | 'cross';

type OfferBulletsProps = {
  /** Array of localized bullet items */
  items: string[];
  /** Bullet icon type */
  type?: BulletType;
  /** Optional title for the list */
  title?: string;
  /** Text size variant */
  size?: 'default' | 'large';
  /** Animation delay (ms) */
  delay?: number;
};

export default function OfferBullets({
  items,
  type = 'check',
  title,
  size = 'default',
  delay = 0,
}: OfferBulletsProps) {
  const Icon = type === 'check' ? Check : X;
  const iconColor = type === 'check' ? 'text-oliva' : 'text-grigio';
  const textColor = type === 'check' ? 'text-sabbia/80' : 'text-sabbia/70';
  const textSize = size === 'large' ? 'text-[15px]' : 'text-[14px]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
    >
      {title && (
        <h3 className="text-[22px] font-medium text-sabbia mb-6">{title}</h3>
      )}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (delay + index * 50) / 1000 }}
            className={`flex items-start gap-3 ${textSize} ${textColor}`}
          >
            <Icon
              size={size === 'large' ? 20 : 18}
              className={`${iconColor} flex-shrink-0 mt-0.5`}
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
