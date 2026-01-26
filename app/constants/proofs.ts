/**
 * Internal automation proofs to demonstrate reliability and approach.
 * These are internal/in-progress systems, not client projects.
 */

export interface Proof {
  id: string;
  titleKey: string;
  descriptionKey: string;
  highlights: string[]; // Array of i18n keys for bullet points
  badges: {
    internal: boolean;
    inProgress: boolean;
  };
}

export const PROOFS: Proof[] = [
  {
    id: 'ai-outreach',
    titleKey: 'items.0.title',
    descriptionKey: 'items.0.description',
    highlights: [
      'items.0.highlights.0',
      'items.0.highlights.1',
      'items.0.highlights.2',
    ],
    badges: {
      internal: true,
      inProgress: true,
    },
  },
  {
    id: 'slack-alerts',
    titleKey: 'items.1.title',
    descriptionKey: 'items.1.description',
    highlights: [
      'items.1.highlights.0',
      'items.1.highlights.1',
      'items.1.highlights.2',
    ],
    badges: {
      internal: true,
      inProgress: false,
    },
  },
  {
    id: 'doc-to-data',
    titleKey: 'items.2.title',
    descriptionKey: 'items.2.description',
    highlights: [
      'items.2.highlights.0',
      'items.2.highlights.1',
      'items.2.highlights.2',
    ],
    badges: {
      internal: true,
      inProgress: true,
    },
  },
];
