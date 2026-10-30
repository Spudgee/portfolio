import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import { ThemeSwitch } from "@/components/theme-switch";
import { PERSON } from "@/content/person";

/**
 * GitHub and LinkedIn as grey icon buttons that turn ink on hover, optionally followed by the theme
 * button. The 44px buttons pull left by their inner margin so the first icon lines up with text.
 */
export function SocialButtons({ hasThemeSwitch }: { hasThemeSwitch: boolean }) {
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
			{hasThemeSwitch && <ThemeSwitch />}
		</div>
	);
}
