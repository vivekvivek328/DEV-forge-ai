import type { AgentStatus } from "./agent";

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  folderId?: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  agentWorkflow?: AgentStatus[];
}
