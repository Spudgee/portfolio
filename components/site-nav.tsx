"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { HighlightLink } from "@/components/highlight-link";
import { PillLink } from "@/components/pill-link";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";
import { NAV_PAGES, PATHS } from "@/content/site";

/**
 * The bar across the top of every page: the name on the left. From md up, the pages sit on the
 * right as soft pills (the open one darker) beside the theme button. On phones a two-line button
 * opens a full-screen panel downwards: the pages at the name's size, each pill starting where the
 * name starts and the open page on the darker pill, with the theme button beneath. The page behind
 * stops scrolling (globals.css); the button or a page closes it. Reading the route and
 * the open state is why this is a client component.
 */
export function SiteNav() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function handleMenuToggle() {
		setIsMenuOpen((wasOpen) => !wasOpen);
	}

	function handleMenuClose() {
		setIsMenuOpen(false);
	}

	return (
		<header className="sticky top-0 z-20 bg-paper">
			<div className="relative z-20 flex h-14 items-center justify-between gap-4 bg-paper px-4 md:h-16 md:px-8">
				<span className="text-lead">
					<HighlightLink href={PATHS.home} onClick={handleMenuClose}>
						{PERSON.name}
					</HighlightLink>
				</span>

				<div className="hidden items-center gap-6 md:flex">
					<nav aria-label="Main">
						<ul className="flex gap-8 text-lead">
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

				{/* Two short lines that cross into an × while the list is open. */}
				<button
					type="button"
					onClick={handleMenuToggle}
					aria-expanded={isMenuOpen}
					aria-controls="mobile-menu"
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="-mr-3 grid size-11 cursor-pointer place-items-center md:hidden"
				>
					<span className="relative block h-3 w-[18px]">
						<span
							className={`absolute inset-x-0 h-[1.5px] rounded-full bg-ink transition-[top,rotate] duration-150 ease-out motion-reduce:transition-none ${isMenuOpen ? "top-[5.25px] rotate-45" : "top-0.5"}`}
						/>
						<span
							className={`absolute inset-x-0 h-[1.5px] rounded-full bg-ink transition-[top,rotate] duration-150 ease-out motion-reduce:transition-none ${isMenuOpen ? "top-[5.25px] -rotate-45" : "top-[8.5px]"}`}
						/>
					</span>
				</button>
			</div>

			{/* Height 0 → the rest of the screen opens it downwards in solid paper; inert keeps closed links out of tab order. */}
			<nav
				id="mobile-menu"
				aria-label="Main"
				inert={!isMenuOpen}
				data-open={isMenuOpen || undefined}
				className={`absolute inset-x-0 top-full z-20 overflow-hidden bg-paper transition-[height] duration-150 ease-out motion-reduce:transition-none md:hidden ${isMenuOpen ? "h-[calc(100dvh-3.5rem)]" : "h-0"}`}
			>
				<div>
					{/* PillLink pads 12px outwards, so pl-7 starts each pill where the name starts (16px). */}
					<ul className="grid pt-1 pr-4 pl-7 text-lead">
						{NAV_PAGES.map((page) => (
							<li key={page.path}>
								<PillLink
									href={page.path}
									aria-current={pathname === page.path ? "page" : undefined}
									onClick={handleMenuClose}
								>
									{page.label}
								</PillLink>
							</li>
						))}
					</ul>
					<div className="px-4 pt-2 pb-5">
						<div className="-ml-[13px]">
							<ThemeSwitch />
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
