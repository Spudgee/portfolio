import Link from "next/link";

/**
 * Header and footer link. The underline is always drawn but transparent, and fades in
 * on hover or keyboard focus, so nothing shifts.
 * @see components/inline-link.tsx for links inside running text
 */
export function HoverUnderlineLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="inline-block py-2 underline decoration-transparent decoration-1 underline-offset-3 transition-colors duration-150 ease-out hover:decoration-current focus-visible:decoration-current motion-reduce:transition-none"
		>
			{children}
		</Link>
	);
}
