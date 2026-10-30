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

/** A large QR code that opens LinkedIn, centred, with one grey line beneath it. */
export default function QrPage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<h1 className="sr-only">LinkedIn QR code</h1>
			{LINKEDIN && (
				<figure className="grid justify-items-center gap-4 pt-[6vh]">
					<QrCode
						value={LINKEDIN.href}
						label={`QR code that opens ${PERSON.name}'s LinkedIn profile`}
					/>
					<figcaption className="text-muted">Scan to open LinkedIn</figcaption>
				</figure>
			)}
		</div>
	);
}
