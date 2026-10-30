import { HighlightLink } from "@/components/highlight-link";
import { PERSON } from "@/content/person";

/** Read once at module load, keeping render pure. Pages prerender, so it rolls over on the next deploy. */
const COPYRIGHT_YEAR = new Date().getFullYear();

/** Copyright and the social links under a rule. All caps by CSS; the source keeps proper names. */
export function SiteFooter() {
	return (
		<footer className="mt-24 grid grid-cols-4 gap-x-4 border-t border-ink pb-1 tracking-wider uppercase sm:mt-40 sm:grid-cols-12 sm:gap-x-6 sm:pb-3">
			<p className="col-span-full pt-3 whitespace-nowrap text-muted sm:col-span-3 sm:flex sm:min-h-11 sm:items-center sm:pt-0">
				© {COPYRIGHT_YEAR} {PERSON.name}
			</p>
			<ul className="col-span-full flex gap-x-5 sm:col-span-9">
				{PERSON.socialLinks.map((link) => (
					<li key={link.href}>
						<HighlightLink href={link.href} look="bare">
							{link.label}
						</HighlightLink>
					</li>
				))}
			</ul>
		</footer>
	);
}
