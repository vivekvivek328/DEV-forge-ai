import { useChat } from "../../hooks/useChat";
import type { Chat } from "../../types/chat";
import { Button } from "../common/Button";
import { ChatHeader } from "./ChatHeader";
import { EmptyChat } from "./EmptyChat";
import { MessageList } from "./MessageList";
import { PromptBox } from "./PromptBox";

export function ChatArea({ chat }: { chat: Chat }) {
  const { isSubmitting, error, retry, clearError, submitPrompt } = useChat(chat.id);
  const isRunning = isSubmitting && !error;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatHeader title={chat.title} isRunning={isRunning} />

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-8">
        {chat.messages.length === 0 ? (
          <EmptyChat />
        ) : (
          <MessageList
            messages={chat.messages}
            {...(chat.agentWorkflow ? { workflow: chat.agentWorkflow } : {})}
            isSubmitting={isRunning}
          />
        )}

        {error ? (
          <div
            role="alert"
            className="mx-auto mt-5 max-w-3xl rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm"
          >
            <p className="font-medium text-danger">{error}</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Check that your local Orchestrator service is running, then try again.
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  clearError();
                  retry();
                }}
              >
                Retry
              </Button>
              <Button size="sm" variant="ghost" onClick={clearError}>
                Dismiss
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-hairline bg-surface px-4 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto max-w-3xl">
          <PromptBox onSubmit={(prompt) => void submitPrompt(chat.id, prompt)} isSubmitting={isSubmitting} autoFocus />
          <p className="mt-2 text-center font-mono text-[10px] text-subtle-foreground">
            Orchestrator AI can make mistakes. Review generated output before use.
          </p>
        </div>
      </div>
    </div>
  );
}
