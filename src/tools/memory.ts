import type { Tool } from "./types.js";
import { readMemory, appendMemory } from "../agent/memory.js";

export const memoryTool: Tool = {
  name: "memory",
  description:
    "Read or save to long-term memory (MEMORY.md). Persists across all sessions forever.",
  parameters: {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: ["read", "save"],
        description: "Action to perform",
      },
      note: {
        type: "string",
        description: "Text to save (required for save)",
      },
    },
    required: ["action"],
  },
  async execute(params) {
    const action = params.action as string;
    const note = params.note as string | undefined;

    switch (action) {
      case "read":
        return readMemory() || "(empty)";
      case "save":
        if (!note) return "Error: 'note' is required for save";
        appendMemory(note);
        return "Saved to long-term memory.";
      default:
        return `Error: unknown action "${action}"`;
    }
  },
};
