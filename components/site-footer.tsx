import { HoverUnderlineLink } from "@/components/hover-underline-link";
import { PERSON } from "@/content/person";

/** Read once at module load, keeping render pure. Pages prerender, so it rolls over on the next deploy. */
const COPYRIGHT_YEAR = new Date().getFullYear();

/** Copyright and the social links, on one line. Lowercase by CSS; the source keeps proper names. */
export function SiteFooter() {
	return (
		<footer className="mt-24 grid grid-cols-4 gap-x-4 pb-2 text-sm lowercase sm:mt-40 sm:grid-cols-12 sm:gap-x-6 sm:pb-4">
			<p className="col-span-2 py-2 text-muted sm:col-span-3">
				© {COPYRIGHT_YEAR} {PERSON.name}
			</p>
			<ul className="col-span-2 flex justify-end gap-x-5 sm:col-span-9 sm:justify-start">
				{PERSON.socialLinks.map((link) => (
					<li key={link.href}>
						<HoverUnderlineLink href={link.href}>
							{link.label}
						</HoverUnderlineLink>
					</li>
				))}
			</ul>
		</footer>
	);
}
