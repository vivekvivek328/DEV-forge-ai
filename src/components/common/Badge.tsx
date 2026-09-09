import type { ReactNode } from "react";

type Tone = "muted" | "accent" | "brand" | "danger";

const tones: Record<Tone, string> = {
  muted: "bg-surface-strong text-muted-foreground",
  accent: "bg-accent/10 text-accent",
  brand: "bg-brand/10 text-brand",
  danger: "bg-danger/10 text-danger",
};

export function Badge({ tone = "muted", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
