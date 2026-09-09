import { Hexagon } from "lucide-react";

import type { Message } from "../../types/chat";
import { formatClockTime } from "../../utils/formatters";

export function AssistantMessage({ message }: { message: Message }) {
  return (
    <article className="animate-msg-in flex gap-3" aria-label="Orchestrator AI message">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-violet text-brand-foreground">
        <Hexagon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>
        <p className="mt-1 font-mono text-[10px] text-subtle-foreground">{formatClockTime(message.timestamp)}</p>
      </div>
    </article>
  );
}
