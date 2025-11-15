import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Cooper Agustin - Junior Software Engineer | Full-Stack Developer",
	description:
		"Cooper Agustin is a Junior Software Engineer at Medlo specializing in full-stack development with Next.js, React, TypeScript, and Supabase. Computer Science student at RMIT (3.6 GPA). Available for software engineering opportunities.",
	keywords: [
		"Cooper Agustin",
		"Software Engineer",
		"Junior Software Engineer",
		"Full-Stack Developer",
		"Next.js Developer",
		"React Developer",
		"TypeScript",
		"Supabase",
		"Medlo",
		"RMIT Computer Science",
		"Web Developer",
		"Frontend Developer",
		"Backend Developer",
	],
	authors: [{ name: "Cooper Agustin" }],
	creator: "Cooper Agustin",
	publisher: "Cooper Agustin",
	metadataBase: new URL("https://cooperagustin.vercel.app"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "profile",
		locale: "en_US",
		url: "/",
		title: "Cooper Agustin - Junior Software Engineer | Full-Stack Developer",
		description:
			"Junior Software Engineer at Medlo specializing in full-stack development with Next.js, React, TypeScript, and Supabase. Computer Science student at RMIT.",
		siteName: "Cooper Agustin Portfolio",
		// images: [
		// 	{
		// 		url: "/og-image.png",
		// 		width: 1200,
		// 		height: 630,
		// 		alt: "Cooper Agustin - Junior Software Engineer",
		// 	},
		// ],
	},
	// twitter: {
	// 	card: "summary_large_image",
	// 	title: "Cooper Agustin - Junior Software Engineer | Full-Stack Developer",
	// 	description: "Junior Software Engineer at Medlo specializing in full-stack development with Next.js, React, TypeScript, and Supabase.",
	// 	images: ["/og-image.png"],
	// },
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	// verification: {
	// 	google: "google-site-verification-code", // You'll need to get this from Google Search Console
	// },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Cooper Agustin",
		jobTitle: "Junior Software Engineer",
		worksFor: {
			"@type": "Organization",
			name: "Medlo",
			url: "https://medlo.com.au",
		},
		alumniOf: {
			"@type": "CollegeOrUniversity",
			name: "RMIT University",
		},
		knowsAbout: [
			"Software Engineering",
			"Full-Stack Development",
			"Next.js",
			"React",
			"TypeScript",
			"Supabase",
			"Web Development",
			"JavaScript",
			"Tailwind CSS",
			"tRPC",
		],
		sameAs: [
			"https://github.com/Spudgee",
			"https://www.linkedin.com/in/cooper-agustin/",
		],
		url: "https://cooperagustin.vercel.app",
		description:
			"Junior Software Engineer at Medlo specializing in full-stack development with Next.js, React, TypeScript, and Supabase. Computer Science student at RMIT University.",
	};

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
