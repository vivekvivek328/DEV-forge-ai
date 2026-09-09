import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";

export type Theme = "dark" | "light";

interface SidebarContextValue {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setCollapsed(readStorage<boolean>(STORAGE_KEYS.sidebarCollapsed, false));
    setTheme(readStorage<Theme>(STORAGE_KEYS.theme, "dark"));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      writeStorage(STORAGE_KEYS.sidebarCollapsed, !prev);
      return !prev;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      writeStorage(STORAGE_KEYS.theme, next);
      return next;
    });
  }, []);

  const value = useMemo<SidebarContextValue>(
    () => ({
      collapsed,
      toggleCollapsed,
      mobileOpen,
      openMobile: () => setMobileOpen(true),
      closeMobile: () => setMobileOpen(false),
      theme,
      toggleTheme,
    }),
    [collapsed, mobileOpen, theme, toggleCollapsed, toggleTheme],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used inside <SidebarProvider>");
  return context;
}
