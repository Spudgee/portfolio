"use client";

import { usePathname } from "next/navigation";
import { HoverUnderlineLink } from "@/components/hover-underline-link";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";

/**
 * The name, linking home, and the education page. The page you are on is ink and the
 * other is muted; reading the route is why this is a client component.
 * Lowercase by CSS; the source keeps proper names.
 */
export function SiteHeader() {
	const pathname = usePathname();

	return (
		<header className="grid grid-cols-4 gap-x-4 pt-1 text-muted lowercase sm:grid-cols-12 sm:gap-x-6 sm:pt-3">
			<div className="col-span-2 sm:col-span-3">
				<HoverUnderlineLink
					href={PATHS.home}
					aria-current={pathname === PATHS.home ? "page" : undefined}
				>
					{PERSON.name}
				</HoverUnderlineLink>
			</div>
			<nav
				aria-label="Primary"
				className="col-span-2 text-right sm:col-span-9 sm:text-left"
			>
				<HoverUnderlineLink
					href={PATHS.education}
					aria-current={pathname === PATHS.education ? "page" : undefined}
				>
					Education
				</HoverUnderlineLink>
			</nav>
		</header>
	);
}
