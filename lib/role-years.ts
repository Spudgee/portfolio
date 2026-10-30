import type { Role } from "@/content/experience";

/** "Current" while a role runs, else its year ("2024") or years ("2018–22"), from the ISO months. */
export function roleYears(role: Role) {
	if (role.end === null) return "Current";
	const startYear = role.start.slice(0, 4);
	const endYear = role.end.slice(0, 4);
	return startYear === endYear ? startYear : `${startYear}–${endYear.slice(2)}`;
}
