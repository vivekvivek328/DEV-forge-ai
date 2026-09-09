import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

interface PromptBoxProps {
  onSubmit: (prompt: string) => void;
  isSubmitting: boolean;
  autoFocus?: boolean;
  size?: "large" | "compact";
  placeholder?: string;
}

const MIN_HEIGHT = { large: 120, compact: 56 } as const;
const MAX_HEIGHT = { large: 300, compact: 180 } as const;

export function PromptBox({
  onSubmit,
  isSubmitting,
  autoFocus = false,
  size = "compact",
  placeholder = "What do you want to build?",
}: PromptBoxProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(Math.max(element.scrollHeight, MIN_HEIGHT[size]), MAX_HEIGHT[size])}px`;
  }, [value, size]);

  const canSend = value.trim().length > 0 && !isSubmitting;

  const submit = () => {
    if (!canSend) return;
    onSubmit(value.trim());
    setValue("");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-end gap-2 rounded-2xl border border-hairline bg-surface p-2.5 shadow-lg shadow-black/10 backdrop-blur-xl focus-within:ring-1 focus-within:ring-brand/40">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Describe what you want to build"
          className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm leading-relaxed placeholder:text-subtle-foreground focus:outline-none"
          style={{ minHeight: MIN_HEIGHT[size], maxHeight: MAX_HEIGHT[size] }}
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send prompt"
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-violet text-brand-foreground shadow-lg shadow-brand/25 transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-40"
        >
          {isSubmitting ? (
            <span className="animate-spin-slow size-4 rounded-full border-2 border-brand-foreground/40 border-t-brand-foreground" />
          ) : (
            <ArrowRight className="size-4" aria-hidden />
          )}
        </button>
      </div>
      <p className="mt-2 text-center font-mono text-[10px] text-subtle-foreground">
        Enter to send · Shift + Enter for a new line
      </p>
    </form>
  );
}
