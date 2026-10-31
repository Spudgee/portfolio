import { ImageResponse } from "next/og";
import { PERSON } from "@/content/person";
import { loadGoogleFont } from "@/lib/load-google-font";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/lib/page-metadata";

/** Hex copies of the light tokens in app/globals.css; the image renderer reads no CSS variables. */
const PAPER = "#ffffff";
const INK = "#171717";
const MUTED = "#737373";
const FONT_FAMILY = "Inter";

export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

/** The 1200×630 link-preview card: name and role, small, top left, like the site. */
export default async function OpenGraphImage() {
	const font = await loadGoogleFont(
		FONT_FAMILY,
		500,
		`${PERSON.name}${PERSON.headline}`,
	);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				padding: 64,
				background: PAPER,
				color: INK,
				fontFamily: FONT_FAMILY,
				fontSize: 36,
				lineHeight: 1.4,
			}}
		>
			<span>{PERSON.name}</span>
			<span style={{ color: MUTED }}>{PERSON.headline}</span>
		</div>,
		{
			...size,
			fonts: [{ name: FONT_FAMILY, data: font, weight: 500, style: "normal" }],
		},
	);
}
