import { loadConfig } from "./config.js";
import { init, chat } from "./provider.js";

const message = process.argv[2];

if (!message) {
  console.error("Usage: npx tsx src/index.ts \"your message\"");
  process.exit(1);
}

const config = await loadConfig();
init(config.anthropicApiKey, {
  model: config.model,
  maxTokens: config.maxTokens,
});

try {
  const response = await chat([{ role: "user", content: message }]);
  console.log(response.content);
  if (response.usage) {
    console.log(
      `\n[tokens: ${response.usage.input} in, ${response.usage.output} out]`,
    );
  }
} catch (err) {
  console.error("API error:", err instanceof Error ? err.message : err);
  process.exit(1);
}
