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
	/** The longer statement that opens the page, also the description search engines read. */
	bio: "Founding engineer at Doccy and Medlo, working where engineering meets product design. Doccy brings telehealth to patients across Australia, with consults, certificates and prescriptions online; Medlo matches hospitals with locum doctors. Across both, the work is building around the people who use the software and refining the details until the experience feels obvious.",
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
