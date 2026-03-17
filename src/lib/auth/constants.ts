export type UserRole = 'resident' | 'candidate' | 'staff';

export interface Session {
  id: string;
  role: UserRole;
  name: string;
}

export const COOKIE_NAME = 'elect-session';
export const AUTH_SECRET = process.env.AUTH_SECRET || 'electai-demo-secret-2026';

export const PROTECTED_ROUTES: Record<string, UserRole> = {
  '/candidate': 'candidate',
  '/staff': 'staff',
};
