import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { PERSON } from "@/content/person";
import { LOCALE, SITE_URL } from "@/content/site";
import { THEME_BOOT_SCRIPT } from "@/lib/theme-choice";
import "./globals.css";

/** Inter with its optical-size axis, so large text renders in the Display cut. */
const inter = Inter({
	subsets: ["latin"],
	axes: ["opsz"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	authors: [{ name: PERSON.name, url: SITE_URL }],
	creator: PERSON.name,
	twitter: { card: "summary_large_image" },
	// Indexing is the default; leaving index/follow out keeps the 404's own noindex unopposed.
	robots: {
		"max-image-preview": "large",
		"max-snippet": -1,
		"max-video-preview": -1,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// The boot script may set data-theme before React hydrates, so <html> can differ from the server's.
		<html lang={LOCALE} className={inter.variable} suppressHydrationWarning>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed string from lib/theme-choice.ts, no user input.
					dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }}
				/>
			</head>
			<body className="flex min-h-dvh flex-col">
				<SiteNav />
				{/* Pages centre their own column: About reads narrow, Archive's grid runs wider. */}
				<main className="flex-1 px-4 pt-[8vh] pb-24">{children}</main>
				<SiteFooter />
			</body>
		</html>
	);
}
