import type { BotConfig } from "./src/config.js";

const config: BotConfig = {
  anthropicApiKey: "your-api-key-here",
  model: "claude-sonnet-4-20250514",
  maxTokens: 4096,

  // Telegram (optional — only needed for `npm run telegram`)
  // telegramBotToken: "123456:ABC-DEF...",
  // allowedChatIds: [123456789],
};

export default config;
