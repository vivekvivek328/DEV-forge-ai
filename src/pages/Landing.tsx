import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { BrandLogo } from "../components/common/BrandLogo";
import { useAuth } from "../hooks/useAuth";

const AGENTS = ["Planning", "Research", "Coding", "Implementation", "Review"];

export function Landing() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/workspace", replace: true });
  }, [loading, user, navigate]);

  return (
    <div className="page-gradient relative grid min-h-screen place-items-center px-4 py-12">
      <div className="pointer-events-none absolute -left-24 top-10 size-[360px] rounded-full bg-violet/25 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 size-[340px] rounded-full bg-brand/25 blur-[120px]" />

      <main className="relative z-10 w-full max-w-2xl text-center">
        <BrandLogo className="mx-auto size-24 drop-shadow-[0_16px_28px_var(--brand)] md:size-28" priority />
        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">DEVFORGE AI</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          Describe what you want to build. DEVFORGE AI plans, researches, codes, implements and reviews it with a team
          of specialist agents.
        </p>

        <ul className="mt-7 flex flex-wrap justify-center gap-2">
          {AGENTS.map((agent) => (
            <li
              key={agent}
              className="rounded-full border border-hairline bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
            >
              {agent}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            to="/auth"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-brand to-violet px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition hover:brightness-110"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center rounded-xl border border-hairline bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface-strong"
          >
            Create an account
          </Link>
        </div>
      </main>
    </div>
  );
}
