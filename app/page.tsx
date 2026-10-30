import type { Metadata } from "next";
import { ContentGroup } from "@/components/content-group";
import { JsonLd } from "@/components/json-ld";
import { type Row, RowList } from "@/components/row-list";
import { SocialButtons } from "@/components/social-buttons";
import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { homeGraph } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { yearSpan } from "@/lib/year-span";

export const metadata: Metadata = pageMetadata({
	path: PATHS.home,
	title: `${PERSON.name} – ${PERSON.headline}`,
	description: `${PERSON.name} is a product-focused engineer and a founding engineer at Doccy and Medlo, building telehealth and locum software for patients and clinicians.`,
});

const WORK_ROWS: readonly Row[] = EXPERIENCE.map((role) => ({
	key: `${role.company}-${role.start}`,
	primary: role.company,
	secondary: role.title,
	aside: yearSpan(role.start, role.end),
	href: role.companyUrl,
}));

const EDUCATION_ROWS: readonly Row[] = [
	{
		key: "degree",
		primary: EDUCATION.institution,
		secondary: EDUCATION.degree,
		aside: yearSpan(EDUCATION.start, EDUCATION.end),
		href: EDUCATION.institutionUrl,
	},
	{ key: "gpa", primary: "GPA", aside: EDUCATION.gpa },
	{ key: "wam", primary: "WAM", aside: EDUCATION.wam },
];

const STACK_ROWS: readonly Row[] = PERSON.stack.map((group) => ({
	key: group.area,
	primary: group.area,
	secondary: group.tools.join(", "),
}));

/**
 * About: the summary statement, then Work, Education, Stack and Contact as labelled groups of the
 * same rows, all in the centred pane under the name and the About and Archive pills.
 */
export default function HomePage() {
	return (
		<>
			<JsonLd graph={homeGraph()} />
			<h1 className="sr-only">
				{PERSON.name}, {PERSON.headline}
			</h1>

			<p className="text-row font-medium text-pretty md:text-lead">
				{PERSON.bio}
			</p>

			<div className="mt-12 grid gap-10">
				<ContentGroup id="work" label="Work">
					<RowList rows={WORK_ROWS} />
				</ContentGroup>
				<ContentGroup id="education" label="Education">
					<RowList rows={EDUCATION_ROWS} />
				</ContentGroup>
				<ContentGroup id="stack" label="Stack">
					<RowList rows={STACK_ROWS} />
				</ContentGroup>
				<ContentGroup id="contact" label="Contact">
					<SocialButtons hasThemeSwitch={false} />
				</ContentGroup>
			</div>
		</>
	);
}
