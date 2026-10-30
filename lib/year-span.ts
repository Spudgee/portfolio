/**
 * Years from ISO `YYYY-MM` months: "Current" while it runs, else "2024" or "2023–26".
 * Used by every row that carries dates, so work and study read the same.
 */
export function yearSpan(start: string, end: string | null) {
	if (end === null) return "Current";
	const startYear = start.slice(0, 4);
	const endYear = end.slice(0, 4);
	return startYear === endYear ? startYear : `${startYear}–${endYear.slice(2)}`;
}
