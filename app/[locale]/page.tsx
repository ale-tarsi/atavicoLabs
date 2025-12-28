import {getTranslations} from 'next-intl/server';
import Hero from '@/app/components/Hero';
import Outcomes from '@/app/components/Outcomes';
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

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navbar - Fixed glass effect */}
      <Navbar />
      
      {/* 1. Hero - Launch Sprint offer */}
      <Hero />
      
      {/* 2. Outcomes - What you get in 14 days */}
      <Outcomes />
      
      {/* 3. Portfolio - Selected case studies (3 max) */}
      <section id="portfolio" className="scroll-mt-24">
        <Portfolio />
      </section>
      
      {/* 4. Services - Capabilities */}
      <section id="services" className="scroll-mt-24">
        <ServicesSection />
      </section>
      
      {/* 5. Process - How We Work */}
      <section id="process" className="scroll-mt-24">
        <Process />
      </section>
      
      {/* 6. About - Who We Are */}
      <section id="about" className="scroll-mt-24">
        <About />
      </section>
      
      {/* 7. Testimonials - Trust */}
      <Testimonials />
      
      {/* 8. Blog - Value */}
      <section id="blog" className="scroll-mt-24">
        <Blog />
      </section>
      
      {/* Newsletter - Disabled */}
      {/* <Newsletter /> */}
      
      {/* 9. CTA finale - Conversion */}
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
