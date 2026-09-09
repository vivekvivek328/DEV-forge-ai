export type AgentId = "planning" | "research" | "coding" | "implementation" | "review";

export type AgentState = "pending" | "active" | "completed" | "failed";

export interface AgentStatus {
  id: AgentId;
  label: string;
  state: AgentState;
  detail: string;
}
