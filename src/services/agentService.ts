import { AGENT_BLUEPRINT, createInitialWorkflow } from "../data/mockData";
import type { AgentStatus } from "../types/agent";
import { apiRequest, isBackendConfigured } from "./api";

export type WorkflowListener = (workflow: AgentStatus[]) => void;

export interface WorkflowRun {
  cancel: () => void;
  done: Promise<void>;
}

const STEP_MS = 1_100;

export async function getAgentStatus(chatId: string): Promise<AgentStatus[] | null> {
  if (!isBackendConfigured()) return null;
  return apiRequest<AgentStatus[]>(`/chats/${chatId}/agents`);
}

/**
 * Mock DEVFORGE run. Drives each agent through active -> completed with a
 * short delay. Swap the body for polling `getAgentStatus` (or a websocket)
 * once the local backend exists — the callback contract stays the same.
 */
export function runWorkflow(onUpdate: WorkflowListener): WorkflowRun {
  let cancelled = false;
  const workflow = createInitialWorkflow();

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });

  const emit = () => onUpdate(workflow.map((agent) => ({ ...agent })));

  const done = (async () => {
    for (let index = 0; index < AGENT_BLUEPRINT.length; index += 1) {
      if (cancelled) return;
      workflow[index]!.state = "active";
      emit();
      await wait(STEP_MS);
      if (cancelled) return;
      workflow[index]!.state = "completed";
      emit();
      await wait(220);
    }
  })();

  return {
    cancel: () => {
      cancelled = true;
    },
    done,
  };
}

export function workflowProgress(workflow: AgentStatus[] | undefined): number {
  if (!workflow?.length) return 0;
  const completed = workflow.filter((agent) => agent.state === "completed").length;
  return Math.round((completed / workflow.length) * 100);
}

export function activeAgent(workflow: AgentStatus[] | undefined): AgentStatus | undefined {
  return workflow?.find((agent) => agent.state === "active");
}
