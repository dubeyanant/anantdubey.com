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
