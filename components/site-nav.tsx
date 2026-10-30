"use client";

import { useRef, useSyncExternalStore } from "react";
import { HighlightLink } from "@/components/highlight-link";
import { SocialButtons } from "@/components/social-buttons";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";
import { SECTIONS } from "@/content/site";
import { activeSectionStore } from "@/lib/active-section";

/**
 * A bar fixed over the top of every section, at the lead size: the name on the left; on wider
 * screens the four sections in grey on the right, the one on screen filled, then the theme button.
 * On phones, Menu opens a full-screen sidebar that slides in from the right: the name and Close
 * where the bar was, the sections down the left, the icon buttons at the foot. It is a modal
 * <dialog>, so Escape closes it and focus stays inside; the page behind stops scrolling
 * (globals.css). Reading scroll position is why this is a client component.
 */
export function SiteNav() {
	const activeId = useSyncExternalStore(
		activeSectionStore.subscribe,
		activeSectionStore.readActiveSection,
		activeSectionStore.readServerActiveSection,
	);
	const menuRef = useRef<HTMLDialogElement>(null);

	function handleMenuOpen() {
		menuRef.current?.showModal();
	}

	function handleMenuClose() {
		menuRef.current?.close();
	}

	return (
		<header className="fixed inset-x-0 top-0 z-10 bg-paper">
			<div className="flex h-14 items-center justify-between gap-4 px-4 text-lead md:h-16 md:px-8">
				<HighlightLink href="/#work">{PERSON.name}</HighlightLink>

				<div className="hidden items-center gap-6 md:flex">
					<nav aria-label="Sections">
						<ul className="flex gap-6 text-muted">
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
					<div className="-mr-[13px]">
						<ThemeSwitch />
					</div>
				</div>

				<button
					type="button"
					onClick={handleMenuOpen}
					aria-haspopup="dialog"
					aria-controls="mobile-menu"
					className="-mr-3 min-h-11 cursor-pointer px-3 md:hidden"
				>
					Menu
				</button>
			</div>

			<dialog
				ref={menuRef}
				id="mobile-menu"
				aria-label="Sections"
				className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none translate-x-full bg-paper text-ink transition-[translate,display,overlay] transition-discrete duration-300 ease-out backdrop:bg-transparent open:translate-x-0 motion-reduce:transition-none starting:open:translate-x-full md:hidden"
			>
				<div className="flex h-full flex-col px-4">
					<div className="flex h-14 shrink-0 items-center justify-between text-lead">
						<HighlightLink href="/#work" onClick={handleMenuClose}>
							{PERSON.name}
						</HighlightLink>
						<button
							type="button"
							onClick={handleMenuClose}
							className="-mr-3 min-h-11 cursor-pointer px-3"
						>
							Close
						</button>
					</div>
					<nav aria-label="Sections" className="flex-1 pt-10">
						<ul className="grid gap-2 text-lead text-muted">
							{SECTIONS.map((section) => (
								<li key={section.id}>
									<HighlightLink
										href={`/#${section.id}`}
										aria-current={
											activeId === section.id ? "location" : undefined
										}
										onClick={handleMenuClose}
									>
										{section.label}
									</HighlightLink>
								</li>
							))}
						</ul>
					</nav>
					<div className="pb-6">
						<SocialButtons hasThemeSwitch />
					</div>
				</div>
			</dialog>
		</header>
	);
}
