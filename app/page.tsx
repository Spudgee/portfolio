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

/** Split home: the statement holds the left half; work and stack run down the right, one line per role. */
export default function HomePage() {
	return (
		<>
			<JsonLd graph={homeGraph()} />
			<div className="grid gap-12 pt-12 sm:pt-16 md:grid-cols-2">
				<h1 className="max-w-[14em] text-lead font-normal text-balance">
					{PERSON.introduction}
				</h1>

				<div className="grid content-start gap-12">
					<section
						id="experience"
						aria-labelledby="experience-heading"
						className="scroll-mt-16"
					>
						<h2 id="experience-heading" className="pb-1 text-muted">
							Work
						</h2>
						<ol>
							{EXPERIENCE.map((role) => (
								<ExperienceEntry
									key={`${role.company}-${role.start}`}
									role={role}
								/>
							))}
						</ol>
					</section>

					<section aria-labelledby="stack-heading">
						<h2 id="stack-heading" className="pb-1 text-muted">
							Stack
						</h2>
						<p>{PERSON.stack.join(", ")}</p>
					</section>
				</div>
			</div>
		</>
	);
}
