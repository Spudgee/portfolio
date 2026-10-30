import { PERSON } from "@/content/person";

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
 * About opens the page with the longer statement; the others say what their rows cannot.
 */
export const SECTIONS = [
	{ id: "about", label: "About", statement: PERSON.bio },
	{
		id: "work",
		label: "Work",
		statement: "Building AI-native healthcare in Australia.",
	},
	{
		id: "education",
		label: "Education",
		statement: "I finished my degree while building Doccy and Medlo.",
	},
	{
		id: "contact",
		label: "Contact",
		statement: "If you're working on healthcare, I'd like to hear about it.",
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
