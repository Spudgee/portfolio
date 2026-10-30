"use client";

import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { HighlightLink } from "@/components/highlight-link";
import { PillLink } from "@/components/pill-link";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";
import { NAV_ITEMS, PATHS } from "@/content/site";
import { activeSectionStore } from "@/lib/active-section";

/**
 * The bar across the top of every page: the name on the left. From md up, Home, Work, Archive and
 * Contact sit on the right as soft pills beside the theme button; a section's pill fills while that
 * section is on screen, Archive's while its page is open. On phones two short lines open a
 * full-screen panel downwards with the same items at the name's size, each pill starting where the
 * name starts; at the foot, within thumb reach, a round theme button on the left and a round × on
 * the right. The page behind stops scrolling (globals.css). Reading the route, the section on
 * screen and the open state is why this is a client component.
 */
export function SiteNav() {
	const pathname = usePathname();
	const activeSection = useSyncExternalStore(
		activeSectionStore.subscribe,
		activeSectionStore.readActiveSection,
		activeSectionStore.readServerActiveSection,
	);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	/** A section item fills while its section is on screen; the Archive item while its page is open. */
	function currentState(item: (typeof NAV_ITEMS)[number]) {
		if (item.section === null) {
			return pathname === item.href ? "page" : undefined;
		}
		return pathname === PATHS.home && activeSection === item.section
			? "location"
			: undefined;
	}

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
							{NAV_ITEMS.map((item) => (
								<li key={item.href}>
									<PillLink href={item.href} aria-current={currentState(item)}>
										{item.label}
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
					className={`-mr-3 grid size-11 cursor-pointer place-items-center md:hidden ${isMenuOpen ? "invisible" : ""}`}
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
				className={`absolute inset-x-0 top-full z-20 overflow-hidden bg-paper transition-[height] duration-150 ease-out motion-reduce:transition-none md:hidden ${isMenuOpen ? "h-[calc(100dvh-3.5rem)]" : "h-0"}`}
			>
				<div className="flex h-full flex-col justify-between">
					{/* PillLink pads 12px outwards, so pl-7 starts each pill where the name starts (16px). */}
					<ul className="grid pt-1 pr-4 pl-7 text-lead">
						{NAV_ITEMS.map((item) => (
							<li key={item.href}>
								<PillLink
									href={item.href}
									aria-current={currentState(item)}
									onClick={handleMenuClose}
								>
									{item.label}
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
