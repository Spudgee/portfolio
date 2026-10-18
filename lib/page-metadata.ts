import type { Metadata } from "next";
import { PERSON } from "@/content/person";

/** Served by app/opengraph-image.tsx. */
const OG_IMAGE_PATH = "/opengraph-image";
const OG_IMAGE_ALT = `${PERSON.name}, ${PERSON.headline}`;

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
			locale: "en_AU",
			title,
			description,
			images: [
				{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: OG_IMAGE_ALT },
			],
		},
	};
}
