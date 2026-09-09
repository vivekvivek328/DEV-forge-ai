import type { AgentStatus } from "../../types/agent";
import { AgentStatusCard } from "./AgentStatusCard";

export function AgentTimeline({ workflow }: { workflow: AgentStatus[] }) {
  const completed = workflow.filter((agent) => agent.state === "completed").length;
  const railHeight = workflow.length > 1 ? (completed / workflow.length) * 100 : 0;

  return (
    <div className="relative">
      <div className="absolute bottom-3 left-[15px] top-3 w-px bg-hairline" aria-hidden />
      <div
        className="absolute left-[15px] top-3 w-px bg-gradient-to-b from-accent to-brand transition-all duration-500"
        style={{ height: `${railHeight}%` }}
        aria-hidden
      />
      <ul className="relative space-y-2.5">
        {workflow.map((agent) => (
          <AgentStatusCard key={agent.id} agent={agent} />
        ))}
      </ul>
    </div>
  );
}
