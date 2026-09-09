import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="grid h-full place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-foreground">Error 404</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">This page doesn't exist</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          The workspace you tried to open isn't part of DEVFORGE AI.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center rounded-xl bg-gradient-to-r from-brand to-violet px-4 py-2 text-sm font-semibold text-brand-foreground"
        >
          Back to the workspace
        </Link>
      </div>
    </div>
  );
}
