import { BrandLogo } from "../common/BrandLogo";

export function EmptyChat() {
  return (
    <div className="mx-auto max-w-3xl py-10 text-center">
      <BrandLogo className="mx-auto size-14 drop-shadow-[0_10px_20px_var(--brand)]" />
      <p className="mt-4 text-sm font-medium">This conversation is empty.</p>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Describe what you want to build and DEVFORGE AI will start the agent workflow.
      </p>
    </div>
  );
}
