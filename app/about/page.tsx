import type { Metadata } from "next";
import { InlineLink } from "@/components/inline-link";
import { JsonLd } from "@/components/json-ld";
import { EXPERIENCE } from "@/content/experience";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { aboutGraph } from "@/lib/json-ld";
import { monthLabel } from "@/lib/month-label";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.about,
	title: `About – ${PERSON.name}`,
	description: PERSON.bio,
});

const CURRENT_ROLES = EXPERIENCE.filter((role) => role.end === null);
const PAST_ROLES = EXPERIENCE.filter((role) => role.end !== null);

/** After F451's about page: a lead paragraph, then short ruled columns for now, before, stack and links. */
export default function AboutPage() {
	return (
		<>
			<JsonLd graph={aboutGraph()} />
			<h1 className="max-w-[34em] pt-12 text-lead font-normal text-pretty sm:pt-16">
				{PERSON.bio}
			</h1>

			<dl className="mt-12 grid gap-x-8 gap-y-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
				<div className="grid content-start gap-2 border-t border-ink pt-2">
					<dt className="text-muted">Now</dt>
					{CURRENT_ROLES.map((role) => (
						<dd key={`${role.company}-${role.start}`}>
							{role.title}, {role.company}
						</dd>
					))}
				</div>
				<div className="grid content-start gap-2 border-t border-ink pt-2">
					<dt className="text-muted">Before</dt>
					{PAST_ROLES.map((role) => (
						<dd key={`${role.company}-${role.start}`}>
							{role.title}, {role.company}
							<br />
							<span className="text-muted tabular-nums">
								<time dateTime={role.start}>{monthLabel(role.start)}</time>
								{" – "}
								{role.end === null ? null : (
									<time dateTime={role.end}>{monthLabel(role.end)}</time>
								)}
							</span>
						</dd>
					))}
				</div>
				<div className="grid content-start gap-2 border-t border-ink pt-2">
					<dt className="text-muted">Stack</dt>
					<dd>{PERSON.stack.join(", ")}</dd>
				</div>
				<div className="grid content-start gap-2 border-t border-ink pt-2">
					<dt className="text-muted">Elsewhere</dt>
					{PERSON.socialLinks.map((link) => (
						<dd key={link.href}>
							<InlineLink href={link.href}>{link.label}</InlineLink>
						</dd>
					))}
				</div>
			</dl>
		</>
	);
}
