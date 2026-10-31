import { SocialButtons } from "@/components/social-buttons";
import { PERSON } from "@/content/person";

/** Read once at module load, keeping render pure. Pages prerender, so it rolls over on the next deploy. */
const COPYRIGHT_YEAR = new Date().getFullYear();

/**
 * One quiet strip at the foot of every page, in the content column: a hairline, then the copyright
 * in grey on the left and the GitHub and LinkedIn buttons on the right.
 */
export function SiteFooter() {
	return (
		<footer className="mx-auto w-full max-w-[40rem] px-4 pb-6 md:px-0">
			<div className="flex items-center justify-between gap-4 border-t border-pill pt-2">
				<p className="text-muted">
					© {COPYRIGHT_YEAR} {PERSON.name}
				</p>
				<SocialButtons isAtEnd />
			</div>
		</footer>
	);
}
