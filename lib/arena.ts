import { SITE_URL } from "@/content/site";

/** Are.na refuses requests without a descriptive User-Agent; this names the site and how to reach it. */
const USER_AGENT = `cooperagustin-portfolio (+${SITE_URL})`;
const TIMEOUT_MS = 8000;
const REFRESH_SECONDS = 3600;

/** One picture on the Archive page, already sized by Are.na. */
export type ArchiveImage = {
	id: number;
	title: string;
	/** Where clicking goes: the saved site for a link block, else the block on Are.na. */
	href: string;
	/** Are.na's 800px copy; width and height below are its 400px sibling's, the same shape. */
	src2x: string;
	width: number;
	height: number;
};

/** The parts of Are.na's v3 channel-contents response this page reads; anything else is ignored. */
type ArenaBlock = {
	id?: number;
	title?: string | null;
	source?: { url?: string } | null;
	image?: {
		alt_text?: string | null;
		small?: { src_2x?: string; width?: number; height?: number };
	} | null;
};

/**
 * The channel's pictures, refreshed hourly. Blocks without an image (text, empty links) are
 * skipped. Throws when Are.na is down or slow, so the page can say so instead of rendering blanks.
 */
export async function fetchArchiveImages(channelSlug: string) {
	const response = await fetch(
		`https://api.are.na/v3/channels/${channelSlug}/contents?per=100`,
		{
			headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
			signal: AbortSignal.timeout(TIMEOUT_MS),
			next: { revalidate: REFRESH_SECONDS },
		},
	);
	if (!response.ok) {
		throw new Error(
			`Are.na channel ${channelSlug} answered ${response.status}`,
		);
	}
	const body: { data?: ArenaBlock[] } = await response.json();
	return (body.data ?? []).flatMap((block): ArchiveImage[] => {
		const small = block.image?.small;
		if (
			typeof block.id !== "number" ||
			!small?.src_2x ||
			typeof small.width !== "number" ||
			typeof small.height !== "number"
		) {
			return [];
		}
		return [
			{
				id: block.id,
				title: block.title ?? block.image?.alt_text ?? "Untitled",
				href: block.source?.url ?? `https://www.are.na/block/${block.id}`,
				src2x: small.src_2x,
				width: small.width,
				height: small.height,
			},
		];
	});
}
