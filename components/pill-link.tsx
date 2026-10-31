import Link from "next/link";

/**
 * Nav link on a soft rounded pill, after Hayden Bleasel's nav: grey at rest, ink on a light pill on
 * hover or focus, ink on a darker pill when its page is open. The pill pads outwards, so
 * the word stays aligned with the text around it, and the hit area stays 44px tall.
 */
export function PillLink({
	href,
	children,
	"aria-current": ariaCurrent,
	onClick,
}: {
	href: string;
	children: React.ReactNode;
	"aria-current"?: "page";
	onClick?: () => void;
}) {
	return (
		<Link
			href={href}
			aria-current={ariaCurrent}
			onClick={onClick}
			className="group inline-flex min-h-11 items-center focus-visible:outline-hidden"
		>
			<span className="-mx-3 rounded-full px-3 py-0.5 text-muted transition-colors duration-150 ease-out group-hover:bg-pill-soft group-hover:text-ink group-focus-visible:bg-pill-soft group-focus-visible:text-ink motion-reduce:transition-none group-aria-[current=page]:bg-pill group-aria-[current=page]:text-ink">
				{children}
			</span>
		</Link>
	);
}
