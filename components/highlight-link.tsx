import Link from "next/link";

/**
 * Navigation link that turns into a solid ink block on hover or focus, as on F451.
 * `bare` is text alone until hovered; `row` spans its container, so a whole sidebar row fills.
 * The current page stays filled.
 * @see components/inline-link.tsx for links inside running text
 */
export function HighlightLink({
	href,
	look,
	children,
	"aria-current": ariaCurrent,
}: {
	href: string;
	look: "bare" | "row";
	children: React.ReactNode;
	"aria-current"?: "page";
}) {
	return (
		<Link
			href={href}
			aria-current={ariaCurrent}
			className={`inline-flex items-center transition-colors duration-150 ease-out hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper focus-visible:outline-hidden motion-reduce:transition-none aria-[current=page]:bg-ink aria-[current=page]:text-paper ${look === "row" ? "flex min-h-9 w-full px-2" : "-mx-1 min-h-11 px-1"}`}
		>
			{children}
		</Link>
	);
}
