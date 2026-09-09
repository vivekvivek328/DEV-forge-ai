import { useEffect, useState } from "react";

import { Button } from "../common/Button";
import { Dialog } from "../common/Dialog";

interface CreateFolderDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export function CreateFolderDialog({ open, onClose, onCreate }: CreateFolderDialogProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  const submit = () => {
    if (!name.trim()) return;
    onCreate(name.trim());
    onClose();
  };

  return (
    <Dialog open={open} title="Create Folder" onClose={onClose}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label htmlFor="folder-name" className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle-foreground">
          Folder name
        </label>
        <input
          id="folder-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Folder name"
          className="mt-1.5 w-full rounded-xl border border-hairline bg-surface px-3 py-2 text-sm placeholder:text-subtle-foreground focus:outline-none focus:ring-1 focus:ring-brand/40"
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()}>
            Create Folder
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
