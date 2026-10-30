"use client";

import { useState, useSyncExternalStore } from "react";
import { HighlightLink } from "@/components/highlight-link";
import { SocialButtons } from "@/components/social-buttons";
import { PERSON } from "@/content/person";
import { SECTIONS } from "@/content/site";
import { activeSectionStore } from "@/lib/active-section";

/**
 * Wider screens get a sidebar that stays put while the sections snap past: the name, the four
 * sections with the one on screen filled, and the icon buttons at its foot. Phones get a sticky bar
 * with the name and a Menu button that opens the sections full screen, one ruled row each; the
 * page behind stops scrolling while it is open (globals.css). Reading scroll position and the open
 * state is why this is a client component.
 */
export function SiteNav() {
	const activeId = useSyncExternalStore(
		activeSectionStore.subscribe,
		activeSectionStore.readActiveSection,
		activeSectionStore.readServerActiveSection,
	);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function handleMenuToggle() {
		setIsMenuOpen((wasOpen) => !wasOpen);
	}

	return (
		<>
			<header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-paper px-4 md:hidden">
				<HighlightLink href="/#work">{PERSON.name}</HighlightLink>
				<button
					type="button"
					onClick={handleMenuToggle}
					aria-expanded={isMenuOpen}
					aria-controls="mobile-menu"
					className="-mr-3 min-h-11 cursor-pointer px-3"
				>
					{isMenuOpen ? "Close" : "Menu"}
				</button>
			</header>

			{/* Height 0 → full screen below the bar opens it downwards; inert keeps closed links out of tab order. */}
			<nav
				id="mobile-menu"
				aria-label="Sections"
				inert={!isMenuOpen}
				data-open={isMenuOpen || undefined}
				className={`fixed inset-x-0 top-14 z-10 overflow-hidden bg-paper transition-[height] duration-300 ease-out motion-reduce:transition-none md:hidden ${isMenuOpen ? "h-[calc(100dvh-3.5rem)]" : "h-0"}`}
			>
				<ul className="mx-4 divide-y divide-ink border-y border-ink text-lead text-muted">
					{SECTIONS.map((section) => (
						<li key={section.id}>
							<HighlightLink
								href={`/#${section.id}`}
								aria-current={activeId === section.id ? "location" : undefined}
								onClick={() => setIsMenuOpen(false)}
								className="w-full py-2"
							>
								{section.label}
							</HighlightLink>
						</li>
					))}
				</ul>
				<div className="mx-4 mt-2">
					<SocialButtons hasThemeSwitch />
				</div>
			</nav>

			<aside className="sticky top-0 hidden h-dvh flex-col justify-between px-8 py-10 md:flex">
				<div className="grid gap-6">
					<HighlightLink href="/#work">{PERSON.name}</HighlightLink>
					<nav aria-label="Sections">
						<ul className="grid text-muted">
							{SECTIONS.map((section) => (
								<li key={section.id}>
									<HighlightLink
										href={`/#${section.id}`}
										aria-current={
											activeId === section.id ? "location" : undefined
										}
									>
										{section.label}
									</HighlightLink>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<SocialButtons hasThemeSwitch />
			</aside>
		</>
	);
}
