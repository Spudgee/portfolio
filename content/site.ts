/** Production origin: every canonical, sitemap entry and JSON-LD `@id` is built from it. */
export const SITE_URL = "https://cooperagustin.vercel.app";

/** Language of every page, as BCP 47. */
export const LOCALE = "en-AU";

/** Every route, named once. */
export const PATHS = {
	home: "/",
} as const;

/**
 * The home page's sections, top to bottom: each is one screen of the carousel and one nav item.
 * Each statement says what its rows cannot, so nothing on the page is said twice.
 */
export const SECTIONS = [
	{ id: "work", label: "Work", statement: "Building AI-native healthcare." },
	{
		id: "education",
		label: "Education",
		statement: "I majored in Advanced Computer Science in Melbourne.",
	},
	{
		id: "about",
		label: "About",
		statement:
			"I build Doccy's telehealth platform, Medlo's locum marketplace and Medlo Evidence, end to end and from the first commit.",
	},
	{
		id: "contact",
		label: "Contact",
		statement: "Code on GitHub, everything else on LinkedIn.",
	},
] as const;

export type Section = (typeof SECTIONS)[number];

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
