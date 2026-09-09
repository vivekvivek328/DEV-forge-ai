import { createFileRoute } from "@tanstack/react-router";

import { Chat } from "../pages/Chat";

const title = "Conversation — Orchestrator AI";
const description = "Follow the Planning, Research, Coding, Implementation and Review agents working on your build.";

export const Route = createFileRoute("/chat/$chatId")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ChatRoute,
});

function ChatRoute() {
  const { chatId } = Route.useParams();
  return <Chat chatId={chatId} />;
}
