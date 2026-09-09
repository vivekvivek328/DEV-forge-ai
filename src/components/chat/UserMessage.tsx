import type { Message } from "../../types/chat";
import { formatClockTime } from "../../utils/formatters";

export function UserMessage({ message }: { message: Message }) {
  return (
    <article className="animate-msg-in flex justify-end" aria-label="Your message">
      <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-gradient-to-br from-brand/20 to-violet/10 px-4 py-3 ring-1 ring-brand/20">
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>
        <p className="mt-1 text-right font-mono text-[10px] text-subtle-foreground">
          {formatClockTime(message.timestamp)}
        </p>
      </div>
    </article>
  );
}
