import { MessageSquare } from "lucide-react";
import { useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

import { useSidebar } from "../../context/SidebarContext";
import { ALL_CHATS, useChats } from "../../hooks/useChats";
import { useFolders } from "../../hooks/useFolders";
import { Tooltip } from "../common/Tooltip";
import { FolderList } from "../folders/FolderList";
import { HistoryList } from "../history/HistoryList";
import { HistorySearch } from "../history/HistorySearch";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";

interface SidebarProps {
  /** Mobile drawer renders the expanded layout and closes on navigation. */
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export function Sidebar({ variant = "desktop", onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const { collapsed, toggleCollapsed } = useSidebar();
  const isCollapsed = variant === "desktop" && collapsed;
  const [activeFolderId, setActiveFolderId] = useState<string>(ALL_CHATS);

  const { chats, query, setQuery, countForFolder, hydrated, createChat, deleteChat, renameChat, moveChatToFolder } =
    useChats(activeFolderId);
  const { folders } = useFolders();

  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const params = useParams({ strict: false }) as { chatId?: string };
  const activeChatId = pathname.startsWith("/chat/") ? params.chatId : undefined;

  const openChat = (chatId: string) => {
    void navigate({ to: "/chat/$chatId", params: { chatId } });
    onNavigate?.();
  };

  const startNewChat = () => {
    const chat = createChat();
    openChat(chat.id);
  };

  const emptyLabel = activeFolderId === ALL_CHATS ? "No conversations yet." : "No chats in this folder.";

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <SidebarHeader
        collapsed={isCollapsed}
        onNewChat={startNewChat}
        {...(variant === "desktop" ? { onToggleCollapsed: toggleCollapsed } : {})}
      />

      {isCollapsed ? (
        <div className="flex flex-1 flex-col items-center gap-2">
          <Tooltip label="All chats">
            <button
              type="button"
              aria-label="All chats"
              onClick={toggleCollapsed}
              className="grid size-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface-strong hover:text-foreground"
            >
              <MessageSquare className="size-4" aria-hidden />
            </button>
          </Tooltip>
        </div>
      ) : (
        <>
          <FolderList activeFolderId={activeFolderId} onSelect={setActiveFolderId} countForFolder={countForFolder} />

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="px-1.5 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-foreground">
                Recent Chats
              </span>
            </div>
            <HistorySearch value={query} onChange={setQuery} />
            <nav aria-label="Chat history" className="min-h-0 flex-1 overflow-y-auto pr-1">
              {hydrated ? (
                <HistoryList
                  chats={chats}
                  folders={folders}
                  emptyLabel={emptyLabel}
                  {...(activeChatId ? { activeChatId } : {})}
                  onOpen={openChat}
                  onRename={renameChat}
                  onDelete={(chatId) => {
                    deleteChat(chatId);
                    if (chatId === activeChatId) void navigate({ to: "/" });
                  }}
                  onMove={moveChatToFolder}
                />
              ) : null}
            </nav>
          </div>
        </>
      )}

      <SidebarFooter collapsed={isCollapsed} />
    </div>
  );
}
