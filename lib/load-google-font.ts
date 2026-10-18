const FONT_FETCH_TIMEOUT_MS = 10_000;
const TRUETYPE_SOURCE = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/;

/**
 * GET under the deadline. A network failure, timeout or non-2xx throws an error naming
 * what was fetched and the URL.
 */
async function fetchWithDeadline(url: string, what: string) {
	const response = await fetch(url, {
		signal: AbortSignal.timeout(FONT_FETCH_TIMEOUT_MS),
	}).catch((cause) => {
		throw new Error(`${what} at ${url} failed`, { cause });
	});
	if (!response.ok) {
		throw new Error(`${what} at ${url} returned ${response.status}`);
	}
	return response;
}

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
	const what = `Google Fonts CSS for ${family} ${weight}`;
	const cssUrl = `https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
	const css = await (await fetchWithDeadline(cssUrl, what)).text();

	const fontUrl = TRUETYPE_SOURCE.exec(css)?.[1];
	if (fontUrl === undefined) {
		throw new Error(`${what} at ${cssUrl} has no TrueType source`);
	}

	const font = await fetchWithDeadline(
		fontUrl,
		`Font file for ${family} ${weight}`,
	);
	return font.arrayBuffer();
}
