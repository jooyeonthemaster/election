import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'elect-session';

function parseSession(cookieValue: string) {
  try {
    const [payloadB64] = cookieValue.split('.');
    if (!payloadB64) return null;
    const payload = atob(payloadB64);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get(COOKIE_NAME);

  const session = cookie ? parseSession(cookie.value) : null;

  // /candidate/* requires candidate role
  if (pathname.startsWith('/candidate')) {
    if (!session || session.role !== 'candidate') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // /staff/* requires staff role
  if (pathname.startsWith('/staff')) {
    if (!session || session.role !== 'staff') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/candidate/:path*', '/staff/:path*'],
};
