import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { homeGraph } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.home,
	title: `${PERSON.name} – ${PERSON.headline}`,
	description: `${PERSON.name} is a product-focused engineer and a founding engineer at Doccy and Medlo, building telehealth and locum software for patients and clinicians.`,
});

/** Home is only the statement; Work, Archive and Contact are pages, and the footer carries GitHub and LinkedIn. */
export default function HomePage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<JsonLd graph={homeGraph()} />
			<h1 className="sr-only">
				{PERSON.name}, {PERSON.headline}
			</h1>
			<div className="grid gap-4 text-row font-medium md:text-lead">
				{PERSON.statement.map((paragraph) => (
					<p key={paragraph} className="text-pretty">
						{paragraph}
					</p>
				))}
			</div>
		</div>
	);
}
