## Template: Solid SPA

> A reusable starter template for building Solid single-page apps with Solid UI (Kobalte) preconfigured.

### Features

- **Solid UI** via **@kobalte/core** components
- **Tailwind CSS v4** with `@kobalte/tailwindcss` plugin and theme tokens
- **Router ready** (`@solidjs/router` installed) if you want to add routes
- **DX**: ESLint, Prettier, TypeScript strict mode, Vitest + Testing Library

## Quickstart

Install dependencies (choose one):

```bash
# Bun
bun run install
bun run start
```

Build and preview:

```bash
# Build
bun run build    # or: npm run build

# Preview built assets
bun run serve    # or: npm run serve
```

Quality checks:

```bash
bun run typecheck
bun run lint
bun run format
bun run test
```

## Using Solid UI components

### Add more components from the registry

This repo includes a helper script that wraps the Solid UI registry CLI:

```bash
# Bun
bun run component button      # download button
bun run component text-field  # download text-field
```

The script uses `solidui-cli add` under the hood and will place the component files in `src/components/ui/` with the styles ready to go.

## Deployment

Builds are static (`dist/`) and can be deployed to any static host (e.g., Netlify, Vercel static, GitHub Pages, Cloudflare Pages).

## License

MIT — use freely in your own projects.
