import type { Metadata } from "next";
import { QrCode } from "@/components/qr-code";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

/** For showing in person, not for finding: kept out of search, the nav and the sitemap. */
export const metadata: Metadata = {
	...pageMetadata({
		path: PATHS.qr,
		title: `LinkedIn QR code – ${PERSON.name}`,
		description: `Scan to open ${PERSON.name}'s LinkedIn profile.`,
	}),
	robots: { index: false },
};

const LINKEDIN = PERSON.socialLinks.find((link) => link.brand === "linkedin");

/** One oversized QR code that opens LinkedIn, centred, with nothing else on the page to scan past. */
export default function QrPage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<h1 className="sr-only">LinkedIn QR code</h1>
			{LINKEDIN && (
				<div className="grid justify-items-center pt-[4vh]">
					<QrCode
						value={LINKEDIN.href}
						label={`QR code that opens ${PERSON.name}'s LinkedIn profile`}
					/>
				</div>
			)}
		</div>
	);
}
