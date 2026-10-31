/** Production origin: every canonical, sitemap entry and JSON-LD `@id` is built from it. */
export const SITE_URL = "https://cooperagustin.dev";

/** Language of every page, as BCP 47. */
export const LOCALE = "en-AU";

/** Every route, named once. */
export const PATHS = {
	home: "/",
	work: "/work",
	archive: "/archive",
	contact: "/contact",
	/** Not in the nav or the sitemap: a LinkedIn QR code to show someone in person. */
	qr: "/qr",
} as const;

/** The nav, in order: four pages. */
export const NAV_PAGES = [
	{ label: "Home", path: PATHS.home },
	{ label: "Work", path: PATHS.work },
	{ label: "Archive", path: PATHS.archive },
	{ label: "Contact", path: PATHS.contact },
] as const;

/** Indexable routes, in sitemap order. */
export const PAGE_PATHS = [
	PATHS.home,
	PATHS.work,
	PATHS.archive,
	PATHS.contact,
] as const;

/**
 * Absolute URL for a site path, spelled exactly as Next writes the canonical:
 * the home page has no trailing slash.
 * @see app/sitemap.ts
 */
export function siteUrl(path: string) {
	return path === PATHS.home ? SITE_URL : `${SITE_URL}${path}`;
}
