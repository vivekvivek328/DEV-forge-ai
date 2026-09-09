import type { AgentStatus } from "../types/agent";
import type { Chat } from "../types/chat";
import type { Folder } from "../types/folder";

export const AGENT_BLUEPRINT: ReadonlyArray<{ id: AgentStatus["id"]; label: string; detail: string }> = [
  { id: "planning", label: "Planning", detail: "Decomposing the request into tasks" },
  { id: "research", label: "Research", detail: "Gathering references and constraints" },
  { id: "coding", label: "Coding", detail: "Writing modules and components" },
  { id: "implementation", label: "Implementation", detail: "Wiring the data layer together" },
  { id: "review", label: "Review", detail: "QA and security pass" },
];

export function createInitialWorkflow(): AgentStatus[] {
  return AGENT_BLUEPRINT.map((agent) => ({ ...agent, state: "pending" }));
}

const hoursAgo = (hours: number): string => new Date(Date.now() - hours * 3_600_000).toISOString();

const completedWorkflow = (): AgentStatus[] =>
  AGENT_BLUEPRINT.map((agent) => ({ ...agent, state: "completed" as const }));

export const DEMO_FOLDERS: Folder[] = [
  { id: "folder_security", name: "Security", createdAt: hoursAgo(72) },
  { id: "folder_web", name: "Web Apps", createdAt: hoursAgo(70) },
];

export const DEMO_CHATS: Chat[] = [
  {
    id: "chat_siem",
    title: "SIEM Monitoring Dashboard",
    folderId: "folder_security",
    createdAt: hoursAgo(0.05),
    updatedAt: hoursAgo(0.03),
    messages: [
      {
        id: "msg_siem_1",
        role: "user",
        content:
          "Build a SIEM monitoring dashboard using React and a Python backend, with a live alert feed and case triage views.",
        timestamp: hoursAgo(0.05),
      },
      {
        id: "msg_siem_2",
        role: "assistant",
        content:
          "Understood. I'm coordinating the development workflow — five agents are queued to plan, research, code, implement, and review this build.",
        timestamp: hoursAgo(0.04),
      },
      {
        id: "msg_siem_3",
        role: "assistant",
        content:
          "All agents have reported back. The dashboard scaffold, alert ingestion stream and triage views are ready for your review.",
        timestamp: hoursAgo(0.03),
      },
    ],
    agentWorkflow: completedWorkflow(),
  },
  {
    id: "chat_clinic",
    title: "Panchkarma Clinic Website",
    folderId: "folder_web",
    createdAt: hoursAgo(26),
    updatedAt: hoursAgo(25),
    messages: [
      {
        id: "msg_clinic_1",
        role: "user",
        content:
          "Create an Ayurvedic Panchkarma clinic website with treatment pages, therapist profiles and an appointment request form.",
        timestamp: hoursAgo(26),
      },
      {
        id: "msg_clinic_2",
        role: "assistant",
        content:
          "Workflow complete. The site structure, treatment content model and appointment form validation are all in place.",
        timestamp: hoursAgo(25),
      },
    ],
    agentWorkflow: completedWorkflow(),
  },
  {
    id: "chat_network",
    title: "Network Security Tool",
    folderId: "folder_security",
    createdAt: hoursAgo(50),
    updatedAt: hoursAgo(49),
    messages: [
      {
        id: "msg_network_1",
        role: "user",
        content: "Build a secure network monitoring tool that flags anomalous traffic patterns across subnets.",
        timestamp: hoursAgo(50),
      },
      {
        id: "msg_network_2",
        role: "assistant",
        content:
          "Workflow complete. Packet sampling, anomaly scoring and the subnet overview are implemented and reviewed.",
        timestamp: hoursAgo(49),
      },
    ],
    agentWorkflow: completedWorkflow(),
  },
  {
    id: "chat_api",
    title: "Python REST API",
    createdAt: hoursAgo(74),
    updatedAt: hoursAgo(73),
    messages: [
      {
        id: "msg_api_1",
        role: "user",
        content: "Create a Python REST API with token authentication, role-based access and OpenAPI docs.",
        timestamp: hoursAgo(74),
      },
      {
        id: "msg_api_2",
        role: "assistant",
        content: "Workflow complete. Auth routes, role guards and generated OpenAPI documentation are ready.",
        timestamp: hoursAgo(73),
      },
    ],
    agentWorkflow: completedWorkflow(),
  },
];
