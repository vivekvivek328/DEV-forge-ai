import { createFileRoute } from "@tanstack/react-router";

import { Home } from "../../pages/Home";

const title = "Workspace — DEVFORGE AI";
const description = "Describe a build and DEVFORGE AI delegates it to Planning, Research, Coding, Implementation and Review agents.";

export const Route = createFileRoute("/_authenticated/workspace")({
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
