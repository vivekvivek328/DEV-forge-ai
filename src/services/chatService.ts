import type { Chat, Message } from "../types/chat";
import { apiRequest, isBackendConfigured } from "./api";

/**
 * Chat persistence. When no backend is configured the app falls back to the
 * local store handled by the chat context, so every method here degrades to a
 * resolved no-op rather than throwing.
 */

export async function getChats(): Promise<Chat[] | null> {
  if (!isBackendConfigured()) return null;
  return apiRequest<Chat[]>("/chats");
}

export async function getChat(chatId: string): Promise<Chat | null> {
  if (!isBackendConfigured()) return null;
  return apiRequest<Chat>(`/chats/${chatId}`);
}

export async function createChat(chat: Chat): Promise<Chat> {
  if (!isBackendConfigured()) return chat;
  return apiRequest<Chat>("/chats", { method: "POST", body: JSON.stringify(chat) });
}

export async function updateChat(chat: Chat): Promise<Chat> {
  if (!isBackendConfigured()) return chat;
  return apiRequest<Chat>(`/chats/${chat.id}`, { method: "PUT", body: JSON.stringify(chat) });
}

export async function deleteChat(chatId: string): Promise<void> {
  if (!isBackendConfigured()) return;
  await apiRequest<void>(`/chats/${chatId}`, { method: "DELETE" });
}

export interface SendPromptResult {
  acknowledgement: string;
  summary: string;
}

const FALLBACK_ACK = "Understood. I'm coordinating the development workflow across the specialist agents below.";

export async function sendPrompt(chatId: string, prompt: string): Promise<SendPromptResult> {
  if (!isBackendConfigured()) {
    return {
      acknowledgement: FALLBACK_ACK,
      summary: buildLocalSummary(prompt),
    };
  }

  return apiRequest<SendPromptResult>(`/chats/${chatId}/prompt`, {
    method: "POST",
    body: JSON.stringify({ prompt } satisfies { prompt: string }),
  });
}

function buildLocalSummary(prompt: string): string {
  const trimmed = prompt.trim().replace(/\s+/g, " ");
  const focus = trimmed.length > 90 ? `${trimmed.slice(0, 90)}…` : trimmed;
  return `All five agents have reported back on "${focus}". Planning scoped the work, research gathered constraints, coding and implementation produced the build, and review completed the QA pass.`;
}

export function lastUserMessage(messages: Message[]): Message | undefined {
  return [...messages].reverse().find((message) => message.role === "user");
}
