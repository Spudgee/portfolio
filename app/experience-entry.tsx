import { InlineLink } from "@/components/inline-link";
import type { Role } from "@/content/experience";
import { monthLabel } from "@/lib/month-label";

/** One ruled row: dates, company, title and site across the grid, the summary beneath. */
export function ExperienceEntry({ role }: { role: Role }) {
	return (
		<li className="grid grid-cols-4 gap-x-4 border-t border-ink py-2 sm:grid-cols-12 sm:gap-x-6">
			<p className="col-span-full text-muted tabular-nums sm:col-span-3">
				<time dateTime={role.start}>{monthLabel(role.start)}</time>
				{" – "}
				{role.end === null ? (
					"Present"
				) : (
					<time dateTime={role.end}>{monthLabel(role.end)}</time>
				)}
			</p>
			<h3 className="col-span-full font-medium sm:col-span-3">
				{role.company}
			</h3>
			<p className="col-span-full sm:col-span-3">{role.title}</p>
			<p className="col-span-full sm:col-span-3">
				<InlineLink href={role.companyUrl}>
					{new URL(role.companyUrl).hostname}
				</InlineLink>
			</p>
			<p className="col-span-full mt-1 max-w-prose text-pretty sm:col-span-6 sm:col-start-4">
				{role.summary}
			</p>
		</li>
	);
}
