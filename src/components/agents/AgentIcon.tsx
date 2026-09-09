import { Check, CircleDashed, TriangleAlert } from "lucide-react";

import type { AgentState } from "../../types/agent";

export function AgentIcon({ state }: { state: AgentState }) {
  if (state === "completed") {
    return (
      <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
        <Check className="size-4" aria-hidden />
      </span>
    );
  }

  if (state === "active") {
    return (
      <span className="grid size-8 place-items-center rounded-full bg-brand/20 text-brand ring-1 ring-brand/40">
        <span className="animate-spin-slow size-3 rounded-full border-2 border-brand/30 border-t-brand" />
      </span>
    );
  }

  if (state === "failed") {
    return (
      <span className="grid size-8 place-items-center rounded-full bg-danger/15 text-danger ring-1 ring-danger/30">
        <TriangleAlert className="size-4" aria-hidden />
      </span>
    );
  }

  return (
    <span className="grid size-8 place-items-center rounded-full bg-surface text-subtle-foreground ring-1 ring-hairline">
      <CircleDashed className="size-4" aria-hidden />
    </span>
  );
}
