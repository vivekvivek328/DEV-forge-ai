import { createFileRoute } from "@tanstack/react-router";

import { Home } from "../pages/Home";

const title = "Orchestrator AI — Coordinated AI agents for software builds";
const description =
  "Describe what you want to build and the Orchestrator plans, researches, codes, implements and reviews it with specialist AI agents.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Home,
});
