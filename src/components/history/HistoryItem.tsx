import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import type { Chat } from "../../types/chat";
import type { Folder } from "../../types/folder";
import { formatRelativeTime } from "../../utils/formatters";
import { Dropdown, type DropdownItem } from "../common/Dropdown";

interface HistoryItemProps {
  chat: Chat;
  active: boolean;
  folders: Folder[];
  onOpen: (chatId: string) => void;
  onRename: (chatId: string, title: string) => void;
  onDelete: (chatId: string) => void;
  onMove: (chatId: string, folderId?: string) => void;
}

export function HistoryItem({ chat, active, folders, onOpen, onRename, onDelete, onMove }: HistoryItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(chat.title);

  const menuItems: DropdownItem[] = [
    {
      label: "Rename",
      onSelect: () => {
        setDraft(chat.title);
        setEditing(true);
      },
    },
    ...folders
      .filter((folder) => folder.id !== chat.folderId)
      .map((folder) => ({
        label: `Move to ${folder.name}`,
        onSelect: () => onMove(chat.id, folder.id),
      })),
    ...(chat.folderId ? [{ label: "Remove from folder", onSelect: () => onMove(chat.id) }] : []),
    { label: "Delete chat", onSelect: () => onDelete(chat.id), destructive: true },
  ];

  const commitRename = () => {
    setEditing(false);
    onRename(chat.id, draft);
  };

  return (
    <li
      className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 transition ${
        active ? "bg-gradient-to-r from-brand/15 to-transparent ring-1 ring-brand/20" : "hover:bg-surface-strong"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 shrink-0 rounded-full ${active ? "animate-pulse-dot bg-accent" : "bg-subtle-foreground/60"}`}
      />
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitRename}
          onKeyDown={(event) => {
            if (event.key === "Enter") commitRename();
            if (event.key === "Escape") setEditing(false);
          }}
          aria-label="Chat title"
          className="min-w-0 flex-1 rounded border border-hairline bg-surface px-1.5 py-0.5 text-[13px] focus:outline-none"
        />
      ) : (
        <button
          type="button"
          onClick={() => onOpen(chat.id)}
          className="min-w-0 flex-1 text-left"
          aria-current={active ? "page" : undefined}
        >
          <span className={`block truncate text-[13px] ${active ? "font-medium" : "text-muted-foreground"}`}>
            {chat.title}
          </span>
          <span className="block font-mono text-[10px] text-subtle-foreground">
            {formatRelativeTime(chat.updatedAt)}
          </span>
        </button>
      )}
      <Dropdown
        label={`Actions for ${chat.title}`}
        items={menuItems}
        trigger={<MoreHorizontal className="size-4" aria-hidden />}
      />
    </li>
  );
}
