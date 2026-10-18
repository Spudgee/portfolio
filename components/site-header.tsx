import { HoverUnderlineLink } from "@/components/hover-underline-link";
import { PERSON } from "@/content/person";

/** The name, linking home, and the education page. Lowercase by CSS; the source keeps proper names. */
export function SiteHeader() {
	return (
		<header className="grid grid-cols-4 gap-x-4 pt-2 text-sm lowercase sm:grid-cols-12 sm:gap-x-6 sm:pt-4">
			<div className="col-span-2 sm:col-span-3">
				<HoverUnderlineLink href="/">{PERSON.name}</HoverUnderlineLink>
			</div>
			<nav
				aria-label="Primary"
				className="col-span-2 text-right sm:col-span-9 sm:text-left"
			>
				<HoverUnderlineLink href="/education">Education</HoverUnderlineLink>
			</nav>
		</header>
	);
}
