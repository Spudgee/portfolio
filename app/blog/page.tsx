import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

/** Kept out of search until there is something to read; the sitemap leaves it out too. */
export const metadata: Metadata = {
	...pageMetadata({
		path: PATHS.blog,
		title: `Blog – ${PERSON.name}`,
		description: `Writing by ${PERSON.name}, coming soon.`,
	}),
	robots: { index: false },
};

export default function BlogPage() {
	return <PlaceholderPage title="Blog" note="Writing is on the way." />;
}
