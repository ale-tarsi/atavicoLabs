import {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://atavicolabs.com';
  
  const offers = [
    'ops-quick-win',
    'continuity-retainer',
    'product-build',
  ];
  
  const homepages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/it`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          it: `${baseUrl}/it`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          it: `${baseUrl}/it`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];
  
  const offerPages: MetadataRoute.Sitemap = offers.flatMap(offer => [
    {
      url: `${baseUrl}/it/offers/${offer}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          it: `${baseUrl}/it/offers/${offer}`,
          en: `${baseUrl}/en/offers/${offer}`,
        },
      },
    },
    {
      url: `${baseUrl}/en/offers/${offer}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          it: `${baseUrl}/it/offers/${offer}`,
          en: `${baseUrl}/en/offers/${offer}`,
        },
      },
    },
  ]);
  
  return [...homepages, ...offerPages];
}
