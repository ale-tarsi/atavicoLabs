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
  {
    slug: 'hostid',
    category: 'mobile',
    // badge: 'nda', // Uncomment if needed
  },
  {
    slug: 'helixops',
    category: 'automation',
    // badge: 'internal', // Uncomment if needed
  },
  {
    slug: 'pulseshift',
    category: 'mobile',
    // badge: 'concept', // Uncomment if needed
  },
  {
    slug: 'insightgrid',
    category: 'fullStack',
  },
  {
    slug: 'flowcanvas',
    category: 'fullStack',
  },
];

/**
 * Get project metadata by slug.
 */
export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
