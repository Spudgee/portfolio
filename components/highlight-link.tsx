import Link from "next/link";

/**
 * Navigation link that turns into a solid ink block on hover, keyboard focus and the current page
 * or section,
 * as on F451. The hit area stays at least 44px tall while the block hugs the text; `className`
 * only widens or pads the hit area, as for the phone menu's full-width rows.
 * @see components/inline-link.tsx for links inside running text
 */
export function HighlightLink({
	href,
	children,
	"aria-current": ariaCurrent,
	onClick,
	className = "",
}: {
	href: string;
	children: React.ReactNode;
	"aria-current"?: "page" | "location";
	onClick?: () => void;
	className?: string;
}) {
	return (
		<Link
			href={href}
			aria-current={ariaCurrent}
			onClick={onClick}
			className={`group inline-flex min-h-11 items-center focus-visible:outline-hidden ${className}`}
		>
			<span className="-mx-1 px-1 transition-colors duration-150 ease-out group-hover:bg-ink group-hover:text-paper group-focus-visible:bg-ink group-focus-visible:text-paper motion-reduce:transition-none group-aria-[current=page]:bg-ink group-aria-[current=page]:text-paper group-aria-[current=location]:bg-ink group-aria-[current=location]:text-paper">
				{children}
			</span>
		</Link>
	);
}
