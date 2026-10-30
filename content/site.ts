/** Production origin: every canonical, sitemap entry and JSON-LD `@id` is built from it. */
export const SITE_URL = "https://cooperagustin.vercel.app";

/** Language of every page, as BCP 47. */
export const LOCALE = "en-AU";

/** Every route, named once. */
export const PATHS = {
	home: "/",
} as const;

/** The home page's sections, top to bottom: each is one screen of the carousel and one nav item. */
export const SECTIONS = [
	{ id: "work", label: "Work" },
	{ id: "education", label: "Education" },
	{ id: "about", label: "About" },
	{ id: "contact", label: "Contact" },
] as const;

/** Indexable routes, in sitemap order. */
export const PAGE_PATHS = [PATHS.home] as const;

/**
 * Absolute URL for a site path, spelled exactly as Next writes the canonical:
 * the home page has no trailing slash.
 * @see app/sitemap.ts
 */
export function siteUrl(path: string) {
	return path === PATHS.home ? SITE_URL : `${SITE_URL}${path}`;
}
