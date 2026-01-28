'use client';

import { ReactNode } from 'react';

type OfferSectionWrapProps = {
  children: ReactNode;
  maxWidth?: '5xl' | '6xl' | '7xl';
  className?: string;
};

export default function OfferSectionWrap({
  children,
  maxWidth = '7xl',
  className = '',
}: OfferSectionWrapProps) {
  const widthClass =
    maxWidth === '5xl' ? 'max-w-5xl' : maxWidth === '6xl' ? 'max-w-6xl' : 'max-w-7xl';
  return (
    <div className={`mx-auto w-full px-6 ${widthClass} ${className}`}>
      {children}
    </div>
  );
}
