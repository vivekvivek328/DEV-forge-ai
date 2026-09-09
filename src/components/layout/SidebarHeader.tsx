import { Hexagon, PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";

import { Tooltip } from "../common/Tooltip";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapsed?: () => void;
  onNewChat: () => void;
}

export function SidebarHeader({ collapsed, onToggleCollapsed, onNewChat }: SidebarHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className={`flex items-center gap-2.5 pt-1 ${collapsed ? "justify-center" : "px-1.5"}`}>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-violet text-brand-foreground shadow-lg shadow-brand/30">
          <Hexagon className="size-4" aria-hidden />
        </span>
        {!collapsed ? (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[15px] font-bold tracking-tight">Orchestrator AI</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle-foreground">local · v0.4</p>
          </div>
        ) : null}
        {!collapsed && onToggleCollapsed ? (
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label="Collapse sidebar"
            className="ml-auto grid size-8 place-items-center rounded-lg text-subtle-foreground transition hover:bg-surface-strong hover:text-foreground"
          >
            <PanelLeftClose className="size-4" aria-hidden />
          </button>
        ) : null}
      </div>

      {collapsed && onToggleCollapsed ? (
        <Tooltip label="Expand sidebar">
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label="Expand sidebar"
            className="grid size-9 place-items-center rounded-lg text-subtle-foreground transition hover:bg-surface-strong hover:text-foreground"
          >
            <PanelLeftOpen className="size-4" aria-hidden />
          </button>
        </Tooltip>
      ) : null}

      {collapsed ? (
        <Tooltip label="New chat">
          <button
            type="button"
            onClick={onNewChat}
            aria-label="New chat"
            className="grid size-9 place-items-center rounded-xl bg-gradient-to-r from-brand to-violet text-brand-foreground shadow-lg shadow-brand/25 transition hover:brightness-110"
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </Tooltip>
      ) : (
        <button
          type="button"
          onClick={onNewChat}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-violet py-2.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition hover:brightness-110"
        >
          <Plus className="size-4" aria-hidden />
          New Chat
        </button>
      )}
    </div>
  );
}
