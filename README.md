# sandgarden-bot

AI agent built from scratch in TypeScript to learn agent internals. Uses the Anthropic SDK directly (no frameworks) to expose the raw mechanics of tool use, context building, and session management.

## Setup

```bash
npm install
cp bot.config.example.ts bot.config.ts
# Edit bot.config.ts and add your Anthropic API key
```

## Usage

```bash
npx tsx src/index.ts "Hey, can you tell me a joke?"
```
