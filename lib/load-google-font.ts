const FONT_FETCH_TIMEOUT_MS = 10_000;
const TRUETYPE_SOURCE = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/;

/**
 * TrueType bytes for one weight of a Google font, subset to `text`. The OG image renderer
 * cannot read the woff2 that next/font serves. Runs at build, when the image prerenders.
 * @see app/opengraph-image.tsx
 */
export async function loadGoogleFont(
	family: string,
	weight: number,
	text: string,
) {
	const cssUrl = `https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
	const cssResponse = await fetch(cssUrl, {
		signal: AbortSignal.timeout(FONT_FETCH_TIMEOUT_MS),
	});
	if (!cssResponse.ok) {
		throw new Error(
			`Google Fonts CSS for ${family} ${weight} returned ${cssResponse.status}`,
		);
	}

	const fontUrl = TRUETYPE_SOURCE.exec(await cssResponse.text())?.[1];
	if (fontUrl === undefined) {
		throw new Error(
			`Google Fonts CSS for ${family} ${weight} has no TrueType source`,
		);
	}

	const fontResponse = await fetch(fontUrl, {
		signal: AbortSignal.timeout(FONT_FETCH_TIMEOUT_MS),
	});
	if (!fontResponse.ok) {
		throw new Error(`Font file ${fontUrl} returned ${fontResponse.status}`);
	}
	return fontResponse.arrayBuffer();
}
