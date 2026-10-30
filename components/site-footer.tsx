import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";

/**
 * Only buttons: GitHub and LinkedIn as grey icons that turn ink on hover, then the theme button.
 * The header's Contact link jumps here.
 */
export function SiteFooter() {
	return (
		<footer id="contact" className="mt-24 px-2 py-4 sm:px-6">
			{/* The 44px buttons pull left by their inner margin so each icon lines up with the text above. */}
			<div className="-ml-[13px] flex items-center">
				{PERSON.socialLinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						aria-label={link.label}
						title={link.label}
						className="grid size-11 place-items-center text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:text-ink focus-visible:outline-hidden motion-reduce:transition-none"
					>
						<BrandIcon brand={link.brand} />
					</Link>
				))}
				<ThemeSwitch />
			</div>
		</footer>
	);
}
