import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
				<div className="mx-auto flex w-full max-w-(--breakpoint-2xl) flex-1 flex-col px-2">
					<SiteHeader />
					<main className="flex-1 px-2 sm:px-6">{children}</main>
					<SiteFooter />
				</div>
			</body>
		</html>
	);
}
