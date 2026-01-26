/**
 * Offers Constants
 * 
 * This file contains only structural data (IDs, slugs, counts).
 * All copy/text content is in messages/[locale].json under "offers" namespace.
 * 
 * UI reads translations via: t('offers.opsQuickWin.title'), t('offers.opsQuickWin.examples.0'), etc.
 */

export type OfferBadge = 'quickStart' | 'mostPopular' | 'endToEnd';

export type OfferPlan = {
  id: string;
  /** Number of hours included per month (for retainer plans) */
  hoursPerMonth?: number;
};

export type Offer = {
  /** Unique identifier */
  id: string;
  /** URL slug */
  slug: string;
  /** Badge type for visual distinction */
  badge?: OfferBadge;
  /** i18n key for title (e.g., 'opsQuickWin.title') */
  titleKey: string;
  /** i18n key for tagline (e.g., 'opsQuickWin.tagline') */
  taglineKey: string;
  /** i18n key for promise (e.g., 'opsQuickWin.promise') */
  promiseKey: string;
  /** i18n key for timeline (e.g., 'opsQuickWin.timeline') */
  timelineKey: string;
  /** i18n key for price (e.g., 'opsQuickWin.price') */
  priceKey: string;
  /** i18n key for badge (e.g., 'badges.quickStart') */
  badgeKey?: string;
  /** Number of example use cases */
  examplesCount: number;
  /** Number of deliverables */
  deliverablesCount: number;
  /** Number of boundaries/exclusions */
  boundariesCount: number;
  /** Number of timeline steps */
  stepsCount: number;
  /** Number of FAQ items */
  faqsCount: number;
  /** Optional plans (for retainer) */
  plans?: OfferPlan[];
  /** Metadata flags */
  meta: {
    /** Is this a recurring/subscription offer? */
    isRecurring: boolean;
    /** Does this offer include optional mobile development? */
    hasMobileOption: boolean;
    /** Typical duration category */
    durationCategory: 'days' | 'weeks' | 'months';
  };
};

/**
 * Core offers data structure
 * All text content is in i18n files under:
 * - offers.opsQuickWin.*
 * - offers.continuityRetainer.*
 * - offers.productBuild.*
 */
export const OFFERS: Offer[] = [
  {
    id: 'opsQuickWin',
    slug: 'ops-quick-win',
    badge: 'quickStart',
    titleKey: 'quickWin.title',
    taglineKey: 'hub.offers.quickWin.tagline',
    promiseKey: 'quickWin.promise',
    timelineKey: 'quickWin.timeline',
    priceKey: 'quickWin.price',
    badgeKey: 'badges.quickStart',
    examplesCount: 6,
    deliverablesCount: 4,
    boundariesCount: 3,
    stepsCount: 4,
    faqsCount: 5,
    meta: {
      isRecurring: false,
      hasMobileOption: false,
      durationCategory: 'days',
    },
  },
  {
    id: 'continuityRetainer',
    slug: 'continuity-retainer',
    badge: 'mostPopular',
    titleKey: 'retainer.title',
    taglineKey: 'hub.offers.retainer.tagline',
    promiseKey: 'retainer.promise',
    timelineKey: 'retainer.timeline',
    priceKey: 'retainer.price',
    badgeKey: 'badges.mostPopular',
    examplesCount: 5,
    deliverablesCount: 5,
    boundariesCount: 3,
    stepsCount: 4,
    faqsCount: 5,
    plans: [
      { id: 'care', hoursPerMonth: 3 },
      { id: 'growth', hoursPerMonth: 8 },
      { id: 'opsPlus', hoursPerMonth: 15 },
    ],
    meta: {
      isRecurring: true,
      hasMobileOption: false,
      durationCategory: 'months',
    },
  },
  {
    id: 'productBuild',
    slug: 'product-build',
    badge: 'endToEnd',
    titleKey: 'product.title',
    taglineKey: 'hub.offers.product.tagline',
    promiseKey: 'product.promise',
    timelineKey: 'product.timeline',
    priceKey: 'product.price',
    badgeKey: 'badges.endToEnd',
    examplesCount: 6,
    deliverablesCount: 6,
    boundariesCount: 3,
    stepsCount: 5,
    faqsCount: 5,
    meta: {
      isRecurring: false,
      hasMobileOption: true,
      durationCategory: 'weeks',
    },
  },
];

/**
 * Helper to get offer by slug
 * @param slug - URL slug (e.g., 'ops-quick-win')
 * @returns Offer object or null
 */
export function getOffer(slug: string): Offer | null {
  return OFFERS.find((offer) => offer.slug === slug) || null;
}

/**
 * Helper to get offer by ID
 * @param id - Offer ID (e.g., 'opsQuickWin')
 * @returns Offer object or null
 */
export function getOfferById(id: string): Offer | null {
  return OFFERS.find((offer) => offer.id === id) || null;
}

/**
 * Get all offer slugs (useful for static generation)
 */
export function getAllOfferSlugs(): string[] {
  return OFFERS.map((offer) => offer.slug);
}

/**
 * Badge type mapping to i18n keys
 * UI reads: t(`offers.badges.${badgeType}`)
 */
export const OFFER_BADGE_KEYS: Record<OfferBadge, string> = {
  quickStart: 'offers.badges.quickStart',
  mostPopular: 'offers.badges.mostPopular',
  endToEnd: 'offers.badges.endToEnd',
};
