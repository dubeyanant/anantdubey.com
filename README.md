# anantdubey.com

Anant Dubey's personal site: a sheet of Indian commemorative stamps, one per shipped thing.

- Next.js 16 (App Router, Cache Components), Tailwind CSS 4, Bun.
- Content lives in `src/content/` (markdown: `writing`, `logs`, `tales`, `verses`) and `src/data/site.ts` (work, album, experience). Every claim comes from Anant's master profile.
- `/coach`, `/coach/*` and `/chitt` are static pages in `public/`, rewritten in `next.config.ts`. App-store listings link to them; keep the URLs stable.

```sh
bun install
bun dev      # http://localhost:3000
bun run build
```

## Voice demo and API keys

`/work/voice-trading-agent` has a live demo. Speech-to-text and text-to-speech run in the browser, so they need no key. The agent runs in `src/app/api/agent/route.ts` on top of [paper-broker-mcp](https://github.com/dubeyanant/paper-broker-mcp), which also provides the MCP server and the simulated account.

It works without any key, using the package's offline parser. To use a real model, set one key:

1. Copy `.env.example` to `.env.local` and fill in `ANTHROPIC_API_KEY` or `GEMINI_API_KEY`.
2. For the live site, add the same variable in Vercel (Project, Settings, Environment Variables) and redeploy.

Keys stay out of git: `.env*` files are ignored, except `.env.example`. `AGENT_HOURLY_LIMIT` and `AGENT_DAILY_LIMIT` cap model calls; past the cap the demo quietly switches to the offline parser.
