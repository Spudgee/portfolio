import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { type Row, RowList } from "@/components/row-list";
import { SectionPager } from "@/components/section-pager";
import { SnapSection } from "@/components/snap-section";
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
	description: `${PERSON.name} is a founding engineer at Doccy and Medlo, building the future of telehealth from the first commit: 24/7 consults, certificates and prescriptions at Doccy, and locum shifts at Medlo, in Next.js, TypeScript and PostgreSQL.`,
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
 * The whole site on one page: four screens that snap vertically, each opened the same way (heading,
 * lead line) and listed with the same rows. The sidebar and the phone menu jump between them, and
 * a wheel step pages one screen.
 */
export default function HomePage() {
	return (
		<>
			<JsonLd graph={homeGraph()} />
			<h1 className="sr-only">
				{PERSON.name}, {PERSON.headline}
			</h1>

			<SectionPager>
				<SnapSection id="work" heading="Work" lead={PERSON.introduction}>
					<RowList rows={WORK_ROWS} />
				</SnapSection>

				<SnapSection
					id="education"
					heading="Education"
					lead={`${EDUCATION.degree} at ${EDUCATION.institution}, ${EDUCATION.location}, majoring in ${EDUCATION.major}.`}
				>
					<RowList rows={EDUCATION_ROWS} />
				</SnapSection>

				<SnapSection id="about" heading="About" lead={PERSON.bio}>
					<RowList rows={STACK_ROWS} />
				</SnapSection>

				<SnapSection
					id="contact"
					heading="Contact"
					lead="Find me on GitHub and LinkedIn."
				>
					<SocialButtons hasThemeSwitch={false} />
				</SnapSection>
			</SectionPager>
		</>
	);
}
