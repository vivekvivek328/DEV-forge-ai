import { workflowProgress } from "../../services/agentService";
import type { AgentStatus as AgentStatusType } from "../../types/agent";
import { AgentTimeline } from "./AgentTimeline";

/**
 * Presentation only — workflow transitions live in services/agentService.ts.
 */
export function AgentStatus({ workflow }: { workflow: AgentStatusType[] }) {
  const progress = workflowProgress(workflow);

  return (
    <section
      aria-label="DEVFORGE AI agent workflow"
      className="animate-msg-in relative rounded-2xl border border-hairline bg-surface p-5 shadow-xl shadow-black/10 backdrop-blur-xl"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-foreground">DEVFORGE AI</p>
          <p className="text-base font-semibold tracking-tight">Managing workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-surface-strong">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-accent">{progress}%</span>
        </div>
      </div>
      <AgentTimeline workflow={workflow} />
    </section>
  );
}
