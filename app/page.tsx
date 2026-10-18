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

/** Experience-led home: who and what in one sentence, then the roles and the stack. */
export default function HomePage() {
	return (
		<>
			<JsonLd graph={homeGraph()} />
			<h1 className="grid grid-cols-4 gap-x-4 pt-24 font-medium sm:grid-cols-12 sm:gap-x-6 sm:pt-40">
				<span className="col-span-full max-w-prose text-pretty sm:col-span-9 sm:col-start-4 lg:col-span-5 lg:col-start-4">
					{PERSON.name} is a founding engineer at Doccy and Medlo, building
					full-stack software for Australian healthcare.
				</span>
			</h1>

			<section
				aria-labelledby="experience"
				className="mt-16 grid grid-cols-4 gap-x-4 sm:mt-24 sm:grid-cols-12 sm:gap-x-6"
			>
				<h2 id="experience" className="col-span-full text-muted sm:col-span-3">
					Experience
				</h2>
				<ol className="col-span-full mt-2 flex flex-col gap-y-6 sm:col-span-9 sm:mt-0 lg:col-span-6">
					{EXPERIENCE.map((role) => (
						<ExperienceEntry
							key={`${role.company}-${role.start}`}
							role={role}
						/>
					))}
				</ol>
			</section>

			<section
				aria-labelledby="stack"
				className="mt-16 grid grid-cols-4 gap-x-4 sm:mt-24 sm:grid-cols-12 sm:gap-x-6"
			>
				<h2 id="stack" className="col-span-full text-muted sm:col-span-3">
					Stack
				</h2>
				<p className="col-span-full mt-2 max-w-prose sm:col-span-9 sm:mt-0 lg:col-span-6">
					{PERSON.stack.join(", ")}
				</p>
			</section>
		</>
	);
}
