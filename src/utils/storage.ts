/**
 * Centralized localStorage access. Components and hooks must go through this
 * module instead of touching window.localStorage directly.
 */

export const STORAGE_KEYS = {
  chats: "orchestrator.chats",
  folders: "orchestrator.folders",
  theme: "orchestrator.theme",
  sidebarCollapsed: "orchestrator.sidebar-collapsed",
} as const;

export const isBrowser = (): boolean => typeof window !== "undefined";

export function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — non-fatal */
  }
}

export function removeStorage(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
