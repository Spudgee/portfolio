/**
 * Years from ISO `YYYY-MM` months: "2024–now" while it runs, else "2024" or "2023–26".
 * Used by every row that carries dates, so work and study read the same.
 */
export function yearSpan(start: string, end: string | null) {
	const startYear = start.slice(0, 4);
	if (end === null) return `${startYear}–now`;
	const endYear = end.slice(0, 4);
	return startYear === endYear ? startYear : `${startYear}–${endYear.slice(2)}`;
}
