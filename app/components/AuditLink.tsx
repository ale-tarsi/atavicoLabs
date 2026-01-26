'use client';

import { trackCtaClick } from '../utils/track';
import { getCalendlyUrl } from '../constants/links';

type AuditLinkProps = {
  locale: string;
  source: string;
  className?: string;
  children: React.ReactNode;
};

export default function AuditLink({ locale, source, className = '', children }: AuditLinkProps) {
  return (
    <a
      href={getCalendlyUrl(locale as 'it' | 'en')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCtaClick(source, locale)}
      className={className}
    >
      {children}
    </a>
  );
}
