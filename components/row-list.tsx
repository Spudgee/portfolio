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

const ROW_CLASS =
	"group flex min-h-11 items-center justify-between gap-4 md:min-h-[2.375rem]";

/**
 * The one row style for every list on the site, after Brian Lovin's work list: 38px rows (44px on
 * phones, for thumbs), the primary in medium ink with the secondary in grey beside it, and the aside
 * in grey on the right, in Inter like everything else. A linked row is a link across its whole width.
 */
export function RowList({ rows }: { rows: readonly Row[] }) {
	return (
		<ul className="text-row">
			{rows.map((row) => {
				const content = (
					<>
						<span className="flex min-w-0 flex-wrap items-baseline gap-x-2">
							<span className="-mx-1 px-1 font-medium transition-colors duration-150 ease-out group-hover:bg-ink group-hover:text-paper group-focus-visible:bg-ink group-focus-visible:text-paper motion-reduce:transition-none">
								{row.primary}
							</span>
							{row.secondary && (
								<span className="text-muted">{row.secondary}</span>
							)}
						</span>
						{row.aside && (
							<span className="shrink-0 text-muted tabular-nums">
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
