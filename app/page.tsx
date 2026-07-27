"use client";

import { ArrowUpRight, Moon, SunMedium } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
	{ label: "Home", href: "#home", id: "home" },
	{ label: "Work", href: "#work", id: "work" },
	{ label: "Education", href: "#education", id: "education" },
];

/** Scroll-spy targets, in document order. */
const SPY_IDS = ["home", "work", "education", "contact"];

const EXPERIENCE = [
	{
		role: "Founding Engineer",
		company: "Doccy & Medlo",
		summary:
			"Joined the founding team for the long haul, building and shipping the products behind Doccy and Medlo — telehealth and locum shifts.",
		period: "Jun 2026 — Now",
	},
	{
		role: "Junior Software Engineer",
		company: "Doccy & Medlo",
		summary:
			"Built and shipped the products behind Doccy and Medlo — telehealth and locum shifts.",
		period: "Jun 2025 — Jun 2026",
	},
	{
		role: "Software Engineer Intern",
		company: "Doccy & Medlo",
		summary:
			"Developed the full-stack prototype for the Doccy telehealth platform.",
		period: "Mar — Jun 2025",
	},
];

const EDUCATION = [
	{
		role: "Bachelor of Computer Science (Advanced)",
		company: "RMIT University",
		summary: "GPA 3.4/4.0 · WAM 83%",
		period: "2023 — 2026",
	},
];

const LINKS = [
	{ name: "GitHub", href: "https://github.com/Spudgee" },
	{ name: "LinkedIn", href: "https://www.linkedin.com/in/cooper-agustin/" },
];

const META = [
	[
		{ label: "github", value: "Spudgee", href: "https://github.com/Spudgee" },
		{
			label: "linkedin",
			value: "cooper-agustin",
			href: "https://www.linkedin.com/in/cooper-agustin/",
		},
		{ label: "university", value: "RMIT" },
	],
	[
		{ label: "currently", value: "Doccy & Medlo" },
		{ label: "based in", value: "Melbourne, AU" },
		{ label: "time zone", value: "AEST · GMT+10" },
	],
];

function SectionHeading({ id, title }: { id: string; title: string }) {
	return (
		<h2
			id={id}
			className="scroll-mt-24 text-3xl font-semibold tracking-tighter sm:text-5xl"
		>
			{title}
		</h2>
	);
}

function EntryList({
	items,
}: {
	items: { role: string; company: string; summary: string; period: string }[];
}) {
	return (
		<div className="mt-5 w-full border-t border-border">
			{items.map((item) => (
				<div
					key={`${item.role}-${item.company}`}
					className="grid grid-cols-1 gap-2 border-b border-border px-2 py-5 transition-colors hover:bg-accent/60 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10 sm:px-4"
				>
					<div className="min-w-0">
						<h3 className="text-base font-medium tracking-tight sm:text-lg">
							{item.role}
							<span className="font-normal text-muted-foreground">
								{" "}
								· {item.company}
							</span>
						</h3>
						<p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
							{item.summary}
						</p>
					</div>
					<span className="text-lg font-medium tabular-nums tracking-tighter sm:text-2xl">
						{item.period}
					</span>
				</div>
			))}
		</div>
	);
}

