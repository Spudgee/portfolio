import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SocialButtons } from "@/components/social-buttons";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { homeGraph } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.home,
	title: `${PERSON.name} – ${PERSON.headline}`,
	description: `${PERSON.name} is a product-focused engineer and a founding engineer at Doccy and Medlo, building telehealth and locum software for patients and clinicians.`,
});

/** Home is only the statement and the GitHub and LinkedIn buttons; Work, Archive and Contact are pages. */
export default function HomePage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<JsonLd graph={homeGraph()} />
			<h1 className="sr-only">
				{PERSON.name}, {PERSON.headline}
			</h1>
			<p className="text-row font-medium text-pretty md:text-lead">
				{PERSON.bio}
			</p>
			<div className="mt-6">
				<SocialButtons />
			</div>
		</div>
	);
}
