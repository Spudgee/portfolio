import { LOCALE } from "@/content/site";

const MONTH_FORMAT = new Intl.DateTimeFormat(LOCALE, {
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

/**
 * "June 2024" or "Feb 2024" (Australian abbreviations) from an ISO `YYYY-MM` month, read in UTC so no timezone shifts it.
 * @see content/experience.ts
 */
export function monthLabel(isoMonth: string) {
	return MONTH_FORMAT.format(new Date(`${isoMonth}-01T00:00:00Z`));
}
