/**
 * Feature flags for homepage sections.
 * Set to true when real content is available.
 */

export const FEATURES = {
  /** Show Blog section (requires real articles with working links) */
  BLOG_ENABLED: false,
  
  /** Show Testimonials section (requires verified client testimonials) */
  TESTIMONIALS_ENABLED: false,
} as const;
