# Portfolio

Cooper Agustin's personal site, served from Vercel at `https://cooperagustin.dev` (the `SITE_URL` constant in `content/site.ts`). Where this file and the code disagree, this file wins.

## What the site says

**The person leads, not the work.** Cooper is a founding engineer at Doccy (telehealth, doccy.com.au) and Medlo (locum marketplace, medlo.com.au), and a product- and experience-focused engineer.

- `/` (Home): only the two-paragraph statement (`STATEMENT` in `content/person.ts`). It is the site's one summary.
- `/work`: Experience, Education and Stack, each a `ContentGroup` of `RowList` rows.
- `/archive`: an image grid fed from the Are.na channel in `content/archive.ts`, 2 columns on phones and 4 on desktop, plus a "View on Are.na" pill.
- `/contact`: one note (`contactNote`).
- `/qr`: hidden (noindex, not in the nav or sitemap). It shows one QR code that opens LinkedIn.
- Retired paths redirect in `next.config.ts`: `/about` → `/`, and `/education`, `/stack` and `/projects` → `/work`. A blog joins the nav later through `NAV_PAGES`.
- `app/not-found.tsx` serves a real 404.

**Copy rules:**

- No first or third person on the page.
- Lead with "Founding engineer at Doccy and Medlo".
- Never "from the first commit".
- Never mention Medlo Evidence.
- State only facts that are true.

Copy, links and paths live once, in typed modules under `content/`.

## Design direction

**Calm, minimal, product-grade.** Large grey type, generous space and soft pills, after brianlovin.com's spacing and f451.studio's restraint.

- **Type:** Inter with optical sizing, through `next/font/google`. Three sizes are tokens in `app/globals.css`:
  - `text-body`: 16px, for rows;
  - `text-row`: 20px, for headings and phone statements;
  - `text-lead`: 24px, for the nav, the desktop statement and the menu.
  Hierarchy comes from size, weight (400/500) and ink versus muted grey.
- **Colour:** `paper`, `ink`, `muted`, `pill` and `pill-soft` tokens. Light mode is white paper; dark mode is neutral oklch(0.205). The theme follows the OS until the switch picks Light or Dark. The choice is stored in localStorage and applied before paint by `THEME_BOOT_SCRIPT` as `data-theme` on `<html>`.
- **Layout:** content is centred in a 40rem column; Archive runs to 72rem. No rules, boxes or shader backgrounds.
- **Links:**
  - Nav links are `PillLink`: grey text, a soft pill on hover, and a darker pill for the current page (`aria-current="page"`).
  - The name is a `HighlightLink`.
  - Row titles take an ink-block hover.

## Header and footer

- **Header:** sticky. The name sits on the left. On desktop, the nav (Home · Work · Archive · Contact) and the round theme switch sit on the right.
- **Phone header:** a three-line button opens a full-screen menu downwards in 150ms. The links are at lead size, aligned with the name. The theme switch sits bottom-left and a round × bottom-right, within thumb reach.
- **Footer:** one cluster in the bottom-right corner on every page: `© <year> Cooper Agustin`, then the GitHub and LinkedIn icon buttons. It has no rule, and it sits at the bottom of short pages.
- **Profile links:** GitHub and LinkedIn appear only in the footer, never in page content.

## Fast core

- **Static** — every route prerenders: `bun run build` marks each one `○ (Static)`; `/archive` revalidates hourly. Reading cookies, headers or search params, or fetching per request, breaks this.
- **Server Components** — a `"use client"` file needs a job CSS cannot do.
- **Dependencies** — the site ships Next, React, Tailwind and `qrcode` (run at build time for `/qr`) only: no UI kit, icon pack, animation library or third-party script. Dev tools (Biome, oxlint, Playwright) stay in `devDependencies`.
- **Check** — Lighthouse (mobile) against `bun run build && bun run start`: Performance ≥ 95 and CLS 0 (2026-10-18: 98–99, real first paint 0.7 s). Its simulated LCP (~2.3 s) counts the Next runtime download; search engines rank on field Core Web Vitals instead: p75 LCP ≤ 2.5 s, INP < 200 ms, CLS < 0.1.

## SEO and GEO

AI engines retrieve pages much as search engines do, so one job serves both: readable server HTML, one clear entity, facts stated plainly.

- **One entity** — the name is "Cooper Agustin" everywhere: site, titles, JSON-LD, GitHub and LinkedIn.
- **Answer first** — the (visually hidden) H1 of `/` states the name, the founding-engineer role and both company names, and the statement says what both companies do.
- **Per route** — a unique `<title>` (`<page> – Cooper Agustin`; the home title carries the founding-engineer line), one H1, a page-specific description, an absolute self-canonical and a 1200×630 `og:image`, all through `lib/page-metadata.ts`.
- **JSON-LD** — one `@graph` per page from `lib/json-ld.ts`, server-rendered with every `<` escaped. `/` holds `WebSite` (`/#website`), a `ProfilePage` and its `mainEntity` `Person` (`/#person`: `jobTitle`, `worksFor` Doccy and Medlo, `knowsAbout` the stack, `sameAs` GitHub and LinkedIn). `alumniOf` carries RMIT. Other pages carry no JSON-LD. Markup mirrors facts the site shows.
- **Crawl files** — `app/sitemap.ts` lists canonical URLs, with `lastmod` only where a real date exists; `app/robots.ts` allows every crawler, AI ones included, and points at the sitemap.
- Skip `llms.txt`, FAQ or HowTo markup, the `keywords` meta, `priority` and `changefreq`: no engine reads them.

## Working here

- Bun only; npm, pnpm and yarn installs are refused on purpose.
- Tailwind v4 is configured in CSS (`@theme` in `app/globals.css`); there is no `tailwind.config`.
- Before finishing: `bun run check` (Biome format, lint and imports; it writes), `bun run lint` (oxlint), `bun run build`, then `bun run test:e2e` (Playwright against the built site on port 3100; `e2e/site.spec.ts`; stop any server left on 3100 first, or it is reused). CI runs lint, build and e2e on `main` and `staging`.
- Work lands on `staging` through a PR, then `staging` → `main`. Vercel deploys `main` only, so there are no preview URLs: check changes locally.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
