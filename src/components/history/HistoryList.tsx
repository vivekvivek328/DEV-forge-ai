import type { Chat } from "../../types/chat";
import type { Folder } from "../../types/folder";
import { HistoryItem } from "./HistoryItem";

interface HistoryListProps {
  chats: Chat[];
  folders: Folder[];
  activeChatId?: string;
  emptyLabel: string;
  onOpen: (chatId: string) => void;
  onRename: (chatId: string, title: string) => void;
  onDelete: (chatId: string) => void;
  onMove: (chatId: string, folderId?: string) => void;
}

export function HistoryList({
  chats,
  folders,
  activeChatId,
  emptyLabel,
  onOpen,
  onRename,
  onDelete,
  onMove,
}: HistoryListProps) {
  if (chats.length === 0) {
    return <p className="px-2.5 py-3 text-[13px] text-subtle-foreground">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-1">
      {chats.map((chat) => (
        <HistoryItem
          key={chat.id}
          chat={chat}
          folders={folders}
          active={chat.id === activeChatId}
          onOpen={onOpen}
          onRename={onRename}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </ul>
  );
}
