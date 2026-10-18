/**
 * Project metadata for portfolio cards.
 * Category and badge labels are localized via next-intl.
 */

export type ProjectCategory = 'mobile' | 'fullStack' | 'automation' | 'designSystem';
export type ProjectBadge = 'internal' | 'concept' | 'nda';

export interface ProjectMeta {
  slug: string;
  category: ProjectCategory;
  badge?: ProjectBadge;
}

export const PROJECTS: ProjectMeta[] = [
  // Named-client work (highest credibility)
  {
    slug: 'crispin',
    category: 'automation',
  },
  {
    slug: 'vectis',
    category: 'fullStack',
  },
  {
    slug: 'lytera',
    category: 'automation',
  },
  // NDA client work
  {
    slug: 'helixops',
    category: 'automation',
    badge: 'nda',
  },
  {
    slug: 'pulseshift',
    category: 'automation',
    badge: 'nda',
  },
  {
    slug: 'insightgrid',
    category: 'fullStack',
    badge: 'nda',
  },
  {
    slug: 'flowcanvas',
    category: 'fullStack',
    badge: 'nda',
  },
  // Internal tools
  {
    slug: 'hostid',
    category: 'mobile',
    badge: 'internal',
  },
  {
    slug: 'ai-workflow-assistant',
    category: 'automation',
    badge: 'internal',
  },
  {
    slug: 'energy-intelligence',
    category: 'fullStack',
  },
];

/**
 * Get project metadata by slug.
 */
export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
