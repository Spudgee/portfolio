/**
 * One headed group on a page: a medium-weight heading at row size (20px), a step above the 16px rows
 * beneath it and sitting close to them. Every group uses it, so they all open the same way.
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
			<h2 id={`${id}-heading`} className="text-row font-medium">
				{label}
			</h2>
			<div className="mt-1">{children}</div>
		</section>
	);
}
