import { PERSON } from "@/content/person";

/** Production origin: every canonical, sitemap entry and JSON-LD `@id` is built from it. */
export const SITE_URL = "https://cooperagustin.vercel.app";

/** Language of every page, as BCP 47. */
export const LOCALE = "en-AU";

/** Every route, named once. */
export const PATHS = {
	home: "/",
	archive: "/archive",
} as const;

/**
 * The home page's sections, top to bottom: each is one screen of the carousel and one nav item.
 * Only About carries a statement, the one summary at the top; the rest are a label and their rows.
 */
export const SECTIONS = [
	{ id: "about", label: "About", statement: PERSON.bio },
	{ id: "work", label: "Work" },
	{ id: "education", label: "Education" },
	{ id: "contact", label: "Contact" },
] as const;

export type Section = (typeof SECTIONS)[number];

/** Indexable routes, in sitemap order. */
export const PAGE_PATHS = [PATHS.home, PATHS.archive] as const;

/**
 * Absolute URL for a site path, spelled exactly as Next writes the canonical:
 * the home page has no trailing slash.
 * @see app/sitemap.ts
 */
export function siteUrl(path: string) {
	return path === PATHS.home ? SITE_URL : `${SITE_URL}${path}`;
}
