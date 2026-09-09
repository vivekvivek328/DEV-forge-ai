import { createFileRoute } from "@tanstack/react-router";

import { Auth } from "../pages/Auth";

const title = "Sign in — DEVFORGE AI";
const description = "Sign in or create a DEVFORGE AI account to reach your agent workspace.";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Auth,
});
