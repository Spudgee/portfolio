import type { Metadata } from "next";
import { SocialButtons } from "@/components/social-buttons";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
	path: PATHS.contact,
	title: `Contact – ${PERSON.name}`,
	description: `Where to find ${PERSON.name}: ${PERSON.socialLinks.map((link) => link.label).join(" and ")}.`,
});

/** Laid out like Home: the statement at lead size, then the same GitHub and LinkedIn buttons. */
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
		</div>
	);
}
