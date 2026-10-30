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
	/** The home page's H1: the mission, then the role. The header above it carries the name. */
	introduction:
		"Building AI-native healthcare. Founding engineer at Doccy and Medlo.",
	/** The About page's lead paragraph. */
	bio: `I'm ${GIVEN_NAME} ${FAMILY_NAME}, a founding engineer at Doccy and Medlo. I build Doccy's telehealth platform, Medlo's locum marketplace and Medlo Evidence, end to end and from the first commit. I studied computer science at RMIT University in Melbourne.`,
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
