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

`/work/voice-trading-agent` has a live demo (`src/components/VoiceDemo.tsx`). Visitors can get quotes, check their paper portfolio, place previewed orders, hear a neutral summary of real headlines about a stock, and paste a forwarded tip to see its warning signs, in English or Hindi. Speech-to-text and text-to-speech run in the browser, so they need no key. The agent runs in `src/app/api/agent/route.ts` on top of [paper-broker-mcp](https://github.com/dubeyanant/paper-broker-mcp) (pinned to a release tag in `package.json`), which also provides the MCP server, the simulated account, the news tool and the tip checker.

It works without any key, using the package's offline parser. To use a real model, set one key:

1. Copy `.env.example` to `.env.local` and fill in `ANTHROPIC_API_KEY` or `GEMINI_API_KEY`.
2. For the live site, add the same variable in Vercel (Project, Settings, Environment Variables) and redeploy.

Keys stay out of git: `.env*` files are ignored, except `.env.example`. `AGENT_HOURLY_LIMIT` and `AGENT_DAILY_LIMIT` cap model calls; past the cap the demo quietly switches to the offline parser.

With a Gemini key the package tries `gemini-3.8-flash`, then `gemini-3.6-flash`, then `gemini-3.5-flash-lite` when a model is busy or out of quota, and answers with the offline parser if all of them fail. The demo labels those answers "AI busy, answered offline", and the route logs the reason (Vercel, Logs). A free Gemini key runs out of quota quickly; enabling billing on the key keeps the AI answering.

To update the package: release a new tag in paper-broker-mcp, change the `#vX.Y.Z` in `package.json`, run `bun install`, build, commit `package.json` and `bun.lock`.
