import type { MessageParam } from "@anthropic-ai/sdk/resources/messages.js";

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

export function buildSystemPrompt(): string {
  return [identity(), dynamicContext()].join("\n\n");
}

export function buildMessages(
  history: MessageParam[],
  userMessage: string,
): MessageParam[] {
  return [...history, { role: "user" as const, content: userMessage }];
}
