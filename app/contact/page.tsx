import type { Metadata } from "next";
import { type Row, RowList } from "@/components/row-list";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.contact,
	title: `Contact – ${PERSON.name}`,
	description: `Where to find ${PERSON.name}: ${PERSON.socialLinks.map((link) => link.label).join(" and ")}.`,
});

/** The handle is the last part of the profile URL: "Spudgee", "cooper-agustin". */
const CONTACT_ROWS: readonly Row[] = PERSON.socialLinks.map((link) => ({
	key: link.href,
	primary: link.label,
	secondary: new URL(link.href).pathname.split("/").filter(Boolean).at(-1),
	href: link.href,
}));

/** Where to reach Cooper, in the same rows as Work; the nav pill names the page. */
export default function ContactPage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<h1 className="sr-only">Contact</h1>
			<RowList rows={CONTACT_ROWS} />
		</div>
	);
}
