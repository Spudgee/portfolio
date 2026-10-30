import Link from "next/link";

export type Row = {
	key: string;
	/** In ink; the part a hover fills when the row links somewhere. */
	primary: string;
	/** In grey, on the same line after the primary. */
	secondary?: string;
	/** In grey, right-aligned, digits at even width: years, a grade. */
	aside?: string;
	href?: string;
};

/**
 * Phones: a two-column grid, primary and aside on the first line and the secondary across the full
 * width beneath, so it never shares width with the aside. From md: one flex line, aside pushed right.
 */
const ROW_CLASS =
	"group grid min-h-11 grid-cols-[minmax(0,1fr)_auto] gap-x-4 py-1.5 md:flex md:min-h-8 md:items-center md:gap-x-2 md:py-0";

/**
 * The one row style for every list on the site, after Brian Lovin's work list: the primary in medium
 * ink with the secondary in grey beside it, and the aside in grey on the right. On phones the
 * secondary runs full width under the first line, so nothing wraps beside the aside; from md up it
 * is one 32px line. Rows are body size everywhere, smaller than the statement. A
 * linked row is a link across its whole width.
 */
export function RowList({ rows }: { rows: readonly Row[] }) {
	return (
		<ul className="text-body">
			{rows.map((row) => {
				const content = (
					<>
						<span className="-mx-1 self-start justify-self-start px-1 font-medium transition-colors duration-150 ease-out group-hover:bg-ink group-hover:text-paper group-focus-visible:bg-ink group-focus-visible:text-paper motion-reduce:transition-none md:self-auto">
							{row.primary}
						</span>
						{row.secondary && (
							<span className="col-span-2 row-start-2 text-muted md:min-w-0">
								{row.secondary}
							</span>
						)}
						{row.aside && (
							<span className="col-start-2 row-start-1 text-right text-muted tabular-nums md:ml-auto md:shrink-0">
								{row.aside}
							</span>
						)}
					</>
				);
				return (
					<li key={row.key}>
						{row.href ? (
							<Link
								href={row.href}
								className={`${ROW_CLASS} focus-visible:outline-hidden`}
							>
								{content}
							</Link>
						) : (
							<div className={ROW_CLASS}>{content}</div>
						)}
					</li>
				);
			})}
		</ul>
	);
}
