import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.info('[track:event]', body);
  } catch (error) {
    console.error('[track:error]', error);
  }

  return NextResponse.json({ ok: true });
}
