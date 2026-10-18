# Portfolio

Cooper Agustin's personal site, served static from Vercel at `https://cooperagustin.vercel.app`. Where this file and the code disagree, this file wins.

## What the site says

**Experience leads.** Cooper is a founding engineer at Doccy (telehealth, doccy.com.au) and Medlo (locum marketplace, medlo.com.au); the home page exists to show that work.

- `/` — the name, the founding-engineer line, then experience: what was built at each company, with dates and numbers where they are true. Projects join here as they ship.
- `/education` — RMIT and grades. Secondary: one link in the header, nothing about it on the home page.
- `app/not-found.tsx` serves a real 404.

Copy and links live once, in typed modules under `content/`. Pages, header, footer, metadata, JSON-LD and the sitemap all read from them, so a role, date or URL changes in one place.

## Design direction

**Swiss**, studio-grade, with typography doing all the work. References, and what each contributes:

- [Norgram](https://www.norgram.co) — one neo-grotesk at two extremes: a single huge display line and small body text on a strict grid, with most of the page left empty.
- [Daria Izbash](https://www.dariaizbash.com) — the name oversized as the hero; short metadata lines (place, role, year) spread across the columns.
- [Shovel — Work](https://www.shovel.studio/work) — text-only nav and social links; work listed as a name plus one factual result line; underlines that appear on hover.

The rules that hold it together:

- **Type** — one family, Hanken Grotesk via `next/font/google`, weights 400 and 500. The ramp is the `--text-*` tokens in `app/globals.css`: small, body, lead and display (each page's H1, sized so its longest word fits a 320 px phone). Hierarchy comes from size, weight, space and position alone.
- **Colour** — monochrome: paper, ink and one muted grey, as tokens in `app/globals.css`. Muted text holds 4.5:1 contrast on paper. Dark mode follows the OS through `prefers-color-scheme` in CSS, with no toggle.
- **Space** — content sits directly on the page, grouped by whitespace and aligned to shared column lines. Mobile is one column; desktop spreads the header and metadata across the grid.
- **Copy** — short, factual: what was built, for whom, when. Body text is sentence case with proper names capitalised; header and footer text is lowercase. Text only: links, social links included, are words, never icons or images.
- **Motion** — the hover underline is the only animation.

## Header and footer

Both are quiet text on the page, at small size and lowercase. The lowercase comes from the CSS `lowercase` class, so the source and accessible names keep proper capitals ("Cooper Agustin", "GitHub").

- **Header** — the name (links to `/`) and Education.
- **Footer** — one line: `© <year> Cooper Agustin`, GitHub, LinkedIn.
- **Hover underline** — every header and footer link is `components/hover-underline-link.tsx`: the underline is always drawn in a transparent colour and fades to `currentColor` on `:hover` and `:focus-visible` (1 px thick, 3 px offset, 150 ms). The line already exists, so nothing shifts. Links inside running text use `components/inline-link.tsx`, underlined at rest.
- Tailwind v4's `hover:` fires only on hover-capable devices, so on touch a header or footer link must read as a link from its position alone.

## Fast core

- **Static** — every route prerenders: `bun run build` marks each one `○ (Static)`. Reading cookies, headers or search params, or fetching per request, breaks this.
- **Server Components** — a `"use client"` file needs a job CSS cannot do.
- **Dependencies** — the site ships Next, React and Tailwind only: no UI kit, icon pack, animation library or third-party script. Dev tools (Biome, oxlint, Playwright) stay in `devDependencies`.
- **Images** — `next/image` with a fixed aspect ratio and `sizes`.
- **Check** — Lighthouse (mobile) against `bun run build && bun run start`: Performance ≥ 95 and CLS 0 (2026-10-18: 98–99, real first paint 0.7 s). Its simulated LCP (~2.3 s) counts the Next runtime download; search engines rank on field Core Web Vitals instead: p75 LCP ≤ 2.5 s, INP < 200 ms, CLS < 0.1.

## SEO and GEO

AI engines retrieve pages much as search engines do, so one job serves both: readable server HTML, one clear entity, facts stated plainly.

- **One entity** — the name is "Cooper Agustin" everywhere: site, titles, JSON-LD, GitHub and LinkedIn.
- **Answer first** — the opening lines of `/` state the name, the founding-engineer role and both company names. Each section still makes sense when quoted on its own.
- **Per route** — a unique `<title>` (`<page> – Cooper Agustin`; the home title carries the founding-engineer line), one matching H1, a page-specific description, an absolute self-canonical and a 1200×630 `og:image`, all through the Next Metadata API.
- **JSON-LD** — one `@graph` per page from one function, server-rendered with `<` escaped to `<`. Nodes: `WebSite` (`/#website`) and, on `/`, a `ProfilePage` whose `mainEntity` is the `Person` (`/#person`: `jobTitle`, `worksFor` Doccy and Medlo, `alumniOf` RMIT, `sameAs` GitHub and LinkedIn). Other pages reference `/#person` by `@id`. Markup mirrors visible text only.
- **Crawl files** — `app/sitemap.ts` lists canonical URLs, with `lastmod` only where a real date exists; `app/robots.ts` allows every crawler, AI ones included, and points at the sitemap. Both replace the hand-written files in `public/`.
- Skip `llms.txt`, FAQ or HowTo markup, the `keywords` meta, `priority` and `changefreq`: no engine reads them.

## Working here

- Bun only; npm, pnpm and yarn installs are refused on purpose.
- Tailwind v4 is configured in CSS (`@theme` in `app/globals.css`); there is no `tailwind.config`.
- Before finishing: `bun run check` (Biome format, lint and imports; it writes), `bun run lint` (oxlint), `bun run build`, then `bun run test:e2e` (Playwright against the built site on port 3100; `e2e/site.spec.ts`). CI runs lint, build and e2e on `main` and `staging`.
- Work lands on `staging`. Vercel deploys `main` only, so there are no preview URLs: check changes locally.
