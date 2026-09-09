import { Folder as FolderIcon, LayoutGrid } from "lucide-react";
import { useState } from "react";

import { FolderDropdown } from "./FolderDropdown";

interface FolderItemProps {
  name: string;
  count: number;
  active: boolean;
  isAllChats?: boolean;
  onOpen: () => void;
  onRename?: (name: string) => void;
  onDelete?: () => void;
}

export function FolderItem({ name, count, active, isAllChats = false, onOpen, onRename, onDelete }: FolderItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  const commit = () => {
    setEditing(false);
    onRename?.(draft);
  };

  return (
    <li
      className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition ${
        active ? "bg-surface-strong font-medium ring-1 ring-hairline" : "text-muted-foreground hover:bg-surface-strong"
      }`}
    >
      {isAllChats ? (
        <LayoutGrid className="size-3.5 shrink-0" aria-hidden />
      ) : (
        <FolderIcon className="size-3.5 shrink-0" aria-hidden />
      )}
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") commit();
            if (event.key === "Escape") setEditing(false);
          }}
          aria-label="Folder name"
          className="min-w-0 flex-1 rounded border border-hairline bg-surface px-1.5 py-0.5 text-[13px] focus:outline-none"
        />
      ) : (
        <button type="button" onClick={onOpen} className="min-w-0 flex-1 truncate text-left">
          {name}
        </button>
      )}
      <span className="font-mono text-[10px] text-subtle-foreground">{count}</span>
      {!isAllChats && onRename && onDelete ? (
        <FolderDropdown
          folderName={name}
          onRename={() => {
            setDraft(name);
            setEditing(true);
          }}
          onDelete={onDelete}
        />
      ) : null}
    </li>
  );
}
