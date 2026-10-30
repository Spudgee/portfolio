const GIVEN_NAME = "Cooper";
const FAMILY_NAME = "Agustin";

/** Who the site is about. The name is spelled this way everywhere, so search engines see one entity. */
export const PERSON = {
	givenName: GIVEN_NAME,
	familyName: FAMILY_NAME,
	name: `${GIVEN_NAME} ${FAMILY_NAME}`,
	jobTitle: "Founding Engineer",
	/** The one-line role used in titles, the preview image and its alt text. */
	headline: "Founding Engineer at Doccy and Medlo",
	/**
	 * The home page's statement, as runs of text; a run with `href` renders as a link.
	 * Read after the name line, the whole H1 answers who, what role and which companies.
	 */
	statement: [
		{ text: `I'm ${GIVEN_NAME}, a founding engineer building telehealth at ` },
		{ text: "Doccy", href: "https://doccy.com.au" },
		{ text: " and locum shifts at " },
		{ text: "Medlo", href: "https://medlo.com.au" },
		{ text: ", from the first commit." },
	],
	stack: [
		"Next.js",
		"React",
		"TypeScript",
		"tRPC",
		"PostgreSQL",
		"Prisma",
		"Supabase",
		"Tailwind CSS",
	],
	socialLinks: [
		{ label: "GitHub", href: "https://github.com/Spudgee" },
		{ label: "LinkedIn", href: "https://www.linkedin.com/in/cooper-agustin/" },
	],
} as const;
