# Crux

Crux is the sans-serif demo app in this monorepo. It uses Geist Sans (with Geist Mono for mono accents) and the shared `@repo/ui` components.

## Run locally

From the repo root:

```bash
bun install
bun turbo dev --filter=crux
```

App runs on http://localhost:3000.

To run all apps at once:

```bash
bun dev
```

## What's inside

- Next.js App Router (`src/app`)
- Theme toggle and branch indicator from `@repo/ui`
- Tailwind v4 styles in `src/app/globals.css`

## Key files

- `src/app/page.tsx` - main screen
- `src/app/layout.tsx` - fonts + providers
- `src/app/globals.css` - global styles
