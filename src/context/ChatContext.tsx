import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { DEMO_CHATS, DEMO_FOLDERS, createInitialWorkflow } from "../data/mockData";
import { runWorkflow } from "../services/agentService";
import { sendPrompt } from "../services/chatService";
import type { AgentStatus } from "../types/agent";
import type { Chat } from "../types/chat";
import type { Folder } from "../types/folder";
import { createId, createMessage, generateChatTitle } from "../utils/chatUtils";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";

interface ChatStoreValue {
  chats: Chat[];
  folders: Folder[];
  hydrated: boolean;
  isSubmitting: boolean;
  error: string | null;
  clearError: () => void;
  retryLastPrompt: () => void;
  getChat: (chatId: string) => Chat | undefined;
  createChat: () => Chat;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, title: string) => void;
  moveChatToFolder: (chatId: string, folderId?: string) => void;
  submitPrompt: (chatId: string, prompt: string) => Promise<void>;
  createFolder: (name: string) => Folder;
  renameFolder: (folderId: string, name: string) => void;
  deleteFolder: (folderId: string) => void;
}

const ChatContext = createContext<ChatStoreValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastPrompt = useRef<{ chatId: string; prompt: string } | null>(null);
  const activeRun = useRef<{ cancel: () => void } | null>(null);

  useEffect(() => {
    const storedChats = readStorage<Chat[] | null>(STORAGE_KEYS.chats, null);
    const storedFolders = readStorage<Folder[] | null>(STORAGE_KEYS.folders, null);
    setChats(storedChats ?? DEMO_CHATS);
    setFolders(storedFolders ?? DEMO_FOLDERS);
    if (!storedChats) writeStorage(STORAGE_KEYS.chats, DEMO_CHATS);
    if (!storedFolders) writeStorage(STORAGE_KEYS.folders, DEMO_FOLDERS);
    setHydrated(true);
    return () => activeRun.current?.cancel();
  }, []);

  const persistChats = useCallback((updater: (prev: Chat[]) => Chat[]) => {
    setChats((prev) => {
      const next = updater(prev);
      writeStorage(STORAGE_KEYS.chats, next);
      return next;
    });
  }, []);

  const persistFolders = useCallback((updater: (prev: Folder[]) => Folder[]) => {
    setFolders((prev) => {
      const next = updater(prev);
      writeStorage(STORAGE_KEYS.folders, next);
      return next;
    });
  }, []);

  const patchChat = useCallback(
    (chatId: string, patch: (chat: Chat) => Chat) => {
      persistChats((prev) => prev.map((chat) => (chat.id === chatId ? patch(chat) : chat)));
    },
    [persistChats],
  );

  const createChat = useCallback((): Chat => {
    const now = new Date().toISOString();
    const chat: Chat = {
      id: createId("chat"),
      title: "New Chat",
      createdAt: now,
      updatedAt: now,
      messages: [],
    };
    persistChats((prev) => [chat, ...prev]);
    return chat;
  }, [persistChats]);

  const runPrompt = useCallback(
    async (chatId: string, prompt: string) => {
      const trimmed = prompt.trim();
      if (!trimmed) return;

      lastPrompt.current = { chatId, prompt: trimmed };
      setError(null);
      setIsSubmitting(true);
      activeRun.current?.cancel();

      const userMessage = createMessage("user", trimmed);
      patchChat(chatId, (chat) => ({
        ...chat,
        title: chat.messages.length === 0 ? generateChatTitle(trimmed) : chat.title,
        messages: [...chat.messages, userMessage],
        agentWorkflow: createInitialWorkflow(),
        updatedAt: userMessage.timestamp,
      }));

      try {
        const result = await sendPrompt(chatId, trimmed);

        const ack = createMessage("assistant", result.acknowledgement);
        patchChat(chatId, (chat) => ({
          ...chat,
          messages: [...chat.messages, ack],
          updatedAt: ack.timestamp,
        }));

        const run = runWorkflow((workflow: AgentStatus[]) => {
          patchChat(chatId, (chat) => ({ ...chat, agentWorkflow: workflow }));
        });
        activeRun.current = run;
        await run.done;

        const summary = createMessage("assistant", result.summary);
        patchChat(chatId, (chat) => ({
          ...chat,
          messages: [...chat.messages, summary],
          updatedAt: summary.timestamp,
        }));
      } catch {
        setError("Unable to connect to the Orchestrator backend.");
        patchChat(chatId, (chat) => ({
          ...chat,
          agentWorkflow: (chat.agentWorkflow ?? createInitialWorkflow()).map((agent) =>
            agent.state === "active" ? { ...agent, state: "failed" as const } : agent,
          ),
        }));
      } finally {
        activeRun.current = null;
        setIsSubmitting(false);
      }
    },
    [patchChat],
  );

  const value = useMemo<ChatStoreValue>(
    () => ({
      chats,
      folders,
      hydrated,
      isSubmitting,
      error,
      clearError: () => setError(null),
      retryLastPrompt: () => {
        const pending = lastPrompt.current;
        if (pending) void runPrompt(pending.chatId, pending.prompt);
      },
      getChat: (chatId) => chats.find((chat) => chat.id === chatId),
      createChat,
      deleteChat: (chatId) => persistChats((prev) => prev.filter((chat) => chat.id !== chatId)),
      renameChat: (chatId, title) => {
        const clean = title.trim();
        if (!clean) return;
        patchChat(chatId, (chat) => ({ ...chat, title: clean }));
      },
      moveChatToFolder: (chatId, folderId) =>
        patchChat(chatId, (chat) => {
          const next: Chat = { ...chat };
          if (folderId) next.folderId = folderId;
          else delete next.folderId;
          return next;
        }),

      submitPrompt: runPrompt,
      createFolder: (name) => {
        const folder: Folder = {
          id: createId("folder"),
          name: name.trim() || "Untitled folder",
          createdAt: new Date().toISOString(),
        };
        persistFolders((prev) => [...prev, folder]);
        return folder;
      },
      renameFolder: (folderId, name) => {
        const clean = name.trim();
        if (!clean) return;
        persistFolders((prev) => prev.map((folder) => (folder.id === folderId ? { ...folder, name: clean } : folder)));
      },
      deleteFolder: (folderId) => {
        persistFolders((prev) => prev.filter((folder) => folder.id !== folderId));
        persistChats((prev) =>
          prev.map((chat) => {
            if (chat.folderId !== folderId) return chat;
            const next = { ...chat };
            delete next.folderId;
            return next;
          }),
        );
      },
    }),
    [chats, folders, hydrated, isSubmitting, error, createChat, patchChat, persistChats, persistFolders, runPrompt],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatStore(): ChatStoreValue {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChatStore must be used inside <ChatProvider>");
  return context;
}
