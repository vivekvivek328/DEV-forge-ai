import { useMemo, useState } from "react";

import { useChatStore } from "../context/ChatContext";
import type { Chat } from "../types/chat";
import { filterChats, sortChatsByRecency } from "../utils/chatUtils";

export const ALL_CHATS = "all" as const;

export function useChats(folderId: string = ALL_CHATS) {
  const store = useChatStore();
  const [query, setQuery] = useState("");

  const visibleChats: Chat[] = useMemo(() => {
    const scoped = folderId === ALL_CHATS ? store.chats : store.chats.filter((chat) => chat.folderId === folderId);
    return sortChatsByRecency(filterChats(scoped, query));
  }, [store.chats, folderId, query]);

  const countForFolder = useMemo(
    () => (id: string) =>
      id === ALL_CHATS ? store.chats.length : store.chats.filter((chat) => chat.folderId === id).length,
    [store.chats],
  );

  return {
    chats: visibleChats,
    query,
    setQuery,
    countForFolder,
    hydrated: store.hydrated,
    createChat: store.createChat,
    deleteChat: store.deleteChat,
    renameChat: store.renameChat,
    moveChatToFolder: store.moveChatToFolder,
  };
}
