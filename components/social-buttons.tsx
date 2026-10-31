import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import { PERSON } from "@/content/person";

/**
 * GitHub and LinkedIn as grey icon buttons that turn ink on hover. They live only in the footer, so
 * they sit in one place on every page; the 44px buttons pull right by their inner margin so the
 * last icon lines up with the nav's right edge.
 */
export function SocialButtons() {
	return (
		<div className="-mr-2.5 flex items-center">
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
		</div>
	);
}
