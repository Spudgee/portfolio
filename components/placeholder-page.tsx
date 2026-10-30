/**
 * A page that exists in the nav before its content does: the title for screen readers and one grey
 * line saying what is coming, in the same pane as the other pages.
 */
export function PlaceholderPage({
	title,
	note,
}: {
	title: string;
	note: string;
}) {
	return (
		<div className="mx-auto max-w-[40rem]">
			<h1 className="sr-only">{title}</h1>
			<p className="text-muted">{note}</p>
		</div>
	);
}
