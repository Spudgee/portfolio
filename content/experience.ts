/** One role, newest first. Months are ISO `YYYY-MM`; `end: null` means current. */
export type Role = {
	company: string;
	companyUrl: string;
	/** The company's app icon, served from public/. */
	iconPath: string;
	title: string;
	start: string;
	end: string | null;
	summary: string;
};

export const EXPERIENCE: readonly Role[] = [
	{
		company: "Doccy",
		companyUrl: "https://doccy.com.au",
		iconPath: "/logos/doccy.png",
		title: "Founding Engineer",
		start: "2024-06",
		end: null,
		summary:
			"24/7 telehealth across Australia: general consults, medical certificates, prescriptions and specialist referrals with AHPRA-registered doctors.",
	},
	{
		company: "Medlo",
		companyUrl: "https://medlo.com.au",
		iconPath: "/logos/medlo.png",
		title: "Founding Engineer",
		start: "2024-06",
		end: null,
		summary:
			"A marketplace connecting doctors with locum shifts, and Medlo Evidence, a medical research tool for doctors.",
	},
	{
		company: "Medlo",
		companyUrl: "https://medlo.com.au",
		iconPath: "/logos/medlo.png",
		title: "Software Engineer Intern",
		start: "2024-02",
		end: "2024-06",
		summary: "Built the full-stack prototype of the Doccy telehealth platform.",
	},
];
