import { Hexagon } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="mx-auto max-w-3xl py-10 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-violet text-brand-foreground shadow-lg shadow-brand/25">
        <Hexagon className="size-5" aria-hidden />
      </span>
      <p className="mt-4 text-sm font-medium">This conversation is empty.</p>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Describe what you want to build and DEVFORGE AI will start the agent workflow.
      </p>
    </div>
  );
}