export default function Home() {
	const [isNightMode, setIsNightMode] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const isNavLockedRef = useRef(false);

	useEffect(() => {
		const stored = localStorage.getItem("isNightMode");
		if (stored === "true") setIsNightMode(true);
	}, []);

	useEffect(() => {
		localStorage.setItem("isNightMode", String(isNightMode));
		document.documentElement.classList.toggle("dark", isNightMode);
	}, [isNightMode]);

	/**
	 * Scroll-spy. Position-based rather than IntersectionObserver: the last
	 * target whose top has passed the probe line wins, so there is always
	 * exactly one active id at any scroll offset. A nav click locks the spy —
	 * scroll snapping can pull the page back off an in-section anchor such as
	 * #education — and only a real user scroll releases the lock.
	 */
	useEffect(() => {
		const resolve = () => {
			const probe = window.innerHeight * 0.35;
			let current = SPY_IDS[0];
			for (const id of SPY_IDS) {
				const el = document.getElementById(id);
				if (el && el.getBoundingClientRect().top <= probe) current = id;
			}
			return current;
		};

		let frame = 0;
		const onScroll = () => {
			if (isNavLockedRef.current || frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				setActiveSection(resolve());
			});
		};

		const unlock = () => {
			isNavLockedRef.current = false;
			onScroll();
		};

		setActiveSection(resolve());

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		window.addEventListener("wheel", unlock, { passive: true });
		window.addEventListener("touchstart", unlock, { passive: true });
		window.addEventListener("keydown", unlock);

		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			window.removeEventListener("wheel", unlock);
			window.removeEventListener("touchstart", unlock);
			window.removeEventListener("keydown", unlock);
		};
	}, []);

	return (
		<>
			{/* Nav */}
			<header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-4">
				<nav className="pointer-events-auto mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-surface/80 p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md">
					<ul className="flex items-center gap-0.5">
						{NAV_LINKS.map((link) => {
							const isActive = activeSection === link.id;
							return (
								<li key={link.href}>
									<a
										href={link.href}
										onClick={() => {
											isNavLockedRef.current = true;
											setActiveSection(link.id);
										}}
										aria-current={isActive ? "true" : undefined}
										className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm tracking-tight transition-colors sm:px-4 ${
											isActive
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:bg-accent hover:text-foreground"
										}`}
									>
										<span
											className={`size-1 rounded-full transition-all duration-300 ${
												isActive
													? "scale-100 bg-primary-foreground opacity-100"
													: "scale-0 opacity-0"
											}`}
											aria-hidden="true"
										/>
										{link.label}
									</a>
								</li>
							);
						})}
					</ul>

					<span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

					<button
						type="button"
						onClick={() => setIsNightMode(!isNightMode)}
						aria-label={
							isNightMode ? "Switch to light mode" : "Switch to dark mode"
						}
						className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
					>
						{isNightMode ? (
							<SunMedium className="size-4" />
						) : (
							<Moon className="size-4" />
						)}
					</button>
				</nav>
			</header>

			<main>
				{/* Hero */}
				<section id="home" className="view scroll-mt-0">
					<div className="shell justify-center gap-8 pt-20 pb-10 sm:gap-14 sm:pt-24 sm:pb-12">
						<h1 className="display text-[28cqw] sm:text-[14.5cqw]">
							<span className="block sm:inline">Cooper</span>{" "}
							<span className="block sm:inline">Agustin</span>
						</h1>

						<div className="grid grid-cols-1 gap-7 border-t border-border pt-6 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:gap-12 sm:pt-7 lg:gap-20">
							<div className="max-w-md">
								<p className="text-2xl font-semibold tracking-tighter sm:text-3xl">
									Founding Engineer
									<span className="block font-normal text-muted-foreground">
										at Doccy &amp; Medlo
									</span>
								</p>
								<p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
									Full-stack engineer building telehealth and locum shift
									products end to end with Next.js, React, TypeScript and
									Supabase. Final-year Computer Science at RMIT.
								</p>
								<a
									href="mailto:cooper@medlo.com.au"
									className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm tracking-tight transition-colors hover:bg-accent"
								>
									Get in touch
									<ArrowUpRight className="size-4" />
								</a>
							</div>

							<div className="grid grid-cols-2 gap-x-6 gap-y-6 self-start sm:gap-x-10">
								{META.map((column) => (
									<dl key={column[0].label} className="space-y-5">
										{column.map((item) => (
											<div key={item.label}>
												<dt className="text-sm tracking-tight text-foreground">
													{item.label}
												</dt>
												<dd className="mt-0.5 text-sm text-muted-foreground">
													{item.href ? (
														<a
															href={item.href}
															target={
																item.href.startsWith("http")
																	? "_blank"
																	: undefined
															}
															rel="noopener noreferrer"
															className="transition-colors hover:text-foreground"
														>
															{item.value}
														</a>
													) : (
														item.value
													)}
												</dd>
											</div>
										))}
									</dl>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Work & Education */}
				<section id="work" aria-labelledby="work-heading" className="view">
					<div className="shell justify-center gap-8 py-20 sm:gap-12 sm:py-24">
						<div>
							<SectionHeading id="work-heading" title="Work" />
							<EntryList items={EXPERIENCE} />
						</div>
						<div>
							<SectionHeading id="education" title="Education" />
							<EntryList items={EDUCATION} />
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer id="contact" className="view justify-end">
				<div className="flex w-full p-3 sm:p-4">
					<div className="flex h-[72svh] w-full flex-col gap-10 rounded-3xl bg-ink px-5 py-8 text-ink-foreground [container-type:inline-size] sm:h-auto sm:min-h-[52svh] sm:gap-12 sm:px-8 sm:py-9">
						<div className="mb-auto">
							{/* Wordmark — spans the full width of the card */}
							<p
								aria-hidden="true"
								className="display flex flex-col pb-[0.06em] text-[30cqw] sm:flex-row sm:justify-between sm:text-[15cqw]"
							>
								<span>Cooper</span>
								<span>Agustin</span>
							</p>
							<div className="mt-5 pl-[1.2cqw] sm:mt-6 sm:pl-[0.6cqw]">
								<p className="text-2xl font-medium leading-tight tracking-tight text-ink-foreground/85 sm:text-4xl">
									<span className="block sm:inline">Founding Engineer</span>
									<span className="block text-ink-foreground/55 sm:inline">
										{" "}
										@ Doccy &amp; Medlo
									</span>
								</p>
							</div>
						</div>

						{/* Bottom bar — identical assembly at every width: links row,
						    then location, then copyright, all right aligned */}
						<div className="flex flex-col items-end gap-3 border-t border-ink-border pt-5 text-right">
							<ul className="flex flex-wrap justify-end gap-x-6 gap-y-2">
								{LINKS.map((link) => (
									<li key={link.name}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="group inline-flex items-center gap-1.5 text-base tracking-tight transition-opacity hover:opacity-70"
										>
											{link.name}
											<ArrowUpRight className="size-4 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
										</a>
									</li>
								))}
							</ul>

							<p className="text-sm tracking-tight">
								Melbourne, AU
								<span className="text-ink-muted"> · AEST · GMT+10</span>
							</p>
							<p className="text-sm text-ink-muted">
								© {new Date().getFullYear()} Cooper Agustin
							</p>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
