import { useChatStore } from "../context/ChatContext";
import type { Chat } from "../types/chat";

export function useChat(chatId: string | undefined) {
  const store = useChatStore();
  const chat: Chat | undefined = chatId ? store.getChat(chatId) : undefined;

  return {
    chat,
    hydrated: store.hydrated,
    isSubmitting: store.isSubmitting,
    error: store.error,
    clearError: store.clearError,
    retry: store.retryLastPrompt,
    submitPrompt: store.submitPrompt,
  };
}
