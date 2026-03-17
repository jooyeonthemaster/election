import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth/credentials';
import { createSessionCookie, COOKIE_NAME } from '@/lib/auth/session';

export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();

    const session = authenticate(id, password);
    if (!session) {
      return NextResponse.json(
        { error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    const cookieValue = createSessionCookie(session);
    const response = NextResponse.json({ success: true, session });

    response.cookies.set(COOKIE_NAME, cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
