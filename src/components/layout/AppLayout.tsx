import type { ReactNode } from "react";

import { useSidebar } from "../../context/SidebarContext";
import { MobileSidebar } from "./MobileSidebar";
import { Sidebar } from "./Sidebar";

export function AppLayout({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="page-gradient relative h-screen w-full overflow-hidden">
      <div className="animate-float pointer-events-none absolute -left-24 top-10 size-[360px] rounded-full bg-violet/25 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 size-[340px] rounded-full bg-brand/25 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-[300px] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative z-10 flex h-full">
        <aside
          className={`hidden shrink-0 border-r border-hairline bg-panel backdrop-blur-xl transition-[width] duration-300 md:block ${
            collapsed ? "w-[76px]" : "w-[276px]"
          }`}
          aria-label="Workspace navigation"
        >
          <Sidebar />
        </aside>

        <MobileSidebar />

        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
