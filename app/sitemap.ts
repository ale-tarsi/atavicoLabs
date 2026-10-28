import {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://atavicolabs.com';
  
  const projects = [
    'hostid-web',
    'nilm-domotica',
    'hubwater',
    'codfood',
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
  
  const toolPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/it/calcolatore`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
      alternates: {
        languages: {
          it: `${baseUrl}/it/calcolatore`,
          en: `${baseUrl}/en/calcolatore`,
        },
      },
    },
    {
      url: `${baseUrl}/en/calcolatore`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
      alternates: {
        languages: {
          it: `${baseUrl}/it/calcolatore`,
          en: `${baseUrl}/en/calcolatore`,
        },
      },
    },
    {
      url: `${baseUrl}/it/esempio-analisi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: {
        languages: {
          it: `${baseUrl}/it/esempio-analisi`,
          en: `${baseUrl}/en/esempio-analisi`,
        },
      },
    },
    {
      url: `${baseUrl}/en/esempio-analisi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: {
        languages: {
          it: `${baseUrl}/it/esempio-analisi`,
          en: `${baseUrl}/en/esempio-analisi`,
        },
      },
    },
  ];

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
  
  return [...homepages, ...contactPages, ...toolPages, ...projectPages];
}
