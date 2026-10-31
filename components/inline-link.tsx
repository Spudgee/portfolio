import Link from "next/link";

/**
 * Link inside running text: underlined at rest, with a line that scales with the type,
 * and the same solid ink block as the navigation on hover or focus.
 * @see components/highlight-link.tsx for header and footer links
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
			className="underline decoration-[length:max(1px,0.035em)] underline-offset-[0.14em] transition-colors duration-150 ease-out hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper focus-visible:outline-hidden motion-reduce:transition-none"
		>
			{children}
		</Link>
	);
}
