import { type JsonLdGraph, toJsonLd } from "@/lib/json-ld";

/** Server-rendered JSON-LD, so crawlers that run no JavaScript still read it. */
export function JsonLd({ graph }: { graph: JsonLdGraph }) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD needs raw script text; toJsonLd escapes `<`.
			dangerouslySetInnerHTML={{ __html: toJsonLd(graph) }}
		/>
	);
}
