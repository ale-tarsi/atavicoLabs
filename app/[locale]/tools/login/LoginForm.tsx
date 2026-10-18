'use client';

import { useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Lock } from 'lucide-react';
import { loginAction } from '@/app/actions/auth';

export default function LoginForm() {
  const t = useTranslations('toolsLogin');
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('locale', locale);
    setError(null);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(
          result.error === 'invalid_credentials'
            ? t('errorInvalid')
            : t('errorGeneric'),
        );
      }
    });
  }

  const inputStyle = {
    backgroundColor: '#0B0C0D',
    borderColor: '#2A2B2E',
    color: '#C8C5B8',
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#0B0C0D' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ backgroundColor: '#141517', border: '1px solid #1C1D20' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#1C1D20' }}
          >
            <Lock size={18} style={{ color: '#5A6D5A' }} />
          </div>
          <h1
            className="font-display text-lg font-semibold mb-1"
            style={{ color: '#E8E6DC' }}
          >
            AtavicoLabs
          </h1>
          <p className="text-xs" style={{ color: '#6B6960' }}>
            {t('subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium mb-1.5"
              style={{ color: '#8A8C8E' }}
            >
              {t('emailLabel')}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={t('emailPlaceholder')}
              disabled={isPending}
              className="w-full text-sm rounded-xl px-4 py-3 border outline-none transition-colors focus:border-oliva disabled:opacity-50"
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium mb-1.5"
              style={{ color: '#8A8C8E' }}
            >
              {t('passwordLabel')}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder={t('passwordPlaceholder')}
              disabled={isPending}
              className="w-full text-sm rounded-xl px-4 py-3 border outline-none transition-colors focus:border-oliva disabled:opacity-50"
              style={inputStyle}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-xs text-center py-2 px-3 rounded-lg"
              style={{
                color: '#E05C5C',
                backgroundColor: 'rgba(224,92,92,0.1)',
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
            style={{ backgroundColor: '#5A6D5A', color: '#E8E6DC' }}
          >
            {isPending ? t('loading') : t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
