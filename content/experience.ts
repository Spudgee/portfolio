/** One role, newest first. Months are ISO `YYYY-MM`; `end: null` means current. */
export type Role = {
	company: string;
	companyUrl: string;
	title: string;
	start: string;
	end: string | null;
};

export const EXPERIENCE: readonly Role[] = [
	{
		company: "Doccy",
		companyUrl: "https://doccy.com.au",
		title: "Founding Engineer",
		start: "2024-06",
		end: null,
	},
	{
		company: "Medlo",
		companyUrl: "https://medlo.com.au",
		title: "Founding Engineer",
		start: "2024-06",
		end: null,
	},
	{
		company: "Medlo",
		companyUrl: "https://medlo.com.au",
		title: "Software Engineer Intern",
		start: "2024-02",
		end: "2024-06",
	},
];
