import { Session, COOKIE_NAME, AUTH_SECRET } from './constants';

function encodeSession(session: Session): string {
  const payload = JSON.stringify(session);
  const signature = simpleSign(payload);
  return Buffer.from(payload).toString('base64') + '.' + signature;
}

function decodeSession(cookie: string): Session | null {
  try {
    const [payloadB64, signature] = cookie.split('.');
    if (!payloadB64 || !signature) return null;

    const payload = Buffer.from(payloadB64, 'base64').toString('utf-8');
    if (simpleSign(payload) !== signature) return null;

    return JSON.parse(payload) as Session;
  } catch {
    return null;
  }
}

function simpleSign(data: string): string {
  let hash = 0;
  const str = data + AUTH_SECRET;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export function createSessionCookie(session: Session): string {
  return encodeSession(session);
}

export function parseSessionCookie(cookieValue: string): Session | null {
  return decodeSession(cookieValue);
}

export { COOKIE_NAME };
