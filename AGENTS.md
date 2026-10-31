# Portfolio

Cooper Agustin's personal site, served static from Vercel at `https://cooperagustin.vercel.app` (the `SITE_URL` constant in `content/site.ts`). Where this file and the code disagree, this file wins.

## What the site says

**Experience leads.** Cooper is a founding engineer at Doccy (telehealth, doccy.com.au) and Medlo (locum marketplace, medlo.com.au); the home page exists to show that work.

- `/` — one sentence naming Cooper, the founding-engineer role and both companies (the H1), then experience: what was built at each company, with dates and numbers where they are true, then the stack. Projects join here as they ship.
- `/education` — RMIT and grades. Secondary: one link in the header, nothing about it on the home page.
- `app/not-found.tsx` serves a real 404.

Copy, links and paths live once, in typed modules under `content/`. Pages, header, footer, metadata, JSON-LD and the sitemap all read from them, so a role, date or URL changes in one place.

## Design direction

**Swiss and small**: studio-grade, typography doing all the work, every line of text the same small size. References, and what each contributes:

- [Luke Hoban](https://lukehoban.co.nz) — the model: all text small, information set in columns across a 12-column grid, hierarchy from colour and position, most of the page left empty. Take the small type, not its giant "Selected Work" heading.
- [Shovel](https://www.shovel.studio) — text-only nav and social links, work as a name plus one factual line, underlines that appear on hover. Take the text links, not its pill-shaped nav buttons.
- [F451](https://f451.studio) — one text size for everything, each project as stacked lines of facts (name, site, year, disciplines, stack), and a nav where the current page is ink and the others grey.
- [Nuevo.Tokyo](https://www.nuevo.tokyo) — small text in columns: short descriptor lines on the left, the statement in a middle column, generous off-white space. Take the layout, not its monospace capitals.
- [Katharina Nejdl](https://portfolio.katharinanejdl.com/about) — simple lines: every fact a row under a thin rule, date first; all-caps chrome; capitalised words throughout. Take the rules and the casing, not its boxed tag buttons.

The rules that hold it together:

- **Type** — one family, Hanken Grotesk via `next/font/google`, weights 400 and 500. One size: the `--text-body` token in `app/globals.css` (13 px). The default Tailwind size scale is removed, so `text-body` is the only named size, and the e2e fails if any text node renders at another size. Hierarchy comes from weight, colour, rules and position.
- **Colour** — monochrome: paper, ink and one muted grey, as tokens in `app/globals.css`. Muted text holds 4.5:1 contrast on paper. Dark mode follows the OS through `prefers-color-scheme` in CSS, with no toggle.
- **Space and lines** — content sits directly on the page, aligned to shared column lines: dates and labels in columns 1–3, content from column 4. Each row of facts (a role, a degree detail, the stack) sits under a 1 px ink rule, and the list closes with one; the header has a rule beneath, the footer one above. Mobile is one column.
- **Case** — never lowercase. Header and footer are all caps (CSS `uppercase`, `tracking-wider`); headings, labels, names and titles are capitalised words; sentences start with a capital.
- **Copy** — short, factual: what was built, for whom, when.
- **Text only** — every control is a text link. No buttons, pills, boxes, icons or images.
- **Motion** — the hover underline is the only animation.

## Header and footer

Both are quiet text on the page, in all caps. The caps come from the CSS `uppercase` class, so the source and accessible names keep proper capitals ("Cooper Agustin", "GitHub").

- **Header** — the name (links to `/`) and Education. The current page's link is ink (`aria-current="page"`), the other muted, as on F451.
- **Footer** — one line: `© <year> Cooper Agustin`, GitHub, LinkedIn.
- **Hover underline** — every header and footer link is `components/hover-underline-link.tsx`: the underline is always drawn in a transparent colour and fades to `currentColor` on `:hover` and `:focus-visible` (1 px thick, 3 px offset, 150 ms), with a 44 px tall hit area. The line already exists, so nothing shifts. Links inside running text use `components/inline-link.tsx`, underlined at rest.
- Tailwind v4's `hover:` fires only on hover-capable devices, so on touch a header or footer link must read as a link from its position alone.

## Fast core

- **Static** — every route prerenders: `bun run build` marks each one `○ (Static)`. Reading cookies, headers or search params, or fetching per request, breaks this.
- **Server Components** — a `"use client"` file needs a job CSS cannot do.
- **Dependencies** — the site ships Next, React and Tailwind only: no UI kit, icon pack, animation library or third-party script. Dev tools (Biome, oxlint, Playwright) stay in `devDependencies`.
- **Check** — Lighthouse (mobile) against `bun run build && bun run start`: Performance ≥ 95 and CLS 0 (2026-10-18: 98–99, real first paint 0.7 s). Its simulated LCP (~2.3 s) counts the Next runtime download; search engines rank on field Core Web Vitals instead: p75 LCP ≤ 2.5 s, INP < 200 ms, CLS < 0.1.

## SEO and GEO

AI engines retrieve pages much as search engines do, so one job serves both: readable server HTML, one clear entity, facts stated plainly.

- **One entity** — the name is "Cooper Agustin" everywhere: site, titles, JSON-LD, GitHub and LinkedIn.
- **Answer first** — the H1 of `/` states the name, the founding-engineer role and both company names. Each section still makes sense when quoted on its own.
- **Per route** — a unique `<title>` (`<page> – Cooper Agustin`; the home title carries the founding-engineer line), one H1, a page-specific description, an absolute self-canonical and a 1200×630 `og:image`, all through `lib/page-metadata.ts`.
- **JSON-LD** — one `@graph` per page from `lib/json-ld.ts`, server-rendered with every `<` escaped. `/` holds `WebSite` (`/#website`), a `ProfilePage` and its `mainEntity` `Person` (`/#person`: `jobTitle`, `worksFor` Doccy and Medlo, `knowsAbout` the stack, `sameAs` GitHub and LinkedIn). `/education` adds `alumniOf` RMIT to the same `/#person` node. Markup mirrors the visible text of its own page.
- **Crawl files** — `app/sitemap.ts` lists canonical URLs, with `lastmod` only where a real date exists; `app/robots.ts` allows every crawler, AI ones included, and points at the sitemap.
- Skip `llms.txt`, FAQ or HowTo markup, the `keywords` meta, `priority` and `changefreq`: no engine reads them.

## Working here

- Bun only; npm, pnpm and yarn installs are refused on purpose.
- Tailwind v4 is configured in CSS (`@theme` in `app/globals.css`); there is no `tailwind.config`.
- Before finishing: `bun run check` (Biome format, lint and imports; it writes), `bun run lint` (oxlint), `bun run build`, then `bun run test:e2e` (Playwright against the built site on port 3100; `e2e/site.spec.ts`). CI runs lint, build and e2e on `main` and `staging`.
- Work lands on `staging`. Vercel deploys `main` only, so there are no preview URLs: check changes locally.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
