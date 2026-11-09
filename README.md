# Sudobility Design System

A standalone showcase for the Sudobility design system, extracted from the
`mail_box` app's `/internal/design` pages. The home page is a catalog of design
areas (colors, typography, components, patterns); each area has its own page
demonstrating the `@sudobility/design` + `@sudobility/components` primitives.

Built with React 19 + TypeScript + Vite + Tailwind CSS, on the
`@sudobility/building_blocks` app shell. No authentication, no backend.

## Commands

The `@sudobility/*` dependencies are published to **GitHub Packages**
(`.npmrc` points `@sudobility` at `npm.pkg.github.com`), so installing requires
a GitHub token with `read:packages` exported as `NODE_AUTH_TOKEN` (or configured
in `~/.npmrc`) before `bun install`.

```bash
bun install          # install dependencies (needs GitHub Packages auth, see above)
bun run dev          # dev server on http://localhost:4000
bun run build        # type-check + production build (tsc -b && vite build)
bun run preview      # preview the production build
bun run lint         # ESLint
bun run format       # Prettier
```

## Structure

- `src/App.tsx` — routes (`/:lang`, `/:lang/design/*`, `/:lang/settings`, `/:lang/docs`)
- `src/components/ScreenContainerLayout.tsx` — app shell (topbar, breadcrumbs, footer)
- `src/pages/DesignSystemPage.tsx` — home (design-area grid + live theme preview)
- `src/pages/design/*` — 21 design showcase pages
- `src/pages/SettingsPage.tsx` — appearance controls (light/dark, font size, design theme)
- `src/pages/DocsPage.tsx` — overview + library repo links
- `src/context/DesignThemeContext.tsx`, `src/config/designTheme.ts` — runtime design-theme system
- `src/stubs/*` — no-op stubs for `building_blocks` optional peer deps (aliased in `vite.config.ts`)

## Internationalization

The `/:lang` routing and language selector support 15 languages (`src/i18n.ts`):
`en`, `zh`, `zh-hant`, `ja`, `ko`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `sv`,
`th`, `uk`, `vi`. All 15 are fully translated — each `public/locales/<lang>/`
holds `common.json` (chrome) plus one JSON namespace per showcase page. Missing
keys fall back to `en`. Translations are regenerated with `bun run localize`
(calls the Whisperly batch-translate workflow) and checked with `bun run localized`.

## Theming

Two independent systems, both persisted to localStorage under distinct keys:

- **Light / dark + font size** — the `@sudobility/components` `ThemeProvider`
  (key `sudobility-design-theme`), controlled from Settings.
- **Design theme (palette)** — `DesignThemeContext` (key `sudobility-design-palette`),
  swaps the whole design-token palette live; controlled from Settings and the
  home page.

## Deployment

Cloudflare Pages (`wrangler.toml`, output `dist/`). A Pages Function
(`functions/_middleware.js`, from `@sudobility/seo_lib/middleware`) injects the
prerendered SEO snapshots at request time.

`bun run generate` builds the static SEO assets: it processes static files,
generates `sitemap.xml`/`robots.txt` (`seo.config.mjs`), and prerenders content
snapshots into `public/html/` by driving the **running** dev server with
headless Chromium (`scripts/prerender.mjs` — start `bun run dev` first).

App config comes from `VITE_*` env vars (see `.env.example`). The only Firebase
var is `VITE_FIREBASE_PROXY`, a reverse proxy that keeps Firebase working for
mainland-China users; leave it blank to use Firebase directly.
