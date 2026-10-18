import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '@/src/i18n/config';
import {Metadata} from 'next';
import CustomCursor from '../components/CustomCursor';
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://atavicolabs.com'),
  title: {
    template: '%s — AtavicoLabs',
    default: 'AtavicoLabs — Ops Automation Studio',
  },
  description: 'We turn manual processes into reliable systems. Ops automation, continuity retainer and product build for SMEs.',
  openGraph: {
    type: 'website',
    siteName: 'AtavicoLabs',
    images: [{
      url: '/og/default.png',
      width: 1200,
      height: 630,
      alt: 'AtavicoLabs — Automation Studio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/default.png'],
  },
  alternates: {
    languages: {
      'it': '/it',
      'en': '/en',
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({locale});
  
  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AtavicoLabs',
    url: 'https://atavicolabs.com',
    logo: 'https://atavicolabs.com/icon.svg',
    description: locale === 'it'
      ? 'Trasformiamo processi manuali in sistemi affidabili. Automazione operativa per PMI.'
      : 'We turn manual processes into reliable systems. Ops automation for SMEs.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@atavicolabs.com',
      contactType: 'customer service',
      availableLanguage: ['Italian', 'English'],
    },
    sameAs: [
      'https://github.com/atavicoLabs',
    ],
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <CustomCursor />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
