import type { MessageParam } from "@anthropic-ai/sdk/resources/messages.js";
import { readMemory } from "./memory.js";

function identity(): string {
  return [
    "You are a helpful, general-purpose AI assistant.",
    "Be concise. Think step by step when using tools.",
    "You can help with questions, writing, analysis, coding, math, and anything else the user needs.",
    "Do not assume what the user wants help with, just respond to what they ask.",
  ].join(" ");
}

function dynamicContext(): string {
  const now = new Date().toISOString();
  const cwd = process.cwd();
  return `Current time: ${now}\nWorking directory: ${cwd}`;
}

function memoryContext(): string {
  const content = readMemory();
  if (!content) return "";
  return `## Long-term Memory\n${content}`;
}

function memoryInstructions(): string {
  return [
    "## Memory Instructions",
    '- Save when the user explicitly asks ("remember X").',
    "- Save autonomously when you detect noteworthy facts or preferences — no confirmation needed.",
    "- Keep notes concise. Only save durable facts, not ephemeral context.",
  ].join("\n");
}

export function buildSystemPrompt(): string {
  const parts = [identity(), dynamicContext()];
  const mem = memoryContext();
  if (mem) parts.push(mem);
  parts.push(memoryInstructions());
  return parts.join("\n\n");
}

export function buildMessages(
  history: MessageParam[],
  userMessage: string,
): MessageParam[] {
  return [...history, { role: "user" as const, content: userMessage }];
}
