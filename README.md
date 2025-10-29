# AI Smart Contract Generator

A simple, public starter app that generates smart contract templates from natural language prompts.

- **Stack**: TypeScript, Next.js (App Router), minimal CSS
- **Blockchain**: Cardano (template via Lucid types), EVM (Solidity sample)
- **No external AI key required**: Uses rule-based templates to keep it zero-config

## Features

- **Prompt-to-template**: Describe your contract idea; get a starting template
- **Cardano**: Plutus validator skeleton and native script JSON minting policy
- **EVM**: Minimal Solidity escrow contract template
- **Copy to clipboard**: Quick copy for editing in your editor

> Important: Generated code is a starting point only. Always review, test, and audit before mainnet use.

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Open the app
# http://localhost:3000
```

## How It Works

- UI posts your prompt to an API route (`app/api/generate/route.ts`).
- The route chooses a template based on selected chain/language and returns code.
- For Cardano + Plutus, it appends a native script JSON minting policy example (signature-based).

Key files:

- `app/page.tsx`: Main UI
- `app/api/generate/route.ts`: API that returns generated templates
- `lib/templates.ts`: Template generation utilities
- `lib/cardano.ts`: Minimal Cardano helpers (Lucid types reference)
- `components/CodeBlock.tsx`: Simple code display

## Deploy

- You can deploy to Vercel easily:
  - Push this repo to GitHub
  - Create a new Vercel project from the repo
  - Use default settings for a Next.js app

## License

MIT – see [LICENSE](./LICENSE).
