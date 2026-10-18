import { HoverUnderlineLink } from "@/components/hover-underline-link";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";

/** The name, linking home, and the education page. Lowercase by CSS; the source keeps proper names. */
export function SiteHeader() {
	return (
		<header className="grid grid-cols-4 gap-x-4 pt-1 lowercase sm:grid-cols-12 sm:gap-x-6 sm:pt-3">
			<div className="col-span-2 sm:col-span-3">
				<HoverUnderlineLink href={PATHS.home}>{PERSON.name}</HoverUnderlineLink>
			</div>
			<nav
				aria-label="Primary"
				className="col-span-2 text-right sm:col-span-9 sm:text-left"
			>
				<HoverUnderlineLink href={PATHS.education}>
					Education
				</HoverUnderlineLink>
			</nav>
		</header>
	);
}
