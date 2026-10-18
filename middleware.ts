import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './src/i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

const SESSION_COOKIE = 'sb-tools-session';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Match /(it|en)/tools and /(it|en)/tools/*
  const toolsMatch = pathname.match(/^\/(it|en)\/tools(\/.*)?$/);

  if (toolsMatch) {
    const locale = toolsMatch[1];
    const subpath = toolsMatch[2] ?? '';
    const isLoginPage = subpath === '/login' || subpath.startsWith('/login/');
    const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

    // Already logged in visiting login → send to crm
    if (isLoginPage && hasSession) {
      return NextResponse.redirect(new URL(`/${locale}/tools/crm`, request.url));
    }

    // Not logged in visiting a protected route → send to login
    if (!isLoginPage && !hasSession) {
      return NextResponse.redirect(new URL(`/${locale}/tools/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except /api, /_next, /_vercel, and files with extensions
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
