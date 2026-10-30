"use client";

import { usePathname } from "next/navigation";
import { HighlightLink } from "@/components/highlight-link";
import { PillLink } from "@/components/pill-link";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";
import { NAV_PAGES, PATHS } from "@/content/site";

/**
 * The top of the centred pane, the same on every page: the name with the theme button at the
 * column's right edge, then About and Archive as soft pills, the open page darker. Two pills fit on
 * any phone, so there is no menu. Reading the route is why this is a client component.
 */
export function SiteNav() {
	const pathname = usePathname();

	return (
		<header className="grid gap-4">
			<div className="flex items-center justify-between gap-4 text-row">
				<HighlightLink href={PATHS.home}>{PERSON.name}</HighlightLink>
				<div className="-mr-[13px]">
					<ThemeSwitch />
				</div>
			</div>
			<nav aria-label="Main">
				<ul className="flex gap-8">
					{NAV_PAGES.map((page) => (
						<li key={page.path}>
							<PillLink
								href={page.path}
								aria-current={pathname === page.path ? "page" : undefined}
							>
								{page.label}
							</PillLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
