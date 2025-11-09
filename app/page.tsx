"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

const professionalExperience = [
	{
		title: "Junior Software Engineer",
		company: "Medlo",
		startDate: "June 2025",
		endDate: "",
		notes: {
			"Locum shifts with Medlo": "https://medlo.com.au",
			"Online telehealth with Doccy": "https://doccy.com.au",
			"Become a better doctor with Medlo Evidence":
				"https://medlo.evidence.com.au",
		},
	},
	{
		title: "Software Engineer Intern",
		company: "Medlo",
		startDate: "Feb 2025",
		endDate: "June 2025",
		notes: {
			"Built a mock-up for Doccy": "",
			"next.js, shadcn, tailwindcss, typescript, react, supabase, trpc, zod":
				"",
		},
	},
];

const education = [
	{
		degree: "Bachelor of Computer Science (Advanced Computer Science)",
		institution: "RMIT",
		startDate: "Feb 2023",
		endDate: "",
		list: {
			"Expected Graduation: June 2026": "",
		},
	},
];

export default function Home() {
	const [isNightMode, setIsNightMode] = useState(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("isNightMode");
			return stored === "true";
		}
		return false;
	});

	useEffect(() => {
		localStorage.setItem("isNightMode", String(isNightMode));

		// Apply dark class to html element
		if (isNightMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isNightMode]);

	return (
		<div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex flex-col items-center p-4 sm:m-4">
			<main className="w-full max-w-4xl px-4 md:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16">
				{/* Header about me */}
				<div className="flex flex-col items-start mb-8">
					<div className="flex flex-row items-center justify-between gap-2 w-full">
						<span className="text-xl sm:text-2xl font-medium uppercase">
							<span className="uppercase">Cooper Agustin</span>
						</span>
						<Button
							variant="outline"
							size="icon-sm"
							className="hover:bg-accent transition-colors p-0 border-none shadow-none"
							onClick={() => setIsNightMode(!isNightMode)}
						>
							{isNightMode ? (
								<SunMedium className="size-4" />
							) : (
								<Moon className="size-4" />
							)}
						</Button>
					</div>
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full">
						<span className="text-sm sm:text-base text-muted-foreground">
							Junior Software Engineer
						</span>
						<div className="flex flex-row items-center gap-4">
							<a
								href="https://github.com/Spudgee"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors group"
							>
								<span className="underline">github</span>
							</a>
							<a
								href="https://www.linkedin.com/in/cooper-agustin/"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors group"
							>
								<span className="underline">linkedin</span>
							</a>
						</div>
					</div>
				</div>

				{/* Professional Experience */}
				<div className="flex flex-col items-start space-y-2 sm:space-y-3 mb-12">
					<span className="text-xl sm:text-2xl font-medium uppercase">
						Professional Experience
					</span>
					<div className="flex flex-col items-start gap-6 w-full">
						{professionalExperience.map((experience) => (
							<div
								key={experience.title}
								className="flex flex-col items-start gap-2 w-full"
							>
								<div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between ">
									<span className="text-sm sm:text-base">
										{experience.title} @ {experience.company}
									</span>
									<span className="text-xs sm:text-base text-muted-foreground uppercase">
										{experience.startDate}
										{" - "}
										{experience.endDate ? experience.endDate : "present"}
									</span>
								</div>
								<div className="flex flex-col items-start pl-2 sm:pl-4">
									{experience.notes &&
										Object.entries(experience.notes).map(([key, value]) =>
											value ? (
												<a
													key={key}
													href={value}
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-2 before:content-['•'] before:text-muted-foreground before:no-underline"
												>
													<span className="underline">{key}</span>
												</a>
											) : (
												<span
													key={key}
													className="text-sm sm:text-base text-muted-foreground flex items-center gap-2 before:content-['•'] before:text-muted-foreground"
												>
													{key}
												</span>
											),
										)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Education */}
				<div className="flex flex-col items-start space-y-2 sm:space-y-3 mb-12">
					<span className="text-xl sm:text-2xl font-medium uppercase">
						Education
					</span>
					<div className="flex flex-col items-start gap-6 w-full">
						{education.map((edu) => (
							<div
								key={edu.degree}
								className="flex flex-col items-start gap-2 w-full"
							>
								<div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between ">
									<span className="text-sm sm:text-base">
										{edu.degree} @ {edu.institution}
									</span>
									<span className="text-xs sm:text-base text-muted-foreground uppercase">
										{edu.startDate}
										{" - "}
										{edu.endDate ? edu.endDate : "present"}
									</span>
								</div>
								<div className="flex flex-col items-start pl-2 sm:pl-4">
									{edu.list &&
										Object.entries(edu.list).map(([key, value]) => (
											<span
												key={key}
												className="text-sm sm:text-base text-muted-foreground"
											>
												{key}
											</span>
										))}
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<footer className="w-full max-w-4xl mt-auto px-4 md:px-6">
				<div className="flex flex-row gap-6 items-end justify-start py-8 sm:py-12 text-xs sm:text-sm text-muted-foreground">
					<span className="text-xs sm:text-sm text-muted-foreground uppercase">
						© 2025 Cooper Agustin
					</span>
				</div>
			</footer>
		</div>
	);
}
