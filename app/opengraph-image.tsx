import { ImageResponse } from "next/og";
import { PERSON } from "@/content/person";
import { loadGoogleFont } from "@/lib/load-google-font";

/** Hex copies of the light tokens in app/globals.css; the image renderer reads no CSS variables. */
const PAPER = "#f5f7f9";
const INK = "#181b1e";
const MUTED = "#65696f";

export const alt = `${PERSON.name}, ${PERSON.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The 1200×630 link-preview card: the role line above the name, set large. */
export default async function OpenGraphImage() {
	const font = await loadGoogleFont(
		"Hanken Grotesk",
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
				justifyContent: "space-between",
				padding: 64,
				background: PAPER,
				color: INK,
				fontFamily: "Hanken Grotesk",
			}}
		>
			<div style={{ fontSize: 32, color: MUTED }}>{PERSON.headline}</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					fontSize: 200,
					lineHeight: 0.92,
					letterSpacing: "-0.045em",
				}}
			>
				<span>{PERSON.givenName}</span>
				<span>{PERSON.familyName}</span>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{ name: "Hanken Grotesk", data: font, weight: 500, style: "normal" },
			],
		},
	);
}
