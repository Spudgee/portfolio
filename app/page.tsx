import type { Metadata } from "next";
import { ExperienceEntry } from "@/app/experience-entry";
import { JsonLd } from "@/components/json-ld";
import { EXPERIENCE } from "@/content/experience";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { homeGraph } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.home,
	title: `${PERSON.name} – ${PERSON.headline}`,
	description: `${PERSON.name} is a founding engineer at Doccy and Medlo, building the future of telehealth from the first commit: 24/7 consults, certificates and prescriptions at Doccy, and locum shifts at Medlo, in Next.js, TypeScript and PostgreSQL.`,
});

/** Experience-led home: who and what in one lead sentence, then ruled rows of roles and the stack. */
export default function HomePage() {
	return (
		<>
			<JsonLd graph={homeGraph()} />
			<h1 className="max-w-[30em] pt-12 text-lead font-normal text-balance sm:pt-16">
				{PERSON.introduction}
			</h1>

			<section
				id="experience"
				aria-labelledby="experience-heading"
				className="mt-12 scroll-mt-16 sm:mt-16"
			>
				<h2 id="experience-heading" className="pb-2 font-medium">
					Experience
				</h2>
				<ol className="border-b border-ink">
					{EXPERIENCE.map((role) => (
						<ExperienceEntry
							key={`${role.company}-${role.start}`}
							role={role}
						/>
					))}
				</ol>
			</section>

			<section aria-labelledby="stack" className="mt-12 sm:mt-16">
				<h2 id="stack" className="pb-2 font-medium">
					Stack
				</h2>
				<p className="grid grid-cols-4 gap-x-4 border-y border-ink py-2 sm:grid-cols-12 sm:gap-x-6">
					<span className="col-span-full sm:col-span-9 sm:col-start-4">
						{PERSON.stack.join(", ")}
					</span>
				</p>
			</section>
		</>
	);
}
