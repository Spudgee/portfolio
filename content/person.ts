const GIVEN_NAME = "Cooper";
const FAMILY_NAME = "Agustin";

/** The home statement, as it is broken into paragraphs on the page. */
const STATEMENT = [
	"Founding engineer at Doccy and Medlo, working where engineering meets product design. Doccy brings telehealth to patients across Australia, with consults, certificates and prescriptions online; Medlo matches hospitals with locum doctors.",
	"Across both, the work is building around the people who use the software and refining the details until the experience feels obvious.",
] as const;

/** Who the site is about. The name is spelled this way everywhere, so search engines see one entity. */
export const PERSON = {
	givenName: GIVEN_NAME,
	familyName: FAMILY_NAME,
	name: `${GIVEN_NAME} ${FAMILY_NAME}`,
	jobTitle: "Founding Engineer",
	/** The one-line role used in titles, the preview image and its alt text. */
	headline: "Founding Engineer at Doccy and Medlo",
	/** The home statement's paragraphs. */
	statement: STATEMENT,
	/** The same statement as one paragraph, for search engines. */
	bio: STATEMENT.join(" "),
	/** The Contact page's statement. */
	contactNote:
		"Always happy to talk product, design and healthcare. LinkedIn is the quickest way to reach out.",
	/** Tools by area, one row each in the About section; search engines get the flat list. */
	stack: [
		{ area: "Frontend", tools: ["Next.js", "React", "Tailwind CSS"] },
		{ area: "Backend", tools: ["tRPC", "PostgreSQL", "Prisma", "Supabase"] },
		{ area: "Language", tools: ["TypeScript"] },
	],
	socialLinks: [
		{ label: "GitHub", brand: "github", href: "https://github.com/Spudgee" },
		{
			label: "LinkedIn",
			brand: "linkedin",
			href: "https://www.linkedin.com/in/cooper-agustin/",
		},
	],
} as const;
