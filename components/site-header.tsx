"use client";

import { usePathname } from "next/navigation";
import { HighlightLink } from "@/components/highlight-link";
import { PERSON } from "@/content/person";
import { NAV_LINKS, PATHS } from "@/content/site";

/**
 * Base-style header: the name boxed on the left, the sections boxed on the right in caps,
 * a rule beneath. The page you are on is filled; reading the route is why this is a client component.
 */
export function SiteHeader() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-ink bg-paper py-2 text-chrome">
			<HighlightLink
				href={PATHS.home}
				look="box"
				aria-current={pathname === PATHS.home ? "page" : undefined}
			>
				{PERSON.name}
			</HighlightLink>
			<nav aria-label="Primary">
				<ul className="flex gap-1 uppercase">
					{NAV_LINKS.map((link) => (
						<li key={link.href}>
							<HighlightLink
								href={link.href}
								look="box"
								aria-current={pathname === link.href ? "page" : undefined}
							>
								{link.label}
							</HighlightLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
