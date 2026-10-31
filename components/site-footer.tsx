import { SocialButtons } from "@/components/social-buttons";
import { PERSON } from "@/content/person";

/** Read once at module load, keeping render pure. Pages prerender, so it rolls over on the next deploy. */
const COPYRIGHT_YEAR = new Date().getFullYear();

/**
 * One quiet cluster in the bottom-right corner of every page, on the nav's side padding: the
 * copyright in grey, then the GitHub and LinkedIn buttons.
 */
export function SiteFooter() {
	return (
		<footer className="px-4 pb-6 md:px-8">
			<div className="flex items-center justify-end gap-2">
				<p className="text-muted">
					© {COPYRIGHT_YEAR} {PERSON.name}
				</p>
				<SocialButtons isAtEnd />
			</div>
		</footer>
	);
}
