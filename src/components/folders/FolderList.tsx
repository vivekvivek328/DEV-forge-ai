import { Plus } from "lucide-react";
import { useState } from "react";

import { useFolders } from "../../hooks/useFolders";
import { ALL_CHATS } from "../../hooks/useChats";
import { CreateFolderDialog } from "./CreateFolderDialog";
import { FolderItem } from "./FolderItem";

interface FolderListProps {
  activeFolderId: string;
  onSelect: (folderId: string) => void;
  countForFolder: (folderId: string) => number;
}

export function FolderList({ activeFolderId, onSelect, countForFolder }: FolderListProps) {
  const { folders, createFolder, renameFolder, deleteFolder } = useFolders();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between px-1.5 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-foreground">Folders</span>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          aria-label="Add folder"
          className="grid size-5 place-items-center rounded text-subtle-foreground transition hover:text-foreground"
        >
          <Plus className="size-3.5" aria-hidden />
        </button>
      </div>

      <ul className="space-y-1">
        <FolderItem
          name="All Chats"
          isAllChats
          count={countForFolder(ALL_CHATS)}
          active={activeFolderId === ALL_CHATS}
          onOpen={() => onSelect(ALL_CHATS)}
        />
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            name={folder.name}
            count={countForFolder(folder.id)}
            active={activeFolderId === folder.id}
            onOpen={() => onSelect(folder.id)}
            onRename={(name) => renameFolder(folder.id, name)}
            onDelete={() => {
              deleteFolder(folder.id);
              if (activeFolderId === folder.id) onSelect(ALL_CHATS);
            }}
          />
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-subtle-foreground transition hover:bg-surface-strong hover:text-foreground"
      >
        <Plus className="size-3.5" aria-hidden />
        Add Folder
      </button>

      <CreateFolderDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={(name) => {
          const folder = createFolder(name);
          onSelect(folder.id);
        }}
      />
    </div>
  );
}
