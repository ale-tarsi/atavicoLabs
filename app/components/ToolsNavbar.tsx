'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

const TOOLS_LINKS = [{ href: '/tools/crm', label: 'CRM' }];

export default function ToolsNavbar() {
  const locale = useLocale();
  const t = useTranslations('toolsNav');
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 sm:px-8 h-14 border-b"
      style={{ backgroundColor: '#0B0C0D', borderColor: '#1C1D20' }}
    >
      {/* Logo */}
      <Link
        href={`/${locale}`}
        className="font-display text-sm font-semibold transition-opacity hover:opacity-60"
        style={{ color: '#E8E6DC' }}
      >
        AtavicoLabs
      </Link>

      {/* Tool links */}
      <nav className="flex items-center gap-1">
        {TOOLS_LINKS.map(({ href, label }) => {
          const fullHref = `/${locale}${href}`;
          const isActive = pathname === fullHref;
          return (
            <Link
              key={href}
              href={fullHref}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{
                color: isActive ? '#E8E6DC' : '#6B6960',
                backgroundColor: isActive ? '#1C1D20' : 'transparent',
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <form action={logoutAction}>
        <input type="hidden" name="locale" value={locale} />
        <button
          type="submit"
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:border-oliva/40"
          style={{ borderColor: '#2A2B2E', color: '#6B6960' }}
        >
          <LogOut size={13} />
          {t('logout')}
        </button>
      </form>
    </header>
  );
}
