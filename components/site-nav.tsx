"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { HighlightLink } from "@/components/highlight-link";
import { PillLink } from "@/components/pill-link";
import { SocialButtons } from "@/components/social-buttons";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";
import { NAV_PAGES, PATHS } from "@/content/site";

/**
 * A bar fixed over the top of every page: the name on the left; on wider screens About and Archive
 * on the right as soft pills (the open page darker), then the theme button. On phones, Menu opens a
 * full-screen sidebar that slides in from the right: the name and Close where the bar was, the two
 * pages down the left, the icon buttons at the foot. It is a modal <dialog>, so Escape closes it
 * and focus stays inside; the page behind stops scrolling (globals.css). Reading the route is why
 * this is a client component.
 */
export function SiteNav() {
	const pathname = usePathname();
	const menuRef = useRef<HTMLDialogElement>(null);

	function handleMenuOpen() {
		menuRef.current?.showModal();
	}

	function handleMenuClose() {
		menuRef.current?.close();
	}

	return (
		<header className="fixed inset-x-0 top-0 z-10 bg-paper">
			<div className="flex h-14 items-center justify-between gap-4 px-4 text-row md:h-16 md:px-8 md:text-lead">
				<HighlightLink href={PATHS.home}>{PERSON.name}</HighlightLink>

				<div className="hidden items-center gap-6 md:flex">
					<nav aria-label="Main">
						<ul className="flex gap-8">
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
				aria-label="Main"
				className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none translate-x-full bg-paper text-ink transition-[translate,display,overlay] transition-discrete duration-300 ease-out backdrop:bg-transparent open:translate-x-0 motion-reduce:transition-none starting:open:translate-x-full md:hidden"
			>
				<div className="flex h-full flex-col px-4">
					<div className="flex h-14 shrink-0 items-center justify-between text-row">
						<HighlightLink href={PATHS.home} onClick={handleMenuClose}>
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
					<nav aria-label="Main" className="flex-1 pt-10">
						<ul className="grid gap-2 text-lead">
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
					</nav>
					<div className="pb-6">
						<SocialButtons hasThemeSwitch />
					</div>
				</div>
			</dialog>
		</header>
	);
}
