import { X } from "lucide-react";
import { useEffect } from "react";

import { useSidebar } from "../../context/SidebarContext";
import { Sidebar } from "./Sidebar";

export function MobileSidebar() {
  const { mobileOpen, closeMobile } = useSidebar();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  if (!mobileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button type="button" aria-label="Close navigation" className="absolute inset-0 bg-black/60" onClick={closeMobile} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="animate-msg-in relative h-full w-[280px] max-w-[85vw] border-r border-hairline bg-panel backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={closeMobile}
          aria-label="Close navigation"
          className="absolute right-3 top-4 z-10 grid size-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface-strong"
        >
          <X className="size-4" aria-hidden />
        </button>
        <Sidebar variant="mobile" onNavigate={closeMobile} />
      </div>
    </div>
  );
}
