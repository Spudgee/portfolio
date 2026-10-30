import { HighlightLink } from "@/components/highlight-link";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";

/** Read once at module load, keeping render pure. Pages prerender, so it rolls over on the next deploy. */
const COPYRIGHT_YEAR = new Date().getFullYear();

/**
 * One ruled line: the social links first in ink, then the theme switch and copyright
 * in grey. It wraps on phones. The header's Contact link jumps here.
 */
export function SiteFooter() {
	return (
		<footer id="contact" className="mt-24 px-2 sm:px-6">
			<div className="flex flex-wrap items-center justify-between gap-x-6 border-t border-ink py-2">
				<ul className="flex gap-5">
					{PERSON.socialLinks.map((link) => (
						<li key={link.href}>
							<HighlightLink href={link.href}>{link.label}</HighlightLink>
						</li>
					))}
				</ul>
				<div className="flex flex-wrap items-center gap-x-5 text-muted">
					<ThemeSwitch />
					<p>
						© {COPYRIGHT_YEAR} {PERSON.name}
					</p>
				</div>
			</div>
		</footer>
	);
}
