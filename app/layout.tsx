import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PERSON } from "@/content/person";
import { SITE_URL } from "@/content/site";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
	subsets: ["latin"],
	variable: "--font-hanken-grotesk",
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	authors: [{ name: PERSON.name, url: SITE_URL }],
	creator: PERSON.name,
	twitter: { card: "summary_large_image" },
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en-AU" className={hankenGrotesk.variable}>
			<body className="mx-auto flex min-h-dvh w-full max-w-(--breakpoint-2xl) flex-col px-4 sm:px-8">
				<SiteHeader />
				<main className="flex-1">{children}</main>
				<SiteFooter />
			</body>
		</html>
	);
}
