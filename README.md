# Orchestrator AI

A local web workspace where you submit a software-development prompt to a central
**Orchestrator AI**, which delegates the work to specialist agents: Planning,
Research, Coding, Implementation and Review.

This repository contains the **frontend only**. There is no LLM call, no agent
execution and no backend orchestration — the agent workflow runs as a replaceable
mock so the interface can be demonstrated end to end.

## Features

- Focused AI-chat workspace (collapsible sidebar + chat area), not a dashboard
- Home screen with a large auto-growing prompt box (Enter to send, Shift+Enter for a newline)
- Chat screen with user / Orchestrator messages, timestamps and auto-scroll
- Agent pipeline with `pending` / `active` / `completed` / `failed` states and a progress bar
- Folder management: create, rename, delete, move chats in and out
- Chat history with search, rename, delete, move-to-folder and active highlighting
- Readable chat titles generated from the first prompt
- localStorage persistence for chats, folders, messages, theme and sidebar state
- Light and dark mode with a toggle in the sidebar footer
- Empty, loading and backend-error states with a retry action
- Responsive: fixed sidebar on desktop, drawer on mobile, no horizontal overflow

## Technology stack

React 19 · TypeScript (strict) · Vite · TanStack Router (file-based routing) ·
Tailwind CSS v4 · Lucide React · Context API · localStorage

> Routing note: this project runs on TanStack Start, so routing uses TanStack
> Router's file-based routes rather than `react-router-dom`. The route paths are
> the same: `/` and `/chat/:chatId`.

## Folder structure

```
src/
├── components/
│   ├── layout/    AppLayout, Sidebar, SidebarHeader, SidebarFooter, MobileSidebar
│   ├── chat/      ChatArea, ChatHeader, MessageList, UserMessage, AssistantMessage, PromptBox, EmptyChat
│   ├── agents/    AgentStatus, AgentStatusCard, AgentTimeline, AgentIcon
│   ├── history/   HistoryList, HistoryItem, HistorySearch
│   ├── folders/   FolderList, FolderItem, CreateFolderDialog, FolderDropdown
│   ├── common/    Button, Dialog, Dropdown, Tooltip, Avatar, Badge, LoadingIndicator
│   └── ui/        shadcn primitives shipped with the template
├── pages/         Home, Chat, NotFound
├── context/       ChatContext, SidebarContext
├── hooks/         useChats, useFolders, useLocalStorage, useChat
├── services/      api, chatService, agentService
├── types/         chat, agent, folder
├── utils/         storage, chatUtils, formatters
├── data/          mockData
└── routes/        __root.tsx, index.tsx, chat.$chatId.tsx, $.tsx
```

## Installation

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build     # production build
npm run lint      # eslint
```

## Environment variables

Copy `.env.example` to `.env`:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

Leave it empty (or omit the file) to run entirely on mock data.

## Backend integration

The UI never calls the network directly. The layering is:

```
UI  →  hooks / context  →  services  →  api
```

- `services/api.ts` — base URL, fetch wrapper, `ApiError`
- `services/chatService.ts` — `getChats`, `getChat`, `createChat`, `updateChat`, `deleteChat`, `sendPrompt`
- `services/agentService.ts` — `getAgentStatus`, `runWorkflow`, progress helpers

When `VITE_API_BASE_URL` is set, the services call the backend at:

| Method | Path                     | Purpose                     |
| ------ | ------------------------ | --------------------------- |
| GET    | `/chats`                 | list chats                  |
| GET    | `/chats/:id`             | fetch a chat                |
| POST   | `/chats`                 | create a chat               |
| PUT    | `/chats/:id`             | update a chat               |
| DELETE | `/chats/:id`             | delete a chat               |
| POST   | `/chats/:id/prompt`      | submit a prompt             |
| GET    | `/chats/:id/agents`      | current agent workflow      |

If the backend is unreachable the chat screen shows
"Unable to connect to the Orchestrator backend." with a retry button.

## LocalStorage behaviour

Everything is persisted through `utils/storage.ts` — components never touch
`window.localStorage` directly.

| Key                            | Contents                          |
| ------------------------------ | --------------------------------- |
| `orchestrator.chats`           | chats, messages, agent workflows  |
| `orchestrator.folders`         | folders                           |
| `orchestrator.theme`           | `dark` or `light`                 |
| `orchestrator.sidebar-collapsed` | sidebar collapsed flag          |

On first run the store is seeded with four demo conversations and two folders.
Deleting a folder never deletes its chats — they return to **All Chats**.

## Mock workflow

`services/agentService.ts` exposes `runWorkflow(onUpdate)`, which walks each agent
through `active → completed` with a short delay and emits the full workflow on
every transition. The chat context stores those snapshots on the chat, and the
UI components in `components/agents/` only render state — they contain no
workflow logic. Replace the body of `runWorkflow` with polling of
`getAgentStatus` (or a websocket) to switch to a real backend without touching
any component.
