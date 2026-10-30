import Link from "next/link";

/**
 * Navigation link that turns into a solid ink block on hover, keyboard focus and the current page,
 * as on F451. `bare` keeps a 44px tall hit area but fills only a tight block around the text;
 * `row` fills its whole full-width row, as in the phone menu.
 * @see components/inline-link.tsx for links inside running text
 */
export function HighlightLink({
	href,
	look,
	children,
	"aria-current": ariaCurrent,
	onClick,
}: {
	href: string;
	look: "bare" | "row";
	children: React.ReactNode;
	"aria-current"?: "page";
	onClick?: () => void;
}) {
	if (look === "row") {
		return (
			<Link
				href={href}
				aria-current={ariaCurrent}
				onClick={onClick}
				className="flex min-h-11 w-full items-center px-2 transition-colors duration-150 ease-out hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper focus-visible:outline-hidden motion-reduce:transition-none aria-[current=page]:bg-ink aria-[current=page]:text-paper"
			>
				{children}
			</Link>
		);
	}

	return (
		<Link
			href={href}
			aria-current={ariaCurrent}
			onClick={onClick}
			className="group inline-flex min-h-11 items-center focus-visible:outline-hidden"
		>
			<span className="-mx-1 px-1 transition-colors duration-150 ease-out group-hover:bg-ink group-hover:text-paper group-focus-visible:bg-ink group-focus-visible:text-paper motion-reduce:transition-none group-aria-[current=page]:bg-ink group-aria-[current=page]:text-paper">
				{children}
			</span>
		</Link>
	);
}
