import { Moon, Sun } from "lucide-react";

import { useSidebar } from "../../context/SidebarContext";
import { Avatar } from "../common/Avatar";

export function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  const { theme, toggleTheme } = useSidebar();

  return (
    <div
      className={`flex items-center border-t border-hairline pt-3 ${collapsed ? "justify-center" : "justify-between"}`}
    >
      {!collapsed ? (
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar initials="DK" />
          <span className="truncate text-[13px] text-muted-foreground">dev_kai</span>
        </div>
      ) : null}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="grid size-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface-strong hover:text-foreground"
      >
        {theme === "dark" ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
