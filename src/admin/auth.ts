const SESSION_KEY = 'infinitemart_admin_session';
const DEFAULT_PASSWORD = 'infinite2026';

function getAdminPassword(): string {
  return (import.meta as any).env?.VITE_ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function login(username: string, password: string): boolean {
  if (username.trim().toLowerCase() !== 'admin') return false;
  if (password !== getAdminPassword()) return false;
  sessionStorage.setItem(SESSION_KEY, 'true');
  return true;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}
