import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSessionCookie, COOKIE_NAME } from '@/lib/auth/session';

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);

  if (!cookie) {
    return NextResponse.json({ session: null }, { status: 401 });
  }

  const session = parseSessionCookie(cookie.value);
  if (!session) {
    return NextResponse.json({ session: null }, { status: 401 });
  }

  return NextResponse.json({ session });
}
