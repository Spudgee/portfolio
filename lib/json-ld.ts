import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";
import { PERSON } from "@/content/person";
import { SITE_URL, siteUrl } from "@/content/site";

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

const HOME_URL = siteUrl("/");
/** Stable node ids; changing one splits the entity in search engines. */
const WEBSITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#person`;
const LANGUAGE = "en-AU";

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

/** Home graph: the site, the profile page, and the person it is about. */
export function homeGraph(): JsonLdGraph {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": WEBSITE_ID,
				url: HOME_URL,
				name: PERSON.name,
				inLanguage: LANGUAGE,
			},
			{
				"@type": "ProfilePage",
				"@id": `${SITE_URL}/#webpage`,
				url: HOME_URL,
				isPartOf: { "@id": WEBSITE_ID },
				mainEntity: { "@id": PERSON_ID },
				inLanguage: LANGUAGE,
			},
			{
				"@type": "Person",
				"@id": PERSON_ID,
				name: PERSON.name,
				givenName: PERSON.givenName,
				familyName: PERSON.familyName,
				url: HOME_URL,
				jobTitle: PERSON.jobTitle,
				worksFor: currentEmployers(),
				knowsAbout: PERSON.stack,
				sameAs: PERSON.socialLinks.map((link) => link.href),
			},
		],
	};
}

/** Education graph: the page, and the university the person studied at. */
export function educationGraph(): JsonLdGraph {
	const url = siteUrl("/education");
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${url}#webpage`,
				url,
				isPartOf: { "@id": WEBSITE_ID },
				about: { "@id": PERSON_ID },
				inLanguage: LANGUAGE,
			},
			{
				"@type": "Person",
				"@id": PERSON_ID,
				name: PERSON.name,
				alumniOf: {
					"@type": "CollegeOrUniversity",
					name: EDUCATION.institution,
					url: EDUCATION.institutionUrl,
				},
			},
		],
	};
}

/** JSON for a `<script>` body: `<` becomes `<`, so no string can close the element. */
export function toJsonLd(graph: JsonLdGraph) {
	return JSON.stringify(graph).replace(/</g, "\\u003c");
}
