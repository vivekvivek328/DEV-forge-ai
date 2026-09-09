import { createFileRoute } from "@tanstack/react-router";

import { Landing } from "../pages/Landing";

const title = "DEVFORGE AI — Coordinated AI agents for software builds";
const description =
  "Describe what you want to build and DEVFORGE AI plans, researches, codes, implements and reviews it with specialist AI agents.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Landing,
});
