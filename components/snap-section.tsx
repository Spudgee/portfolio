/**
 * One screen of the home page's vertical carousel. Every section opens the same way: its name as a
 * small ink heading, then one lead line, then its rows or buttons. It fills the screen below the
 * phone bar (3.5rem) or the whole screen beside the sidebar, and snaps to the top on scroll.
 */
export function SnapSection({
	id,
	heading,
	lead,
	children,
}: {
	id: string;
	heading: string;
	lead: string;
	children: React.ReactNode;
}) {
	return (
		<section
			id={id}
			aria-labelledby={`${id}-heading`}
			className="flex min-h-[calc(100dvh-3.5rem)] snap-start flex-col gap-10 py-12 md:min-h-dvh md:py-24"
		>
			<h2 id={`${id}-heading`} className="font-medium">
				{heading}
			</h2>
			<p className="max-w-[28em] text-lead text-balance">{lead}</p>
			{children}
		</section>
	);
}
