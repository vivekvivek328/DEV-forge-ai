import { useChatStore } from "../context/ChatContext";

export function useFolders() {
  const store = useChatStore();
  return {
    folders: store.folders,
    createFolder: store.createFolder,
    renameFolder: store.renameFolder,
    deleteFolder: store.deleteFolder,
  };
}
