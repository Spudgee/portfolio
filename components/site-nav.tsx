"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { HighlightLink } from "@/components/highlight-link";
import { PillLink } from "@/components/pill-link";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";
import { NAV_PAGES, PATHS } from "@/content/site";

/**
 * The bar across the top of every page: the name on the left. From lg up, the pages sit on the
 * right as soft pills (the open one darker) beside the theme button. On phones two short lines open
 * a full-screen panel downwards: the pages at the name's size, each pill starting where the name
 * starts and the open page on the darker pill; at the foot, within thumb reach, a round theme
 * button on the left and a round × on the right. The page behind stops scrolling (globals.css).
 * Reading the route and the open state is why this is a client component.
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
			<div className="relative z-20 flex h-14 items-center justify-between gap-4 bg-paper px-4 lg:h-16 lg:px-8">
				<span className="text-lead">
					<HighlightLink href={PATHS.home} onClick={handleMenuClose}>
						{PERSON.name}
					</HighlightLink>
				</span>

				<div className="hidden items-center gap-6 lg:flex">
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

				{/* Two short lines open the menu; while it is open they step aside for the × at the bottom. */}
				<button
					type="button"
					onClick={handleMenuToggle}
					aria-expanded={isMenuOpen}
					aria-controls="mobile-menu"
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className={`-mr-3 grid size-11 cursor-pointer place-items-center lg:hidden ${isMenuOpen ? "invisible" : ""}`}
				>
					<span className="relative block h-3 w-[18px]">
						<span className="absolute inset-x-0 top-0.5 h-[1.5px] rounded-full bg-ink" />
						<span className="absolute inset-x-0 top-[8.5px] h-[1.5px] rounded-full bg-ink" />
					</span>
				</button>
			</div>

			{/* Height 0 → the rest of the screen opens it downwards in solid paper; inert keeps closed links out of tab order. */}
			<nav
				id="mobile-menu"
				aria-label="Main"
				inert={!isMenuOpen}
				data-open={isMenuOpen || undefined}
				className={`absolute inset-x-0 top-full z-20 overflow-hidden bg-paper transition-[height] duration-150 ease-out motion-reduce:transition-none lg:hidden ${isMenuOpen ? "h-[calc(100dvh-3.5rem)]" : "h-0"}`}
			>
				<div className="flex h-full flex-col justify-between">
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
					{/* Both controls sit in the thumb's reach: theme bottom left, close bottom right. */}
					<div className="flex items-center justify-between px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
						<ThemeSwitch isRound />
						<button
							type="button"
							onClick={handleMenuClose}
							aria-label="Close menu"
							className="grid size-14 cursor-pointer place-items-center rounded-full bg-pill text-ink"
						>
							<span className="relative block h-3 w-[18px]">
								<span className="absolute inset-x-0 top-[5.25px] h-[1.5px] rotate-45 rounded-full bg-current" />
								<span className="absolute inset-x-0 top-[5.25px] h-[1.5px] -rotate-45 rounded-full bg-current" />
							</span>
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
}
