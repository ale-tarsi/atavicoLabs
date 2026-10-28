import {getTranslations} from 'next-intl/server';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import CalculatorBand from '@/app/components/CalculatorBand';
import HomeProcess from '@/app/components/HomeProcess';
import Portfolio from '@/app/components/Portfolio';
import CTA from '@/app/components/CTA';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import { ArrowRight } from 'lucide-react';
import Offerings from '@/app/components/Offerings';
import SectionHeader from '@/app/components/SectionHeader';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});
  
  const title = t('title');
  const description = t('description');
  const keywords = t('keywords');
  
  return {
    title,
    description,
    keywords,
    authors: [{name: 'AtavicoLabs'}],
    creator: 'AtavicoLabs',
    publisher: 'AtavicoLabs',
    alternates: {
      canonical: `https://atavicolabs.com/${locale === 'it' ? 'it' : 'en'}`,
      languages: {
        'it': 'https://atavicolabs.com/it',
        'en': 'https://atavicolabs.com/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      url: `https://atavicolabs.com/${locale === 'it' ? 'it' : 'en'}`,
      siteName: 'AtavicoLabs',
      title,
      description,
      images: [
        {
          url: 'https://atavicolabs.com/og/default.png',
          width: 1200,
          height: 630,
          alt: 'AtavicoLabs - Digital Product Studio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://atavicolabs.com/og/default.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHome = await getTranslations({ locale, namespace: 'home' });

  return (
    <main className="min-h-screen">
      {/* Navbar - Fixed glass effect */}
      <Navbar />
      
      {/* 1. Hero */}
      <Hero />
      
      {/* 3. Ways to Start - Entry points */}
      <section id="starting-points" className="relative pt-24 lg:pt-32 pb-20 lg:pb-28 bg-grafite scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            align="center"
            eyebrow={tHome('startingPoints.eyebrow')}
            title={tHome('startingPoints.title')}
            subtitle={tHome('startingPoints.description')}
            className="mb-12 [&_h2]:text-[36px] [&_h2]:lg:text-[48px] [&_p]:max-w-2xl [&_p]:mx-auto [&_p]:text-sabbia/80"
          />
          <Offerings />
        </div>
      </section>
      
      {/* 4. Portfolio */}
      <section id="portfolio" className="scroll-mt-24">
        <Portfolio />
      </section>
      
      {/* 5. Process */}
      <HomeProcess />

      <CalculatorBand />
      
      {/* 6. About */}
      <section id="about" className="scroll-mt-24">
        <About />
      </section>
      
      {/* 8. CTA finale - Conversione */}
      <section id="contact" className="scroll-mt-24">
        <CTA />
      </section>
      
      {/* Floating language selector (bottom-right) */}
      <LanguageSwitcher />

      {/* Footer */}
      <Footer />
    </main>
  );
}
