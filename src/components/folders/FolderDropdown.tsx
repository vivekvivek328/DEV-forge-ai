import { MoreHorizontal } from "lucide-react";

import { Dropdown } from "../common/Dropdown";

interface FolderDropdownProps {
  folderName: string;
  onRename: () => void;
  onDelete: () => void;
}

export function FolderDropdown({ folderName, onRename, onDelete }: FolderDropdownProps) {
  return (
    <Dropdown
      label={`Actions for ${folderName}`}
      trigger={<MoreHorizontal className="size-4" aria-hidden />}
      items={[
        { label: "Rename folder", onSelect: onRename },
        { label: "Delete folder", onSelect: onDelete, destructive: true },
      ]}
    />
  );
}
