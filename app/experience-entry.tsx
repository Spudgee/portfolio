import { InlineLink } from "@/components/inline-link";
import type { Role } from "@/content/experience";
import { monthLabel } from "@/lib/month-label";

/** One role: company, title and dates, what the work is, and the company's site. */
export function ExperienceEntry({ role }: { role: Role }) {
	return (
		<li className="grid sm:grid-cols-[1fr_auto] sm:gap-x-6">
			<h3 className="font-medium sm:col-start-1 sm:row-start-1">
				{role.company}
			</h3>
			<p className="text-muted sm:col-span-2">{role.title}</p>
			<p className="text-muted tabular-nums sm:col-start-2 sm:row-start-1 sm:text-right">
				<time dateTime={role.start}>{monthLabel(role.start)}</time>
				{" – "}
				{role.end === null ? (
					"Present"
				) : (
					<time dateTime={role.end}>{monthLabel(role.end)}</time>
				)}
			</p>
			<p className="mt-2 max-w-prose text-pretty sm:col-span-2">
				{role.summary}
			</p>
			{role.companyUrl === null ? null : (
				<p className="sm:col-span-2">
					<InlineLink href={role.companyUrl}>
						{new URL(role.companyUrl).hostname}
					</InlineLink>
				</p>
			)}
		</li>
	);
}
