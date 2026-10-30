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
	/** The home page's H1: name, role and both companies in one answer-first sentence. */
	introduction: `${GIVEN_NAME} ${FAMILY_NAME} is a founding engineer at Doccy and Medlo, building the future of telehealth from the first commit.`,
	/** The About page's lead paragraph. */
	bio: `I'm ${GIVEN_NAME} ${FAMILY_NAME}, a founding engineer at Doccy and Medlo. I build Doccy's telehealth platform, Medlo's locum marketplace and Medlo Evidence, end to end and from the first commit. I studied computer science at RMIT University in Melbourne.`,
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
