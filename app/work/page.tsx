import type { Metadata } from "next";
import { type Row, RowList } from "@/components/row-list";
import { EXPERIENCE } from "@/content/experience";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { yearSpan } from "@/lib/year-span";

export const metadata: Metadata = pageMetadata({
	path: PATHS.work,
	title: `Work – ${PERSON.name}`,
	description: `${PERSON.name}'s roles: ${EXPERIENCE.map((role) => `${role.title} at ${role.company}`).join(", ")}.`,
});

const WORK_ROWS: readonly Row[] = EXPERIENCE.map((role) => ({
	key: `${role.company}-${role.start}`,
	primary: role.company,
	secondary: role.title,
	aside: yearSpan(role.start, role.end),
	href: role.companyUrl,
}));

/** Every role, one row each, linking to the company; the nav pill names the page. */
export default function WorkPage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<h1 className="sr-only">Work</h1>
			<RowList rows={WORK_ROWS} />
		</div>
	);
}
