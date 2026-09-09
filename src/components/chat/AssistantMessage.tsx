import type { Message } from "../../types/chat";
import { formatClockTime } from "../../utils/formatters";
import { BrandLogo } from "../common/BrandLogo";

export function AssistantMessage({ message }: { message: Message }) {
  return (
    <article className="animate-msg-in flex gap-3" aria-label="DEVFORGE AI message">
      <BrandLogo className="size-9 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>
        <p className="mt-1 font-mono text-[10px] text-subtle-foreground">{formatClockTime(message.timestamp)}</p>
      </div>
    </article>
  );
}
