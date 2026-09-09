import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Hexagon, Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "../hooks/useAuth";

type Mode = "signin" | "signup";

export function Auth() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/workspace", replace: true });
  }, [loading, user, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName.trim() || email.split("@")[0] },
          },
        });
        if (signUpError) throw signUpError;
        if (!data.session) {
          setNotice("Check your inbox and confirm your email to finish creating the account.");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in failed. Please try again.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/workspace", replace: true });
  };

  return (
    <div className="page-gradient relative grid min-h-screen place-items-center px-4 py-10">
      <div className="pointer-events-none absolute -left-24 top-10 size-[360px] rounded-full bg-violet/25 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 size-[340px] rounded-full bg-brand/25 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-hairline bg-panel p-7 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-violet text-brand-foreground shadow-lg shadow-brand/30">
            <Hexagon className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-bold tracking-tight">DEVFORGE AI</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle-foreground">
              {mode === "signin" ? "sign in" : "create account"}
            </p>
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          {mode === "signin"
            ? "Sign in to reach your agent workspace."
            : "Sign up to start delegating builds to your agents."}
        </p>

        <button
          type="button"
          onClick={() => void handleGoogle()}
          disabled={busy}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface-strong disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"
            />
            <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1Z" />
            <path
              fill="#EA4335"
              d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-hairline" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-foreground">or</span>
          <span className="h-px flex-1 bg-hairline" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "signup" ? (
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-muted-foreground">Display name</span>
              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                autoComplete="name"
                placeholder="Kai Dev"
                className="rounded-xl border border-hairline bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-brand"
              />
            </label>
          ) : null}

          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-muted-foreground">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              className="rounded-xl border border-hairline bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-brand"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-muted-foreground">Password</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="••••••••"
              className="rounded-xl border border-hairline bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-brand"
            />
          </label>

          {error ? <p className="text-[13px] text-danger">{error}</p> : null}
          {notice ? <p className="text-[13px] text-muted-foreground">{notice}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-violet py-2.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition hover:brightness-110 disabled:opacity-60"
          >
            {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-muted-foreground">
          {mode === "signin" ? "No account yet?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setNotice(null);
            }}
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
