import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Services from '@/app/components/Services';
import ServicesSection from '@/app/components/ServicesSection';
import Process from '@/app/components/Process';
import Portfolio from '@/app/components/Portfolio';
import Testimonials from '@/app/components/Testimonials';
import Blog from '@/app/components/Blog';
import Newsletter from '@/app/components/Newsletter';
import CTA from '@/app/components/CTA';
import Footer from '@/app/components/Footer';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import Navbar from '@/app/components/Navbar';
import ProofsSection from '@/app/components/ProofsSection';
import { FEATURES } from '@/app/constants/features';
import { ArrowRight } from 'lucide-react';
import StartingPoints from '@/app/components/StartingPoints';

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
          url: 'https://atavicolabs.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AtavicoLabs - Digital Product Development',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://atavicolabs.com/og-image.jpg'],
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
      
      {/* 1. Hero - Ispirazione */}
      <Hero />
      
      {/* 2. Ways to Start - Entry points */}
      <section id="starting-points" className="relative py-20 lg:py-28 px-6 lg:px-16 bg-grafite border-y border-grigio/20 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4">
              {tHome('startingPoints.eyebrow')}
            </div>
            <h2 className="font-display text-[36px] lg:text-[48px] font-medium text-sabbia mb-4 leading-[1.1]">
              {tHome('startingPoints.title')}
            </h2>
            <p className="text-[16px] leading-[1.65] text-sabbia/70 font-light max-w-2xl mx-auto">
              {tHome('startingPoints.description')}
            </p>
          </div>

          <StartingPoints />

          <div className="mt-12 flex justify-center">
            <Link
              href={`/${locale}/contact?interest=other`}
              className="inline-flex items-center gap-2 px-7 py-3 bg-oliva text-carbone text-[14px] font-medium hover:bg-oliva/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone"
            >
              {tHome('startingPoints.requestAudit')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* 2.5. Automation Proofs - Proof of reliability */}
      <ProofsSection />
      
      {/* 3. Capabilities - Le nostre competenze al lavoro */}
      <section id="capabilities" className="scroll-mt-24">
        <ServicesSection />
      </section>
      
      {/* 3. Portfolio - Prova concreta */}
      <section id="portfolio" className="scroll-mt-24">
        <Portfolio />
      </section>
      
      {/* 4. Process - Coinvolgimento (How We Work) */}
      <section id="process" className="scroll-mt-24">
        <Process />
      </section>
      
      {/* 5. About - Credibilità sintetica (Chi Siamo) */}
      <section id="about" className="scroll-mt-24">
        <About />
      </section>
      
      {/* 6. Testimonials - Fiducia (disabled: placeholder data) */}
      {FEATURES.TESTIMONIALS_ENABLED && <Testimonials />}
      
      {/* 7. Blog - Valore (disabled: placeholder articles) */}
      {FEATURES.BLOG_ENABLED && (
        <section id="blog" className="scroll-mt-24">
          <Blog />
        </section>
      )}
      
      {/* Newsletter - Disabled */}
      {/* <Newsletter /> */}
      
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
