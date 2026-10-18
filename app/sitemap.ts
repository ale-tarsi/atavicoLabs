import {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://atavicolabs.com';
  
  const offers = [
    'ops-quick-win',
    'continuity-retainer',
    'product-build',
  ];

  const projects = [
    'ai-workflow-assistant',
    'crispin',
    'energy-intelligence',
    'flowcanvas',
    'helixops',
    'hostid',
    'insightgrid',
    'loopin',
    'lytera',
    'nuvia',
    'pulseshift',
    'syncora',
    'team-scheduler',
    'vectis',
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

  const contactPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/it/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
      alternates: {
        languages: {
          it: `${baseUrl}/it/contact`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
      alternates: {
        languages: {
          it: `${baseUrl}/it/contact`,
          en: `${baseUrl}/en/contact`,
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

  const projectPages: MetadataRoute.Sitemap = projects.flatMap(project => [
    {
      url: `${baseUrl}/it/projects/${project}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          it: `${baseUrl}/it/projects/${project}`,
          en: `${baseUrl}/en/projects/${project}`,
        },
      },
    },
    {
      url: `${baseUrl}/en/projects/${project}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          it: `${baseUrl}/it/projects/${project}`,
          en: `${baseUrl}/en/projects/${project}`,
        },
      },
    },
  ]);
  
  return [...homepages, ...contactPages, ...offerPages, ...projectPages];
}
