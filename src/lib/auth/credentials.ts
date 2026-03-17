import { Session } from './constants';

const DEMO_USERS = [
  { id: 'candidate1', password: 'demo1234', role: 'candidate' as const, name: '네안데르 후보' },
  { id: 'staff1', password: 'demo1234', role: 'staff' as const, name: '캠프 관리자' },
];

export function authenticate(id: string, password: string): Session | null {
  const user = DEMO_USERS.find(u => u.id === id && u.password === password);
  if (!user) return null;
  return { id: user.id, role: user.role, name: user.name };
}

export function getDemoUsers() {
  return DEMO_USERS.map(u => ({ id: u.id, password: u.password, role: u.role, name: u.name }));
}
