"use client";

import { usePathname } from "next/navigation";
import { HighlightLink } from "@/components/highlight-link";
import { PillLink } from "@/components/pill-link";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";
import { NAV_PAGES, PATHS } from "@/content/site";

/**
 * The bar across the top of every page: the name on the left; About and Archive as soft pills on
 * the right, the open page darker, then the theme button. It sticks while the pane scrolls. Two
 * pills fit on any phone, so there is no menu. Reading the route is why this is a client component.
 */
export function SiteNav() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-10 bg-paper">
			<div className="flex h-14 items-center justify-between gap-4 px-4 md:h-16 md:px-8">
				<span className="text-row md:text-lead">
					<HighlightLink href={PATHS.home}>{PERSON.name}</HighlightLink>
				</span>
				<div className="flex items-center gap-4 md:gap-6">
					<nav aria-label="Main">
						<ul className="flex gap-6 md:gap-8 md:text-lead">
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
					<div className="-mr-[13px]">
						<ThemeSwitch />
					</div>
				</div>
			</div>
		</header>
	);
}
