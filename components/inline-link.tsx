import Link from "next/link";

/**
 * Link inside running text: underlined at rest in the muted colour, full ink on hover or focus.
 * @see components/hover-underline-link.tsx for header and footer links
 */
export function InlineLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="underline decoration-muted decoration-1 underline-offset-3 transition-colors duration-150 ease-out hover:decoration-current focus-visible:decoration-current focus-visible:decoration-2 focus-visible:outline-hidden motion-reduce:transition-none"
		>
			{children}
		</Link>
	);
}
