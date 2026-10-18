import { expect, type Locator, type Page, test } from "@playwright/test";

const SITE_URL = "https://cooperagustin.vercel.app";
const TRANSPARENT = "rgba(0, 0, 0, 0)";
/** Ids a page may reference without defining: they live in the home graph. */
const SITE_IDS = [`${SITE_URL}/#website`, `${SITE_URL}/#person`];

const PAGES = [
	{
		path: "/",
		title: "Cooper Agustin – Founding Engineer at Doccy and Medlo",
		h1: "Cooper Agustin",
		canonical: SITE_URL,
	},
	{
		path: "/education",
		title: "Education – Cooper Agustin",
		h1: "Education",
		canonical: `${SITE_URL}/education`,
	},
];

/** The page's JSON-LD blocks: raw text, and the ids defined at the top of each graph. */
async function jsonLdBlocks(page: Page) {
	const texts = await page
		.locator('script[type="application/ld+json"]')
		.allTextContents();
	return texts.map((text) => {
		const graph = JSON.parse(text) as { "@graph": { "@id"?: string }[] };
		return { text, definedIds: graph["@graph"].map((node) => node["@id"]) };
	});
}

/** A link's resolved text colour, which the hover underline must take on. */
function textColor(link: Locator) {
	return link.evaluate((element) => getComputedStyle(element).color);
}

test("home leads with founding-engineer work at Doccy and Medlo", async ({
	page,
}) => {
	await page.goto("/");

	await expect(page.getByRole("heading", { level: 1 })).toHaveText(
		"Cooper Agustin",
	);
	await expect(page.locator("main p").first()).toContainText(
		"Founding engineer at Doccy and Medlo",
	);
	const experience = page.getByRole("region", { name: "Experience" });
	await expect(
		experience.getByRole("heading", { level: 3, name: "Doccy" }),
	).toBeVisible();
	await expect(
		experience.getByRole("heading", { level: 3, name: "Medlo" }).first(),
	).toBeVisible();
	await expect(page.getByText("RMIT")).toHaveCount(0);
});

test("education is its own page, reached from the header", async ({ page }) => {
	await page.goto("/");
	await page
		.getByRole("banner")
		.getByRole("link", { name: "Education" })
		.click();

	await expect(page).toHaveURL(/\/education$/);
	await expect(page.getByRole("heading", { level: 1 })).toHaveText("Education");
	await expect(
		page.getByRole("link", { name: "RMIT University" }),
	).toBeVisible();
});

test("header and footer are lowercase text links that underline on hover and focus", async ({
	page,
}) => {
	await page.goto("/");
	const header = page.getByRole("banner");
	const footer = page.getByRole("contentinfo");

	for (const { path } of PAGES) {
		await page.goto(path);
		await expect(page.locator("svg, img"), path).toHaveCount(0);
	}

	const links = [
		header.getByRole("link", { name: "Cooper Agustin" }),
		header.getByRole("link", { name: "Education" }),
		footer.getByRole("link", { name: "GitHub" }),
		footer.getByRole("link", { name: "LinkedIn" }),
	];
	for (const link of links) {
		await expect(link).toHaveCSS("text-transform", "lowercase");
		await expect(link).toHaveCSS("text-decoration-color", TRANSPARENT);

		await link.scrollIntoViewIfNeeded();
		const restingBox = await link.boundingBox();
		await link.hover();
		await expect(link).toHaveCSS(
			"text-decoration-color",
			await textColor(link),
		);
		expect(await link.boundingBox()).toEqual(restingBox);

		await page.mouse.move(0, 0);
		await expect(link).toHaveCSS("text-decoration-color", TRANSPARENT);
	}

	await page.keyboard.press("Tab");
	await expect(links[0]).toBeFocused();
	await expect(links[0]).toHaveCSS(
		"text-decoration-color",
		await textColor(links[0]),
	);
});

for (const expected of PAGES) {
	test(`${expected.path} has its own title, one H1, a canonical, a preview image and one JSON-LD graph`, async ({
		page,
	}) => {
		const response = await page.goto(expected.path);

		expect(response?.status()).toBe(200);
		await expect(page).toHaveTitle(expected.title);
		await expect(page.locator("h1")).toHaveCount(1);
		await expect(page.locator("h1")).toHaveText(expected.h1);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			"href",
			expected.canonical,
		);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute(
			"content",
			/.{60,}/,
		);
		await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
			"content",
			`${SITE_URL}/opengraph-image`,
		);

		const blocks = await jsonLdBlocks(page);
		expect(blocks).toHaveLength(1);
		const [{ text, definedIds }] = blocks;
		expect(text).not.toContain("<");
		const knownIds = new Set([...definedIds, ...SITE_IDS]);
		for (const [, id] of text.matchAll(/"@id":"([^"]+)"/g)) {
			expect(knownIds.has(id), `dangling @id ${id}`).toBe(true);
		}
		for (const [, url] of text.matchAll(/"url":"([^"]+)"/g)) {
			expect(url, "JSON-LD urls are absolute").toMatch(/^https:\/\//);
		}
	});
}

test("an unknown path answers 404 with a way home", async ({ page }) => {
	const response = await page.goto("/no-such-page");

	expect(response?.status()).toBe(404);
	await expect(page.getByRole("heading", { level: 1 })).toHaveText(
		"Page not found",
	);
	await expect(
		page.getByRole("link", { name: "Go to the home page" }),
	).toHaveAttribute("href", "/");
});

test("robots.txt and sitemap.xml list the canonical pages", async ({
	request,
}) => {
	const robots = await (await request.get("/robots.txt")).text();
	expect(robots).toContain("Allow: /");
	expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);

	const sitemap = await (await request.get("/sitemap.xml")).text();
	for (const { canonical } of PAGES) {
		expect(sitemap).toContain(`<loc>${canonical}</loc>`);
	}
	expect(sitemap).not.toMatch(/<priority>|<changefreq>/);
});

test("pages fit a 320 px phone without sideways scroll", async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 640 });

	for (const { path } of PAGES) {
		await page.goto(path);
		await page.evaluate(async () => {
			await document.fonts.ready;
		});
		const overflow = await page.evaluate(
			() =>
				document.documentElement.scrollWidth -
				document.documentElement.clientWidth,
		);
		expect(overflow, path).toBe(0);
	}
});

test("colours follow the OS dark setting", async ({ page }) => {
	await page.goto("/");
	const lightBackground = await page.evaluate(
		() => getComputedStyle(document.body).backgroundColor,
	);

	await page.emulateMedia({ colorScheme: "dark" });

	await expect
		.poll(() =>
			page.evaluate(() => getComputedStyle(document.body).backgroundColor),
		)
		.not.toBe(lightBackground);
});
