import Link from "next/link";
import type { Role } from "@/content/experience";
import { roleYears } from "@/lib/role-years";

/**
 * One line per role, after Brian Lovin's work list: the company in ink, the title in grey and the
 * years on the right. The whole row links to the company's site; hover fills the name.
 */
export function ExperienceEntry({ role }: { role: Role }) {
	return (
		<li>
			<Link
				href={role.companyUrl}
				className="group flex min-h-11 items-center gap-3 focus-visible:outline-hidden"
			>
				<span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2">
					<span className="-mx-1 px-1 transition-colors duration-150 ease-out group-hover:bg-ink group-hover:text-paper group-focus-visible:bg-ink group-focus-visible:text-paper motion-reduce:transition-none">
						{role.company}
					</span>
					<span className="text-muted">{role.title}</span>
				</span>
				<span className="shrink-0 text-muted tabular-nums">
					{roleYears(role)}
				</span>
			</Link>
		</li>
	);
}
