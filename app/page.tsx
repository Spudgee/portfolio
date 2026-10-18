import type { Metadata } from "next";
import { ExperienceEntry } from "@/app/experience-entry";
import { JsonLd } from "@/components/json-ld";
import { EXPERIENCE } from "@/content/experience";
import { PERSON } from "@/content/person";
import { homeGraph } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: "/",
	title: `${PERSON.name} – ${PERSON.headline}`,
	description: `${PERSON.name} is a founding engineer at Doccy, 24/7 telehealth across Australia, and Medlo, a locum marketplace for doctors, building full-stack software with Next.js, TypeScript and PostgreSQL.`,
});

/** Experience-led home: the name, the founding-engineer line, the roles, the stack. */
export default function HomePage() {
	return (
		<>
			<JsonLd graph={homeGraph()} />
			<section
				aria-labelledby="name"
				className="grid grid-cols-4 gap-x-4 pt-16 sm:grid-cols-12 sm:gap-x-6 sm:pt-24"
			>
				<h1 id="name" className="col-span-full text-display font-medium">
					<span className="block">{PERSON.givenName}</span>{" "}
					<span className="block">{PERSON.familyName}</span>
				</h1>
				<p className="col-span-full mt-8 text-lead sm:col-span-8 sm:col-start-4 sm:mt-12 lg:col-span-6 lg:col-start-4">
					Founding engineer at Doccy and Medlo, building full-stack software for
					Australian healthcare.
				</p>
			</section>

			<section
				aria-labelledby="experience"
				className="mt-24 grid grid-cols-4 gap-x-4 sm:mt-40 sm:grid-cols-12 sm:gap-x-6"
			>
				<h2
					id="experience"
					className="col-span-full text-sm text-muted sm:col-span-3"
				>
					Experience
				</h2>
				<ol className="col-span-full mt-4 flex flex-col gap-y-12 sm:col-span-9 sm:mt-0 lg:col-span-7">
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
				className="mt-24 grid grid-cols-4 gap-x-4 sm:mt-32 sm:grid-cols-12 sm:gap-x-6"
			>
				<h2
					id="stack"
					className="col-span-full text-sm text-muted sm:col-span-3"
				>
					Stack
				</h2>
				<p className="col-span-full mt-4 max-w-prose sm:col-span-9 sm:mt-0">
					{PERSON.stack.join(", ")}
				</p>
			</section>
		</>
	);
}
