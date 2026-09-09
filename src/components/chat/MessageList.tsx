import { useEffect, useRef } from "react";

import type { AgentStatus as AgentStatusType } from "../../types/agent";
import type { Message } from "../../types/chat";
import { AgentStatus } from "../agents/AgentStatus";
import { LoadingIndicator } from "../common/LoadingIndicator";
import { AssistantMessage } from "./AssistantMessage";
import { UserMessage } from "./UserMessage";

interface MessageListProps {
  messages: Message[];
  workflow?: AgentStatusType[];
  isSubmitting: boolean;
}

export function MessageList({ messages, workflow, isSubmitting }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, workflow, isSubmitting]);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <AssistantMessage key={message.id} message={message} />
        ),
      )}

      {workflow?.length ? <AgentStatus workflow={workflow} /> : null}
      {isSubmitting ? <LoadingIndicator /> : null}
      <div ref={endRef} />
    </div>
  );
}
