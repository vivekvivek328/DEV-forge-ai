import type { Chat, Message, MessageRole } from "../types/chat";

export function createId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${random}`;
}

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "build",
  "create",
  "make",
  "please",
  "using",
  "with",
  "for",
  "and",
  "to",
  "me",
  "my",
  "of",
  "in",
  "on",
  "app",
  "application",
  "that",
  "can",
  "i",
  "want",
  "need",
  "some",
  "new",
]);

const KEEP_CASE = /^[A-Z0-9]{2,}$/;

/**
 * Produce a short, readable sidebar title from the first user prompt.
 * Replaceable later by a backend-generated title.
 */
export function generateChatTitle(prompt: string): string {
  const words = prompt
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

  const meaningful = words.filter((word) => !STOP_WORDS.has(word.toLowerCase()));
  const picked = (meaningful.length ? meaningful : words).slice(0, 4);

  if (!picked.length) return "New Chat";

  return picked
    .map((word) => (KEEP_CASE.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    .join(" ");
}

export function createMessage(role: MessageRole, content: string): Message {
  return {
    id: createId("msg"),
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}

export function sortChatsByRecency(chats: Chat[]): Chat[] {
  return [...chats].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function filterChats(chats: Chat[], query: string): Chat[] {
  const q = query.trim().toLowerCase();
  if (!q) return chats;
  return chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(q) ||
      chat.messages.some((message) => message.content.toLowerCase().includes(q)),
  );
}
