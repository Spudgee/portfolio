/**
 * One labelled group on a page, after Brian Lovin's about page: a small grey heading, then its rows
 * or buttons. Every group uses it, so Work, Education, Stack and Contact all open the same way.
 */
export function ContentGroup({
	id,
	label,
	children,
}: {
	id: string;
	label: string;
	children: React.ReactNode;
}) {
	return (
		<section aria-labelledby={`${id}-heading`}>
			<h2 id={`${id}-heading`} className="text-muted">
				{label}
			</h2>
			<div className="mt-2">{children}</div>
		</section>
	);
}
