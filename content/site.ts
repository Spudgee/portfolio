/** Production origin: every canonical, sitemap entry and JSON-LD `@id` is built from it. */
export const SITE_URL = "https://cooperagustin.vercel.app";

/** Language of every page, as BCP 47. */
export const LOCALE = "en-AU";

/** Every route, named once. */
export const PATHS = { home: "/", education: "/education" } as const;

/** Primary navigation, in reading order. Contact jumps to the footer, which every page has. */
export const NAV_LINKS = [
	{ label: "Work", href: "/#experience" },
	{ label: "Education", href: PATHS.education },
	{ label: "Contact", href: "#contact" },
] as const;

/** Indexable routes, in sitemap order. */
export const PAGE_PATHS = [PATHS.home, PATHS.education] as const;

/**
 * Absolute URL for a site path, spelled exactly as Next writes the canonical:
 * the home page has no trailing slash.
 * @see app/sitemap.ts
 */
export function siteUrl(path: string) {
	return path === PATHS.home ? SITE_URL : `${SITE_URL}${path}`;
}
