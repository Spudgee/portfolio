import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";
import { PERSON } from "@/content/person";
import { PATHS } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

/** Kept out of search until there is something to find; the sitemap leaves it out too. */
export const metadata: Metadata = {
	...pageMetadata({
		path: PATHS.projects,
		title: `Projects – ${PERSON.name}`,
		description: `Projects by ${PERSON.name}, coming soon.`,
	}),
	robots: { index: false },
};

export default function ProjectsPage() {
	return <PlaceholderPage title="Projects" note="Projects are on the way." />;
}
