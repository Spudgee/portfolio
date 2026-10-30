import { HighlightLink } from "@/components/highlight-link";
import { PERSON } from "@/content/person";

/** Read once at module load, keeping render pure. Pages prerender, so it rolls over on the next deploy. */
const COPYRIGHT_YEAR = new Date().getFullYear();

/**
 * A full-screen footer in the inverse tone: a caps label row, the social links at statement
 * size, and the name set edge to edge. The header's Contact link jumps here.
 */
export function SiteFooter() {
	return (
		<footer
			id="contact"
			data-tone="inverse"
			className="flex min-h-svh flex-col justify-between gap-16 overflow-hidden bg-paper px-4 pt-3 pb-3 text-ink sm:px-8"
		>
			<div className="flex items-center justify-between gap-4 text-chrome uppercase">
				<p className="text-muted">Contact</p>
				<HighlightLink href="#">Back to top</HighlightLink>
			</div>

			<ul className="grid justify-items-start text-statement">
				{PERSON.socialLinks.map((link) => (
					<li key={link.href}>
						<HighlightLink href={link.href}>{link.label} ↗</HighlightLink>
					</li>
				))}
			</ul>

			<div className="@container grid gap-1">
				<p
					aria-hidden="true"
					className="text-display font-medium whitespace-nowrap"
				>
					{PERSON.name}
				</p>
				<p className="flex justify-between gap-4 text-chrome text-muted uppercase">
					<span>
						© {COPYRIGHT_YEAR} {PERSON.name}
					</span>
					<span>{PERSON.jobTitle}</span>
				</p>
			</div>
		</footer>
	);
}
