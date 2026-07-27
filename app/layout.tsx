import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export const metadata: Metadata = {
	title: "Cooper Agustin — Founding Engineer",
	description:
		"Cooper Agustin is a Founding Engineer at Medlo, building full-stack products with Next.js, React, TypeScript and Supabase. Computer Science student at RMIT.",
	keywords: [
		"Cooper Agustin",
		"Software Engineer",
		"Founding Engineer",
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
		title: "Cooper Agustin — Founding Engineer",
		description:
			"Founding Engineer at Medlo, building full-stack products with Next.js, React, TypeScript and Supabase. Computer Science student at RMIT.",
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
	// 	title: "Cooper Agustin — Founding Engineer",
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
		jobTitle: "Founding Engineer",
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
			"Founding Engineer at Medlo, building full-stack products with Next.js, React, TypeScript and Supabase. Computer Science student at RMIT University.",
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
				className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
