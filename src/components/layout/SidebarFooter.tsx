import { LogOut, Moon, Sun } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth, useProfile } from "../../hooks/useAuth";
import { Avatar } from "../common/Avatar";

function initialsFrom(name: string): string {
  const parts = name.trim().split(/[\s._-]+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0] ?? "");
  return (letters.join("") || name.slice(0, 2)).toUpperCase();
}

export function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  const { theme, toggleTheme } = useSidebar();
  const { user } = useAuth();
  const profile = useProfile(user?.id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const name = profile?.display_name ?? user?.email?.split("@")[0] ?? "Signed in";

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  };

  return (
    <div
      className={`flex items-center border-t border-hairline pt-3 ${collapsed ? "flex-col gap-2" : "justify-between"}`}
    >
      {!collapsed ? (
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar initials={initialsFrom(name)} />
          <span className="truncate text-[13px] text-muted-foreground">{name}</span>
        </div>
      ) : null}

      <div className={`flex items-center ${collapsed ? "flex-col gap-1" : "gap-0.5"}`}>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="grid size-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface-strong hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
        </button>
        <button
          type="button"
          onClick={() => void handleSignOut()}
          aria-label="Sign out"
          className="grid size-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface-strong hover:text-foreground"
        >
          <LogOut className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
