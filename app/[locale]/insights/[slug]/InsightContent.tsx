'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { InsightArticle } from '../../../constants/insights';

interface InsightContentProps {
  article: InsightArticle;
  locale: string;
  formattedDate: string;
}

export default function InsightContent({ article, locale, formattedDate }: InsightContentProps) {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-carbone">
      {/* Back Navigation */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
          <Link 
            href={`/${locale}#blog`}
            className="inline-flex items-center gap-2 text-grigio hover:text-sabbia transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Insights</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 py-12 border-b border-grigio/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.45, 0, 0.55, 1] }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div className="inline-block px-3 py-1 bg-oliva/10 border border-oliva/20 rounded-sm">
              <span className="text-xs uppercase tracking-wider text-oliva font-medium">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-sabbia tracking-tight leading-[1.1]">
              {article.title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-grigio max-w-3xl leading-relaxed">
              {article.subtitle}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-grigio/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.publishedAt}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readingTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative z-10 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div 
            className="prose prose-invert max-w-none
              prose-headings:font-medium prose-headings:text-sabbia prose-headings:tracking-tight
              prose-h2:text-[28px] prose-h2:mt-14 prose-h2:mb-5 prose-h2:leading-[1.2]
              prose-h3:text-[22px] prose-h3:mt-10 prose-h3:mb-4 prose-h3:leading-[1.3]
              prose-p:text-[17px] prose-p:text-grigio prose-p:leading-[1.7] prose-p:mb-5 prose-p:font-light
              prose-a:text-oliva prose-a:no-underline hover:prose-a:text-sabbia prose-a:transition-colors prose-a:font-normal
              prose-strong:text-sabbia prose-strong:font-medium
              prose-ul:my-6 prose-ul:text-grigio prose-ul:text-[17px] prose-ul:leading-[1.7]
              prose-li:my-2.5 prose-li:pl-2 prose-li:font-light
              prose-ol:my-6 prose-ol:text-grigio prose-ol:text-[17px] prose-ol:leading-[1.7]
              prose-code:text-sabbia prose-code:bg-grigio/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[15px] prose-code:font-normal
              prose-pre:bg-grigio/5 prose-pre:border prose-pre:border-grigio/10 prose-pre:rounded prose-pre:p-4 prose-pre:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>

      {/* CTA Section */}
      <section className="relative py-32 px-6 border-t border-grigio/10">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23D3D1C8'/%3E%3C/svg%3E")`,
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl md:text-[40px] font-medium text-sabbia leading-[1.15] tracking-tight">
            Ready to build your next product?
          </h2>
          
          <p className="text-[17px] text-grigio/80 max-w-xl mx-auto leading-[1.7] font-light">
            We transform complex challenges into elegant digital solutions. 
            Let&apos;s discuss your project and create something exceptional together.
          </p>

          <div className="pt-4">
            <a
              href="mailto:contact@atavicolabs.com"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4
                bg-oliva text-carbone text-sm font-medium rounded-sm
                hover:bg-oliva/90 hover:-translate-y-0.5
                transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
