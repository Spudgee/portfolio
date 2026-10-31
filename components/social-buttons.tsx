import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import { PERSON } from "@/content/person";

/**
 * GitHub and LinkedIn as icon buttons. In the footer they are grey icons that turn ink on hover,
 * pulled right by their inner margin so the last icon lines up with the nav's right edge. With
 * `isRound` they are the phone menu's round grey buttons, matching the theme switch and close.
 */
export function SocialButtons({ isRound = false }: { isRound?: boolean }) {
	return (
		<div className={`flex items-center ${isRound ? "gap-3" : "-mr-2.5"}`}>
			{PERSON.socialLinks.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					aria-label={link.label}
					title={link.label}
					className={`grid place-items-center transition-colors duration-150 ease-out focus-visible:outline-hidden motion-reduce:transition-none ${isRound ? "size-14 rounded-full bg-pill-soft text-ink hover:bg-pill focus-visible:bg-pill" : "size-11 text-muted hover:text-ink focus-visible:text-ink"}`}
				>
					<BrandIcon
						brand={link.brand}
						className={isRound ? "size-5" : undefined}
					/>
				</Link>
			))}
		</div>
	);
}
