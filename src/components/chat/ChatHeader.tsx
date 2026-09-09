import { Hexagon, Menu } from "lucide-react";

import { useSidebar } from "../../context/SidebarContext";
import { Badge } from "../common/Badge";

interface ChatHeaderProps {
  title: string;
  isRunning: boolean;
}

export function ChatHeader({ title, isRunning }: ChatHeaderProps) {
  const { openMobile } = useSidebar();

  return (
    <header className="flex items-center gap-3 border-b border-hairline px-4 py-3 md:px-5">
      <button
        type="button"
        onClick={openMobile}
        aria-label="Open navigation"
        className="grid size-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface-strong md:hidden"
      >
        <Menu className="size-4" aria-hidden />
      </button>
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-strong">
          <Hexagon className="size-3.5" aria-hidden />
        </span>
        <h1 className="truncate font-medium">{title}</h1>
      </div>
      {isRunning ? (
        <span className="ml-auto shrink-0">
          <Badge tone="accent">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" />
            Orchestrating
          </Badge>
        </span>
      ) : null}
    </header>
  );
}
