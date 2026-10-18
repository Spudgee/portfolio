import Link from "next/link";

/**
 * Header and footer link. The underline is always drawn but transparent, and fades in
 * on hover or keyboard focus, so nothing shifts. A link marked `aria-current="page"`
 * turns ink inside a muted header.
 * @see components/inline-link.tsx for links inside running text
 */
export function HoverUnderlineLink({
	href,
	children,
	"aria-current": ariaCurrent,
}: {
	href: string;
	children: React.ReactNode;
	"aria-current"?: "page";
}) {
	return (
		<Link
			href={href}
			aria-current={ariaCurrent}
			className="inline-flex min-h-11 items-center underline decoration-transparent decoration-1 underline-offset-3 transition-colors duration-150 ease-out hover:decoration-current focus-visible:decoration-current motion-reduce:transition-none aria-[current=page]:text-ink"
		>
			{children}
		</Link>
	);
}
