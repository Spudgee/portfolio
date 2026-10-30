/** Production origin: every canonical, sitemap entry and JSON-LD `@id` is built from it. */
export const SITE_URL = "https://cooperagustin.vercel.app";

/** Language of every page, as BCP 47. */
export const LOCALE = "en-AU";

/** Every route, named once. */
export const PATHS = {
	home: "/",
	work: "/work",
	archive: "/archive",
	contact: "/contact",
} as const;

/**
 * The nav, in order. Home, Work and Contact are sections of the home page (`section` is the id the
 * nav fills while it is on screen); Archive is its own page.
 */
export const NAV_ITEMS = [
	{ label: "Home", href: "/#home", section: "home" },
	{ label: "Work", href: "/#work", section: "work" },
	{ label: "Archive", href: PATHS.archive, section: null },
	{ label: "Contact", href: "/#contact", section: "contact" },
] as const;

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
