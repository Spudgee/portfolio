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
	{ term: "Major", value: EDUCATION.major },
	{ term: "GPA", value: EDUCATION.gpa },
	{ term: "WAM", value: EDUCATION.wam },
];

/** Secondary page: the degree as one lead sentence, then its facts in ruled rows. */
export default function EducationPage() {
	return (
		<>
			<JsonLd graph={educationGraph()} />
			<h1 className="max-w-[28em] pt-12 text-lead font-normal text-balance sm:pt-16">
				{EDUCATION.degree} at {EDUCATION.institution}, {EDUCATION.location},
				majoring in {EDUCATION.major}.
			</h1>

			<dl className="mt-12 border-b border-ink sm:mt-16">
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
