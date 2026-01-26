'use client';

import { Suspense, useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';
import { getCalendlyUrl } from '@/app/constants/links';
import { trackCtaClick } from '@/app/utils/track';

function ContactContent() {
  const t = useTranslations('contact');
  const calendlyUrl = getCalendlyUrl();
  const localeFromPath = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || 'it' : 'it';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const workflow = formData.get('workflow') as string;
    const tools = formData.getAll('tools') as string[];

    // Validation
    const newErrors: Record<string, string> = {};
    if (!name?.trim()) newErrors.name = t('form.errors.nameRequired');
    if (!email?.trim()) newErrors.email = t('form.errors.emailRequired');
    if (!workflow?.trim()) newErrors.workflow = t('form.errors.workflowRequired');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Build mailto
    const subject = `Audit 30 min — ${company || name}`;
    const body = `
Nome: ${name}
Email: ${email}
${company ? `Azienda: ${company}` : ''}

Flusso critico da automatizzare:
${workflow}

${tools.length > 0 ? `Strumenti utilizzati: ${tools.join(', ')}` : ''}
    `.trim();

    const mailtoUrl = `mailto:contact@atavicolabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Redirect to mailto
    window.location.href = mailtoUrl;
    
    // Reset submitting state after a delay
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="bg-carbone min-h-screen pt-20">
        {/* Hero */}
        <section className="relative py-24 lg:py-32 px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 mb-4">
              {t('eyebrow')}
            </div>
            <h1 className="font-display text-[40px] lg:text-[56px] font-medium text-sabbia mb-6 leading-[1.1]">
              {t('title')}
            </h1>
            <p className="text-[17px] leading-[1.65] text-sabbia/70 font-light max-w-2xl">
              {t('description')}
            </p>
            <p className="text-[13px] text-grigio/70 mt-4">
              {t('helper')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick('contact_primary', localeFromPath)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-oliva text-carbone text-[15px] font-medium hover:bg-oliva/90 transition-all"
              >
                {t('form.bookCall')}
                <Calendar size={18} />
              </a>
              <button
                type="button"
                onClick={() => setShowForm((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-oliva/30 text-oliva text-[15px] font-medium hover:bg-oliva/10 transition-all"
              >
                {t('form.preferWrite')}
                <ChevronDown size={16} className={`transition-transform ${showForm ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Form */}
        {showForm && (
        <section className="py-16 lg:py-24 px-6 lg:px-16">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-[13px] text-sabbia/80 mb-2 font-medium">
                  {t('form.name')} <span className="text-oliva">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full bg-grafite/30 border px-4 py-3 text-[15px] text-sabbia placeholder:text-grigio/40 focus:border-oliva/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone transition-colors ${
                    errors.name ? 'border-red-500/50' : 'border-grigio/20'
                  }`}
                  placeholder={t('form.namePlaceholder')}
                />
                {errors.name && (
                  <p className="text-[12px] text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[13px] text-sabbia/80 mb-2 font-medium">
                  {t('form.email')} <span className="text-oliva">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full bg-grafite/30 border px-4 py-3 text-[15px] text-sabbia placeholder:text-grigio/40 focus:border-oliva/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone transition-colors ${
                    errors.email ? 'border-red-500/50' : 'border-grigio/20'
                  }`}
                  placeholder={t('form.emailPlaceholder')}
                />
                {errors.email && (
                  <p className="text-[12px] text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-[13px] text-sabbia/80 mb-2 font-medium">
                  {t('form.company')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full bg-grafite/30 border border-grigio/20 px-4 py-3 text-[15px] text-sabbia placeholder:text-grigio/40 focus:border-oliva/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone transition-colors"
                  placeholder={t('form.companyPlaceholder')}
                />
              </div>

              {/* Workflow */}
              <div>
                <label htmlFor="workflow" className="block text-[13px] text-sabbia/80 mb-2 font-medium">
                  {t('form.workflow')} <span className="text-oliva">*</span>
                </label>
                <textarea
                  id="workflow"
                  name="workflow"
                  rows={3}
                  className={`w-full bg-grafite/30 border px-4 py-3 text-[15px] text-sabbia placeholder:text-grigio/40 focus:border-oliva/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva/60 focus-visible:ring-offset-2 focus-visible:ring-offset-carbone transition-colors resize-none ${
                    errors.workflow ? 'border-red-500/50' : 'border-grigio/20'
                  }`}
                  placeholder={t('form.workflowPlaceholder')}
                />
                {errors.workflow && (
                  <p className="text-[12px] text-red-400 mt-1">{errors.workflow}</p>
                )}
              </div>

              {/* Tools */}
              <div>
                <label className="block text-[13px] text-sabbia/80 mb-3 font-medium">
                  {t('form.tools')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['sheets', 'slack', 'notion', 'crm', 'jira', 'email', 'other'].map((tool) => (
                    <label key={tool} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="tools"
                        value={t(`form.toolOptions.${tool}`)}
                        className="w-4 h-4 bg-grafite/30 border border-grigio/30 text-oliva focus:ring-oliva/60 focus:ring-offset-carbone rounded"
                      />
                      <span className="text-[14px] text-sabbia/70 group-hover:text-sabbia transition-colors">
                        {t(`form.toolOptions.${tool}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-oliva/30 text-oliva text-[15px] font-medium hover:bg-oliva/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('form.submitting') : t('form.submit')}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Alternative Contact */}
        <section className="py-16 px-6 lg:px-16 border-t border-grigio/20">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-[13px] uppercase tracking-wider text-grigio/60 mb-2">{t('alternative.email')}</h3>
              <a href="mailto:contact@atavicolabs.com" className="text-[15px] text-sabbia hover:text-oliva transition-colors">
                contact@atavicolabs.com
              </a>
            </div>
            <div>
              <h3 className="text-[13px] uppercase tracking-wider text-grigio/60 mb-2">{t('alternative.location')}</h3>
              <p className="text-[15px] text-sabbia/70">Milano, Italia</p>
            </div>
            <div>
              <h3 className="text-[13px] uppercase tracking-wider text-grigio/60 mb-2">{t('alternative.response')}</h3>
              <p className="text-[15px] text-sabbia/70">{t('alternative.responseTime')}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactContent />
    </Suspense>
  );
}
