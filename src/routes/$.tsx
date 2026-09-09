import { createFileRoute } from "@tanstack/react-router";

import { NotFound } from "../pages/NotFound";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found — DEVFORGE AI" },
      { name: "description", content: "This page is not part of the DEVFORGE AI workspace." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFound,
});
