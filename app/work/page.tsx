import type { Metadata } from "next";
import { ContentGroup } from "@/components/content-group";
import { type Row, RowList } from "@/components/row-list";
import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { yearSpan } from "@/lib/year-span";

export const metadata: Metadata = pageMetadata({
	path: PATHS.work,
	title: `Work – ${PERSON.name}`,
	description: `${PERSON.name}'s roles at Doccy and Medlo, study at RMIT University and the tools behind them.`,
});

const EXPERIENCE_ROWS: readonly Row[] = EXPERIENCE.map((role) => ({
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
	{
		key: "major",
		primary: "Major",
		secondary: EDUCATION.major,
		aside: `GPA ${EDUCATION.gpa} · WAM ${EDUCATION.wam}`,
	},
];

const STACK_ROWS: readonly Row[] = PERSON.stack.map((group) => ({
	key: group.area,
	primary: group.area,
	secondary: group.tools.join(", "),
}));

/**
 * The career in one place: Experience, then Education and Stack (the background behind it).
 * Every group opens with the same heading over the same rows.
 */
export default function WorkPage() {
	return (
		<div className="mx-auto grid max-w-[40rem] gap-12">
			<h1 className="sr-only">Work</h1>
			<ContentGroup id="experience" label="Experience">
				<RowList rows={EXPERIENCE_ROWS} />
			</ContentGroup>
			<ContentGroup id="education" label="Education">
				<RowList rows={EDUCATION_ROWS} />
			</ContentGroup>
			<ContentGroup id="stack" label="Stack">
				<RowList rows={STACK_ROWS} />
			</ContentGroup>
		</div>
	);
}
