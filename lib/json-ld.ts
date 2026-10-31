import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";
import { PERSON } from "@/content/person";
import { LOCALE, PATHS, SITE_URL, siteUrl } from "@/content/site";

type JsonValue =
	| string
	| number
	| boolean
	| null
	| readonly JsonValue[]
	| { readonly [key: string]: JsonValue };

type JsonLdNode = { readonly [key: string]: JsonValue };

/** One schema.org graph for one page. */
export type JsonLdGraph = {
	readonly "@context": "https://schema.org";
	readonly "@graph": readonly JsonLdNode[];
};

const HOME_URL = siteUrl(PATHS.home);
/** Stable node ids; changing one splits the entity in search engines. */
const WEBSITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#person`;

/** Companies where a role is current, once each. */
function currentEmployers() {
	const employers = new Map<string, JsonLdNode>();
	for (const role of EXPERIENCE) {
		if (role.end === null) {
			employers.set(role.company, {
				"@type": "Organization",
				name: role.company,
				url: role.companyUrl,
			});
		}
	}
	return [...employers.values()];
}

/** The one page's graph: the site, the profile page, and the person with their work, study, skills and profiles. */
export function homeGraph(): JsonLdGraph {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": WEBSITE_ID,
				url: HOME_URL,
				name: PERSON.name,
				inLanguage: LOCALE,
			},
			{
				"@type": "ProfilePage",
				"@id": `${SITE_URL}/#webpage`,
				url: HOME_URL,
				isPartOf: { "@id": WEBSITE_ID },
				mainEntity: { "@id": PERSON_ID },
				inLanguage: LOCALE,
			},
			{
				"@type": "Person",
				"@id": PERSON_ID,
				name: PERSON.name,
				givenName: PERSON.givenName,
				familyName: PERSON.familyName,
				url: HOME_URL,
				description: PERSON.bio,
				jobTitle: PERSON.jobTitle,
				worksFor: currentEmployers(),
				alumniOf: {
					"@type": "CollegeOrUniversity",
					name: EDUCATION.institution,
					url: EDUCATION.institutionUrl,
				},
				knowsAbout: PERSON.stack.flatMap((group) => group.tools),
				sameAs: PERSON.socialLinks.map((link) => link.href),
			},
		],
	};
}

/** JSON for a `<script>` body: every `<` becomes its JSON unicode escape (u003c), so no string can close the element. */
export function toJsonLd(graph: JsonLdGraph) {
	return JSON.stringify(graph).replace(/</g, "\\u003c");
}
