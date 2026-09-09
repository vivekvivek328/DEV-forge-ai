import { Link } from "@tanstack/react-router";

import { ChatArea } from "../components/chat/ChatArea";
import { useChat } from "../hooks/useChat";

export function Chat({ chatId }: { chatId: string }) {
  const { chat, hydrated } = useChat(chatId);

  if (!hydrated) {
    return (
      <div className="grid h-full place-items-center">
        <p className="font-mono text-[11px] text-subtle-foreground">Loading workspace…</p>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="grid h-full place-items-center px-4 text-center">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Conversation not found</h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            This chat may have been deleted from this browser.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center rounded-xl bg-gradient-to-r from-brand to-violet px-4 py-2 text-sm font-semibold text-brand-foreground"
          >
            Start a new chat
          </Link>
        </div>
      </div>
    );
  }

  return <ChatArea chat={chat} />;
}
