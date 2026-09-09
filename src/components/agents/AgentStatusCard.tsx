import type { AgentStatus } from "../../types/agent";
import { Badge } from "../common/Badge";
import { AgentIcon } from "./AgentIcon";

const STATE_LABEL: Record<AgentStatus["state"], string> = {
  pending: "Queued",
  active: "Working",
  completed: "Done",
  failed: "Failed",
};

export function AgentStatusCard({ agent }: { agent: AgentStatus }) {
  const isActive = agent.state === "active";
  const isPending = agent.state === "pending";

  return (
    <li
      className={`flex items-center gap-3 rounded-xl px-2 py-1.5 transition ${
        isActive ? "bg-surface-strong ring-1 ring-brand/30" : ""
      } ${isPending ? "opacity-60" : ""}`}
    >
      <AgentIcon state={agent.state} />
      <div className="min-w-0 flex-1">
        <p className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{agent.label}</p>
        <p className={`truncate font-mono text-[10px] ${isActive ? "text-brand" : "text-subtle-foreground"}`}>
          {isActive ? `${agent.detail}…` : agent.detail}
        </p>
      </div>
      <Badge
        tone={
          agent.state === "completed" ? "accent" : agent.state === "active" ? "brand" : agent.state === "failed" ? "danger" : "muted"
        }
      >
        {isActive ? <span className="animate-pulse-dot size-1.5 rounded-full bg-brand" /> : null}
        {STATE_LABEL[agent.state]}
      </Badge>
    </li>
  );
}
