"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { HighlightLink } from "@/components/highlight-link";
import { PERSON } from "@/content/person";
import { NAV_LINKS, PATHS } from "@/content/site";

/**
 * Top bar: the name on the left and the sections on the right, a hairline beneath. On phones the
 * sections fold behind a three-line button and open downwards as full-width rows, pushing the page
 * down rather than covering it, so it is a disclosure, not a dialog: the button or a link closes it. The page you are on is filled; reading the route and the open
 * state is why this is a client component.
 */
export function SiteHeader() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function handleMenuToggle() {
		setIsMenuOpen((wasOpen) => !wasOpen);
	}

	return (
		<header className="sticky top-0 z-10 border-b border-ink bg-paper">
			<div className="flex min-h-12 items-center justify-between gap-4 px-2 sm:px-6">
				<HighlightLink
					href={PATHS.home}
					look="bare"
					aria-current={pathname === PATHS.home ? "page" : undefined}
				>
					{PERSON.name}
				</HighlightLink>

				<nav aria-label="Primary" className="hidden sm:block">
					<ul className="flex gap-7">
						{NAV_LINKS.map((link) => (
							<li key={link.href}>
								<HighlightLink
									href={link.href}
									look="bare"
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

			{/* Rows 0fr → 1fr animates the height without measuring it; inert keeps closed links out of tab order. */}
			<nav
				id="mobile-menu"
				aria-label="Primary"
				inert={!isMenuOpen}
				className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none sm:hidden ${isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
			>
				<ul className="overflow-hidden">
					{NAV_LINKS.map((link) => (
						<li key={link.href} className="border-t border-ink">
							<HighlightLink
								href={link.href}
								look="row"
								aria-current={pathname === link.href ? "page" : undefined}
								onClick={() => setIsMenuOpen(false)}
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
