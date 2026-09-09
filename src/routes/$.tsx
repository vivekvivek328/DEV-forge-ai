import { createFileRoute } from "@tanstack/react-router";

import { NotFound } from "../pages/NotFound";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found — Orchestrator AI" },
      { name: "description", content: "This page is not part of the Orchestrator AI workspace." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFound,
});
