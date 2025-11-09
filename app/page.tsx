"use client";

import { Button } from "@/components/ui/button";
import {
	ExternalLink,
	Github,
	Moon,
	SunMedium,
	Ellipsis,
	ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const features = [
	{
		icon: Ellipsis,
		title: "In progress",
		description:
			"Developing high-quality projects to enhance my abilities at work and in my free time.",
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
		if (isNightMode) document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	}, [isNightMode]);

	return (
		<div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex flex-col items-center p-4 sm:m-4 overflow-hidden">
			<main className="w-full max-w-4xl px-4 md:px-6 pt-12 sm:pt-20 pb-12 ">
				{/* Header about me */}
				<div className="flex flex-col items-start mb-12">
					<div className="flex flex-row items-center justify-between gap-2 w-full">
						<span className="text-xl sm:text-2xl font-medium">
							Cooper Agustin
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
					<div className="flex flex-col items-start gap-2 w-full mt-4">
						<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
							Learning to build efficient, high-quality, and scalable software
							solutions at Medlo.
							<br />
							<br />
							I&apos;ve always been drawn to how technology works. Growing up,
							I&apos;d mess with phone software and game systems, breaking
							things just to see what would happen. Enjoy managing home servers,
							networks, offline LLMs, and developing my own projects in my free
							time.
						</p>
					</div>
				</div>

				{/* Professional Experience */}
				<div className="flex flex-col items-start space-y-2 sm:space-y-3 mb-12">
					<span className="text-xl sm:text-2xl font-medium">
						Professional Experience
					</span>
					<div className="flex flex-col items-start gap-6 w-full">
						{/* Junior Software Engineer */}
						<div className="flex flex-col items-start gap-2 w-full">
							<div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between ">
								<span className="text-sm sm:text-base">
									Junior Software Engineer @ Medlo
								</span>
								<span className="text-xs sm:text-sm text-muted-foreground">
									June 2025 - Present
								</span>
							</div>
							<div className="flex flex-col items-start pl-2 sm:pl-4 gap-2">
								<a
									href="https://medlo.com.au"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-2"
								>
									<ChevronRight className="size-4 flex-shrink-0" />
									<Image
										src="/favicon/medlo.png"
										alt="Medlo"
										width={20}
										height={20}
									/>
									<span className="underline">Locum shifts with Medlo</span>
								</a>
								<a
									href="https://doccy.com.au"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-2"
								>
									<ChevronRight className="size-4 flex-shrink-0" />
									<Image
										src="/favicon/doccy.png"
										alt="Doccy"
										width={20}
										height={20}
									/>
									<span className="underline">
										Online telehealth with Doccy
									</span>
								</a>
								<a
									href="https://medlo.evidence.com.au"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-2"
								>
									<ChevronRight className="size-4 flex-shrink-0" />
									<Image
										src="/favicon/evidence.png"
										alt="Medlo"
										width={20}
										height={20}
									/>
									<span className="underline">
										Become a better doctor with Medlo Evidence
									</span>
								</a>
							</div>
						</div>

						{/* Software Engineer Intern */}
						<div className="flex flex-col items-start gap-2 w-full">
							<div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between ">
								<span className="text-sm sm:text-base">
									Software Engineer Intern @ Medlo
								</span>
								<span className="text-xs sm:text-sm text-muted-foreground">
									Feb 2025 - June 2025
								</span>
							</div>
							<div className="flex flex-col items-start pl-2 sm:pl-4">
								<span className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
									<ChevronRight className="size-4 flex-shrink-0" />
									Built a mock-up for Doccy
								</span>

								<span className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
									<ChevronRight className="size-4 flex-shrink-0" />
									next.js, shadcn, tailwindcss, typescript, react, supabase,
									trpc, zod
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Education */}
				<div className="flex flex-col items-start space-y-2 sm:space-y-3 mb-12">
					<span className="text-xl sm:text-2xl font-medium">Education</span>
					<div className="flex flex-col items-start gap-6 w-full">
						<div className="flex flex-col items-start gap-2 w-full">
							<div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between ">
								<span className="text-sm sm:text-base">
									Bachelor of Computer Science (Advanced Computer Science) @
									RMIT
								</span>
								<span className="text-xs sm:text-sm text-muted-foreground">
									Feb 2023 - Present
								</span>
							</div>
							<div className="flex flex-col items-start pl-2 sm:pl-4">
								<div className="flex flex-row items-center gap-2">
									<span className="text-sm sm:text-base text-muted-foreground flex items-center gap-2 mr-4">
										<ChevronRight className="size-4 flex-shrink-0" />
										GPA: 3.6/4.0
									</span>
									<span className="text-sm sm:text-base text-muted-foreground">
										WAM: 86%
									</span>
								</div>
								<span className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
									<ChevronRight className="size-4 flex-shrink-0" />
									Expected Graduation: June 2026
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Features */}
				<div className="flex flex-col items-start space-y-2 sm:space-y-3 mb-12">
					<span className="text-xl sm:text-2xl font-medium">Projects</span>
					{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="border rounded-sm p-6 sm:p-8 transition-colors border-border bg-card hover:bg-accent/50"
							>
								<div className="mb-4 sm:mb-6">
									<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm flex items-center justify-center">
										<feature.icon className="size-5 sm:size-6 text-foreground" />
									</div>
								</div>
								<h3 className="text-base sm:text-lg font-normal mb-3 sm:mb-4 text-foreground">
									{feature.title}
								</h3>
								<p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div> */}
					<div className="flex flex-col items-start gap-3 mb-4">
						<div className="flex  items-start gap-2">
							<span className="text-sm sm:text-base text-foreground">
								In progress...
							</span>
						</div>
						<span className="text-sm sm:text-base text-muted-foreground">
							Developing high-quality projects to enhance my abilities at work
							and in my free time. Will be updated as I complete projects.
						</span>
					</div>
				</div>
			</main>
			<footer className="w-full max-w-4xl mt-auto px-4 md:px-6">
				<div className="flex flex-row gap-6 items-end justify-start py-8 sm:py-12 pb-0 text-xs sm:text-sm text-muted-foreground">
					<span>© 2025 Cooper Agustin</span>
				</div>
			</footer>
		</div>
	);
}
