# CLAUDE.md

## What this is

A standalone showcase/catalog web app for the **Sudobility design system**
(not the design library itself — that lives in the `@sudobility/*` packages).
Extracted from `mail_box`'s `/internal/design` pages. No auth, no app backend.
Live at https://designs.sudobility.com.

## Stack

React 19 + TypeScript + Vite 7 + Tailwind 3, on the `@sudobility/building_blocks`
app shell. Package manager is **bun** (`bun.lock`). Deploys to Cloudflare Pages.

## Commands (verified in package.json)

- `bun install` — needs GitHub Packages auth (see below)
- `bun run dev` — Vite dev server on **port 4000** (fixed in `vite.config.ts`)
- `bun run build` — `tsc -b && vite build` → `dist/`
- `bun run lint` / `bun run format` — ESLint / Prettier
- `bun run localize` — regenerate all translations via Whisperly workflow
- `bun run localized` — verify translation completeness
- `bun run generate` — build SEO/prerender snapshots (requires a running dev server)

No test runner is configured — there are no tests.

## Install gotcha (critical)

`.npmrc` routes `@sudobility` to `npm.pkg.github.com` (GitHub Packages).
`bun install` fails without a GitHub token with `read:packages` (via
`NODE_AUTH_TOKEN` or `~/.npmrc`). Many deps are private `@sudobility/*` packages.

## Architecture

- `src/App.tsx` — all routes under `/:lang`: index = `DesignSystemPage`, 21
  lazy-loaded `design/<slug>` pages (slug→component map in App.tsx), `settings`,
  `docs`, `404`. Root `/` redirects to `/<detected-lang>`.
- `src/pages/design/*` — 21 showcase pages, one per design area. Each renders
  real production `@sudobility/components` + `@sudobility/design` primitives.
- `src/components/ScreenContainerLayout.tsx` — shell (topbar, breadcrumbs, footer).
- `src/config/designTheme.ts` + `src/context/DesignThemeContext.tsx` — runtime
  design-theme (palette) system: injects theme CSS custom properties live.
- `src/main.tsx` — sets Firebase China proxy before anything else initializes.
- `functions/_middleware.js` — Cloudflare Pages Function; injects prerendered
  SEO snapshots (from `@sudobility/seo_lib/middleware`).

## Two independent theme systems (don't conflate)

Both persist to localStorage under **distinct** keys:
- Light/dark + font size — `@sudobility/components` `ThemeProvider`, key
  `sudobility-design-theme` (= `storageKeyPrefix` + `-theme`).
- Design palette — `DesignThemeContext`, key `sudobility-design-palette`.
Themes come from `@sudobility/design/themes`; the default `default` is a no-op.

## Stubs (non-obvious)

`src/stubs/*` are no-op stubs for optional peer deps of `building_blocks`
(auth, subscription, devops, firebase/auth, di_web). They are wired via `alias`
in `vite.config.ts` — edit the alias map there if a stubbed import breaks. The
same config aliases `react`/`react-dom`/`react-helmet-async` to the local copy
so every package shares one React instance (also in `dedupe`).

## i18n

15 languages, all fully translated. `src/i18n.ts` lists `supportedLanguages`;
`public/locales/<lang>/` has `common.json` + one namespace JSON per page.
`seo.config.mjs` must keep the same language list. Don't hand-edit non-`en`
locale JSON — regenerate with `bun run localize`.

## Conventions

- Prettier + ESLint (flat config, `eslint.config.js`). TS strict mode on.
- Path alias `@/*` → `src/*` (tsconfig). License: BUSL-1.1.
