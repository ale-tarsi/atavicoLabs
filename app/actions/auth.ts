'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const SESSION_COOKIE = 'sb-tools-session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function loginAction(
  formData: FormData,
): Promise<{ error: string } | never> {
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;
  const locale = (formData.get('locale') as string) || 'it';

  if (!email || !password) {
    return { error: 'invalid_credentials' };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return { error: 'invalid_credentials' };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  redirect(`/${locale}/tools/crm`);
}

export async function logoutAction(formData: FormData): Promise<never> {
  const locale = (formData.get('locale') as string) || 'it';
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect(`/${locale}/tools/login`);
}
