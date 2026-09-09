import { Menu } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { PromptBox } from "../components/chat/PromptBox";
import { useChatStore } from "../context/ChatContext";
import { useSidebar } from "../context/SidebarContext";

export function Home() {
  const navigate = useNavigate();
  const { createChat, submitPrompt, isSubmitting } = useChatStore();
  const { openMobile } = useSidebar();

  const handleSubmit = (prompt: string) => {
    const chat = createChat();
    void navigate({ to: "/chat/$chatId", params: { chatId: chat.id } });
    void submitPrompt(chat.id, prompt);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-3 px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={openMobile}
          aria-label="Open navigation"
          className="grid size-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface-strong"
        >
          <Menu className="size-4" aria-hidden />
        </button>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-8 md:px-8">
        <div className="w-full max-w-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Orchestrator AI</h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Build software faster with coordinated AI agents.
            </p>
            <p className="mx-auto mt-2 max-w-lg text-[13px] text-subtle-foreground">
              Describe what you want to build and the Orchestrator will plan, research, code, implement, and review it.
            </p>
          </div>

          <div className="mt-8">
            <PromptBox onSubmit={handleSubmit} isSubmitting={isSubmitting} size="large" autoFocus />
            <p className="mt-2 text-center font-mono text-[10px] text-subtle-foreground">
              Orchestrator AI can make mistakes. Review generated output before use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
