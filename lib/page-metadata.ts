import type { Metadata } from "next";
import { PERSON } from "@/content/person";
import { LOCALE } from "@/content/site";

/** The link-preview image app/opengraph-image.tsx renders, described once for both files. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_ALT = `${PERSON.name}, ${PERSON.headline}`;
const OG_IMAGE_PATH = "/opengraph-image";

/**
 * A page's title, description, canonical and Open Graph tags. A page's `openGraph` replaces
 * the layout's whole object, image included, so the shared fields are set here every time.
 */
export function pageMetadata({
	path,
	title,
	description,
}: {
	path: string;
	title: string;
	description: string;
}): Metadata {
	return {
		title: { absolute: title },
		description,
		alternates: { canonical: path },
		openGraph: {
			type: "website",
			url: path,
			siteName: PERSON.name,
			locale: LOCALE.replace("-", "_"),
			title,
			description,
			images: [{ url: OG_IMAGE_PATH, ...OG_IMAGE_SIZE, alt: OG_IMAGE_ALT }],
		},
	};
}
