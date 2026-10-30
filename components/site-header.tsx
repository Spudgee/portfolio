"use client";

import { usePathname } from "next/navigation";
import { HighlightLink } from "@/components/highlight-link";
import { PERSON } from "@/content/person";
import { NAV_LINKS, PATHS } from "@/content/site";

/**
 * Sidebar header: on wide screens a fixed column down the left edge, each link a full-width
 * row that fills with ink on hover; on phones the same rows sit above the page.
 * The layout pads the page by the column's width (`lg:pl-60`). The page you are on is filled;
 * reading the route is why this is a client component.
 */
export function SiteHeader() {
	const pathname = usePathname();

	return (
		<header
			className="flex flex-col justify-between gap-8 border-b border-ink bg-paper py-2 lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:w-60 lg:border-r lg:border-b-0 lg:px-2"
		>
			<nav aria-label="Primary">
				<ul className="grid">
					<li>
						<HighlightLink
							href={PATHS.home}
							look="row"
							aria-current={pathname === PATHS.home ? "page" : undefined}
						>
							{PERSON.name}
						</HighlightLink>
					</li>
					{NAV_LINKS.map((link) => (
						<li key={link.href}>
							<HighlightLink
								href={link.href}
								look="row"
								aria-current={pathname === link.href ? "page" : undefined}
							>
								{link.label}
							</HighlightLink>
						</li>
					))}
				</ul>
			</nav>
			<ul className="hidden text-muted lg:grid">
				{PERSON.socialLinks.map((link) => (
					<li key={link.href}>
						<HighlightLink href={link.href} look="row">
							{link.label} ↗
						</HighlightLink>
					</li>
				))}
			</ul>
		</header>
	);
}
