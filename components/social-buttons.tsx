import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import { PERSON } from "@/content/person";

/**
 * GitHub and LinkedIn as grey icon buttons that turn ink on hover. The 44px buttons pull left by
 * their inner margin so the first icon lines up with the text above.
 */
export function SocialButtons() {
	return (
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
		</div>
	);
}
