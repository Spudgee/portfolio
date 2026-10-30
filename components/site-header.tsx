"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { HighlightLink } from "@/components/highlight-link";
import { PERSON } from "@/content/person";
import { NAV_LINKS, PATHS } from "@/content/site";

/**
 * Top bar at the intro's size: the name in ink on the left, the sections in grey on the right, no
 * rule beneath. On phones the sections fold behind a three-line button that opens a full-screen
 * panel downwards, one ruled row per section; the page behind stops scrolling while it is open
 * (globals.css). The page you are on is filled; reading the route and the open state is why this
 * is a client component.
 */
export function SiteHeader() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function handleMenuToggle() {
		setIsMenuOpen((wasOpen) => !wasOpen);
	}

	return (
		<header className="sticky top-0 z-10 bg-paper">
			<div className="flex min-h-14 items-center justify-between gap-4 px-2 text-lead sm:min-h-16 sm:px-6">
				{/* The name links home but never stays filled: it is the site's name, not a tab. */}
				<HighlightLink href={PATHS.home}>{PERSON.name}</HighlightLink>

				<nav aria-label="Primary" className="hidden sm:block">
					<ul className="flex gap-6 text-muted">
						{NAV_LINKS.map((link) => (
							<li key={link.href}>
								<HighlightLink
									href={link.href}
									aria-current={pathname === link.href ? "page" : undefined}
								>
									{link.label}
								</HighlightLink>
							</li>
						))}
					</ul>
				</nav>

				<button
					type="button"
					onClick={handleMenuToggle}
					aria-expanded={isMenuOpen}
					aria-controls="mobile-menu"
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="-mr-2 grid size-11 place-content-center gap-1.5 sm:hidden"
				>
					<span
						className={`block h-px w-5 bg-ink transition-transform duration-200 motion-reduce:transition-none ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}
					/>
					<span
						className={`block h-px w-5 bg-ink transition-opacity duration-200 motion-reduce:transition-none ${isMenuOpen ? "opacity-0" : ""}`}
					/>
					<span
						className={`block h-px w-5 bg-ink transition-transform duration-200 motion-reduce:transition-none ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
					/>
				</button>
			</div>

			{/* Height 0 → full screen below the bar opens it downwards; inert keeps closed links out of tab order. */}
			<nav
				id="mobile-menu"
				aria-label="Primary"
				inert={!isMenuOpen}
				data-open={isMenuOpen || undefined}
				className={`fixed inset-x-0 top-14 overflow-hidden bg-paper transition-[height] duration-300 ease-out motion-reduce:transition-none sm:hidden ${isMenuOpen ? "h-[calc(100dvh-3.5rem)]" : "h-0"}`}
			>
				<ul className="mx-4 divide-y divide-ink border-y border-ink text-lead text-muted">
					{NAV_LINKS.map((link) => (
						<li key={link.href}>
							<HighlightLink
								href={link.href}
								aria-current={pathname === link.href ? "page" : undefined}
								onClick={() => setIsMenuOpen(false)}
								className="w-full py-2"
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
