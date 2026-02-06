import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages.js";

export interface LLMResponse {
  content: string;
  usage?: { input: number; output: number };
}

let client: Anthropic;
let model: string;
let maxTokens: number;

export function init(
  apiKey: string,
  opts: { model: string; maxTokens: number },
) {
  client = new Anthropic({ apiKey });
  model = opts.model;
  maxTokens = opts.maxTokens;
}

export async function chat(messages: MessageParam[]): Promise<LLMResponse> {
  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    messages,
  });

  const textBlock = response.content.find((b) => b.type === "text");
  const content = textBlock ? textBlock.text : "";

  return {
    content,
    usage: {
      input: response.usage.input_tokens,
      output: response.usage.output_tokens,
    },
  };
}
