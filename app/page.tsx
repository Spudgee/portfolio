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
	description: `${PERSON.name} is a founding engineer at Doccy, 24/7 telehealth across Australia, and Medlo, a locum marketplace for doctors, building full-stack software with Next.js, TypeScript and PostgreSQL.`,
});

/** Experience-led home: who and what in one sentence, then ruled rows of roles and the stack. */
export default function HomePage() {
	return (
		<>
			<JsonLd graph={homeGraph()} />
			<h1 className="grid grid-cols-4 gap-x-4 pt-12 font-medium sm:grid-cols-12 sm:gap-x-6 sm:pt-16">
				<span className="col-span-full max-w-prose text-pretty sm:col-span-9 sm:col-start-4 lg:col-span-5 lg:col-start-4">
					{PERSON.introduction}
				</span>
			</h1>

			<section aria-labelledby="experience" className="mt-12 sm:mt-16">
				<h2 id="experience" className="pb-2 font-medium">
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
