import type { Metadata } from "next";
import { InlineLink } from "@/components/inline-link";
import { JsonLd } from "@/components/json-ld";
import { EDUCATION } from "@/content/education";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { educationGraph } from "@/lib/json-ld";
import { monthLabel } from "@/lib/month-label";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.education,
	title: `Education – ${PERSON.name}`,
	description: `${PERSON.name}'s ${EDUCATION.degree} at ${EDUCATION.institution}, ${EDUCATION.location}: ${EDUCATION.major} major, GPA ${EDUCATION.gpa}, WAM ${EDUCATION.wam}.`,
});

const DETAILS = [
	{
		term: "Institution",
		value: (
			<InlineLink href={EDUCATION.institutionUrl}>
				{EDUCATION.institution}
			</InlineLink>
		),
	},
	{ term: "Degree", value: EDUCATION.degree },
	{ term: "Major", value: EDUCATION.major },
	{
		term: "Dates",
		value: (
			<>
				<time dateTime={EDUCATION.start}>{monthLabel(EDUCATION.start)}</time>
				{" – "}
				<time dateTime={EDUCATION.end}>{monthLabel(EDUCATION.end)}</time>
			</>
		),
	},
	{ term: "GPA", value: EDUCATION.gpa },
	{ term: "WAM", value: EDUCATION.wam },
];

/** Secondary page: the degree, linked from the header and kept off the home page. */
export default function EducationPage() {
	return (
		<>
			<JsonLd graph={educationGraph()} />
			<section
				aria-labelledby="education"
				className="grid grid-cols-4 gap-x-4 pt-16 sm:grid-cols-12 sm:gap-x-6 sm:pt-24"
			>
				<h1 id="education" className="col-span-full font-medium sm:col-span-3">
					Education
				</h1>
				<p className="col-span-full mt-2 max-w-prose text-pretty sm:col-span-9 sm:mt-0 lg:col-span-5">
					{EDUCATION.degree} at {EDUCATION.institution}, {EDUCATION.location},
					majoring in {EDUCATION.major}.
				</p>
			</section>

			<dl className="mt-16 border-b border-ink sm:mt-24">
				{DETAILS.map((detail) => (
					<div
						key={detail.term}
						className="grid grid-cols-4 gap-x-4 border-t border-ink py-2 sm:grid-cols-12 sm:gap-x-6"
					>
						<dt className="col-span-full text-muted sm:col-span-3">
							{detail.term}
						</dt>
						<dd className="col-span-full tabular-nums sm:col-span-9">
							{detail.value}
						</dd>
					</div>
				))}
			</dl>
		</>
	);
}
