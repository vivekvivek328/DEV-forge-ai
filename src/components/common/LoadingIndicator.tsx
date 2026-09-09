export function LoadingIndicator({ label = "DEVFORGE is working..." }: { label?: string }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground" role="status" aria-live="polite">
      <span className="animate-spin-slow size-3 rounded-full border-2 border-brand/30 border-t-brand" />
      {label}
    </p>
  );
}
