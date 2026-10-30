import type { Metadata } from "next";
import { QrCode } from "@/components/qr-code";
import { SocialButtons } from "@/components/social-buttons";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.contact,
	title: `Contact – ${PERSON.name}`,
	description: `Where to find ${PERSON.name}: ${PERSON.socialLinks.map((link) => link.label).join(" and ")}.`,
});

const LINKEDIN = PERSON.socialLinks.find((link) => link.brand === "linkedin");

/**
 * Laid out like Home: the statement at lead size, the same GitHub and LinkedIn buttons, then a QR
 * code that opens LinkedIn, for someone across the table to scan.
 */
export default function ContactPage() {
	return (
		<div className="mx-auto max-w-[40rem]">
			<h1 className="sr-only">Contact</h1>
			<p className="text-row font-medium text-pretty md:text-lead">
				{PERSON.contactNote}
			</p>
			<div className="mt-6">
				<SocialButtons />
			</div>
			{LINKEDIN && (
				<figure className="mt-12 grid justify-items-start gap-3">
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
