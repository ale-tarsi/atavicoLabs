export type AuditStatus = 'pending' | 'preview' | 'done' | 'error';

export interface CoreWebVitals {
  lcp: number | null;   // Largest Contentful Paint (ms)
  cls: number | null;   // Cumulative Layout Shift
  fcp: number | null;   // First Contentful Paint (ms)
  ttfb: number | null;  // Time to First Byte (ms)
  tti: number | null;   // Time to Interactive (ms)
  tbt: number | null;   // Total Blocking Time (ms)
}

export interface PageSpeedData {
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
  };
  coreWebVitals: CoreWebVitals;
  topIssues: {
    id: string;
    title: string;
    description: string;
    score: number | null;
    category: 'performance' | 'seo' | 'accessibility' | 'best-practices';
  }[];
  seoMeta: {
    title: string | null;
    description: string | null;
    hasCanonical: boolean;
    hasH1: boolean;
    headingCount: number;
    imagesMissingAlt: number;
    hasRobotsMeta: boolean;
    isIndexable: boolean;
  };
}

export interface AuditIssue {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'performance' | 'seo' | 'accessibility' | 'best-practices';
  title: string;
  description: string;
  recommendation: string;
}

export interface AiReport {
  summary: string;
  overallGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
  };
  issues: AuditIssue[];
  quickWins: string[];
  cta: string;
}

export interface AuditReport {
  id: string;
  url: string;
  email: string;
  locale: string;
  status: AuditStatus;
  unlocked: boolean;
  stripeSessionId: string | null;
  paidAt: string | null;
  ipAddress: string | null;
  pagespeedData: PageSpeedData | null;
  aiReport: AiReport | null;
  errorMessage: string | null;
  createdAt: string;
}
