import type { Metadata } from "next";
import { type Row, RowList } from "@/components/row-list";
import { EDUCATION } from "@/content/education";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { yearSpan } from "@/lib/year-span";

export const metadata: Metadata = pageMetadata({
	path: PATHS.education,
	title: `Education – ${PERSON.name}`,
	description: `${PERSON.name}'s ${EDUCATION.degree} at ${EDUCATION.institution}, majoring in ${EDUCATION.major}: GPA ${EDUCATION.gpa}, WAM ${EDUCATION.wam}.`,
});

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

/** The degree and the major with grades, in the same rows as Work; the nav pill names the page. */
export default function EducationPage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<h1 className="sr-only">Education</h1>
			<RowList rows={EDUCATION_ROWS} />
		</div>
	);
}
