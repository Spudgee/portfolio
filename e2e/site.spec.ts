import { expect, type Page, test } from "@playwright/test";

const SITE_URL = "https://cooperagustin.dev";
/** Ids a page may reference without defining: they live in the home graph. */
const SITE_IDS = [`${SITE_URL}/#website`, `${SITE_URL}/#person`];
const PHONE = { width: 390, height: 844 };

/** The four pages in the nav, in order, with what each must serve. */
const PAGES = [
	{
		path: "/",
		label: "Home",
		title: "Cooper Agustin – Founding Engineer at Doccy and Medlo",
		h1: "Cooper Agustin, Founding Engineer at Doccy and Medlo",
		canonical: SITE_URL,
	},
	{
		path: "/work",
		label: "Work",
		title: "Work – Cooper Agustin",
		h1: "Work",
		canonical: `${SITE_URL}/work`,
	},
	{
		path: "/archive",
		label: "Archive",
		title: "Archive – Cooper Agustin",
		h1: "Archive",
		canonical: `${SITE_URL}/archive`,
	},
	{
		path: "/contact",
		label: "Contact",
		title: "Contact – Cooper Agustin",
		h1: "Contact",
		canonical: `${SITE_URL}/contact`,
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

/** The body's resolved background, which changes with the theme. */
function bodyBackground(page: Page) {
	return page.evaluate(() => getComputedStyle(document.body).backgroundColor);
}

test("home is the founding-engineer statement and nothing else", async ({
	page,
}) => {
	await page.goto("/");

	await expect(page.getByRole("main")).toContainText(
		"Founding engineer at Doccy and Medlo",
	);
	await expect(
		page.getByRole("main").getByRole("heading", { level: 2 }),
		"Experience, Education and Stack live on Work",
	).toHaveCount(0);
	await expect(
		page.getByRole("main").getByRole("link", { name: /GitHub|LinkedIn/ }),
		"profile links live only in the footer",
	).toHaveCount(0);
});

test("the nav reaches every page and marks the current one", async ({
	page,
}) => {
	await page.goto("/");
	const nav = page.getByRole("navigation", { name: "Main" });
	await expect(nav.getByRole("link")).toHaveText(
		PAGES.map(({ label }) => label),
	);

	for (const { path, label } of PAGES) {
		await nav.getByRole("link", { name: label }).click();
		await expect.poll(() => new URL(page.url()).pathname).toBe(path);
		await expect(nav.getByRole("link", { name: label })).toHaveAttribute(
			"aria-current",
			"page",
		);
		await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
	}
});

test("work lists experience, education and stack", async ({ page }) => {
	await page.goto("/work");
	const main = page.getByRole("main");

	for (const name of ["Experience", "Education", "Stack"]) {
		await expect(main.getByRole("region", { name })).toBeVisible();
	}
	const experience = main.getByRole("region", { name: "Experience" });
	await expect(experience.getByRole("link", { name: "Doccy" })).toBeVisible();
	await expect(
		experience.getByRole("link", { name: "Medlo" }).first(),
	).toBeVisible();
	await expect(
		main
			.getByRole("region", { name: "Education" })
			.getByRole("link", { name: "RMIT University" }),
	).toBeVisible();
});

test("archive links out to its Are.na channel", async ({ page }) => {
	await page.goto("/archive");

	await expect(
		page.getByRole("main").getByRole("link", { name: "View on Are.na" }),
	).toHaveAttribute("href", /^https:\/\/www\.are\.na\//);
});

test("every page shows the profile links once, in the footer", async ({
	page,
}) => {
	for (const { path } of PAGES) {
		await page.goto(path);
		const footer = page.getByRole("contentinfo");

		await expect(
			page.getByRole("link", { name: "LinkedIn" }),
			path,
		).toHaveCount(1);
		await expect(page.getByRole("link", { name: "GitHub" }), path).toHaveCount(
			1,
		);
		await expect(
			footer.getByRole("link", { name: "LinkedIn" }),
			path,
		).toHaveAttribute("href", /linkedin\.com/);

		await expect(footer, path).toContainText(
			`© ${new Date().getFullYear()} Cooper Agustin`,
		);
		await expect(
			footer.getByRole("link", { name: "GitHub" }),
			path,
		).toBeVisible();
		await expect(
			footer.getByRole("link", { name: "LinkedIn" }),
			path,
		).toBeVisible();
	}
});

test("on a phone the menu button opens a full-screen menu that navigates and closes", async ({
	page,
}) => {
	await page.setViewportSize(PHONE);
	await page.goto("/");
	const menu = page.locator("#mobile-menu");
	const open = page.getByRole("button", { name: "Open menu" });

	// Closed, the menu is 0 px tall, so it counts as hidden; its clipped links would not.
	await expect(menu).toBeHidden();
	await open.click();
	// Open, the trigger is renamed "Close menu" and hidden behind the menu's own close button.
	await expect(page.locator('[aria-controls="mobile-menu"]')).toHaveAttribute(
		"aria-expanded",
		"true",
	);
	await expect(menu).toBeVisible();
	for (const name of ["GitHub", "LinkedIn"]) {
		await expect(menu.getByRole("link", { name })).toBeVisible();
	}

	await menu.getByRole("link", { name: "Work" }).click();
	await expect(page).toHaveURL(/\/work$/);
	await expect(menu).toBeHidden();

	await page.getByRole("button", { name: "Open menu" }).click();
	await menu.getByRole("button", { name: "Close menu" }).click();
	await expect(menu).toBeHidden();
});

test("the theme switch steps to dark and the choice survives a reload", async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: "light" });
	await page.goto("/");
	const lightBackground = await bodyBackground(page);
	const nav = page.getByRole("navigation", { name: "Main" });
	const themeSwitch = page.getByRole("button", { name: /^Theme:/ });

	await themeSwitch.click();
	await expect(themeSwitch).toHaveAccessibleName(/^Theme: Light/);
	await themeSwitch.click();
	await expect(themeSwitch).toHaveAccessibleName(/^Theme: Dark/);
	await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
	await expect.poll(() => bodyBackground(page)).not.toBe(lightBackground);

	await page.reload();
	await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
	await expect(nav).toBeVisible();
});

test("colours follow the OS dark setting while the theme is Auto", async ({
	page,
}) => {
	await page.goto("/");
	const lightBackground = await bodyBackground(page);

	await page.emulateMedia({ colorScheme: "dark" });

	await expect.poll(() => bodyBackground(page)).not.toBe(lightBackground);
});

for (const expected of PAGES) {
	test(`${expected.path} has its own title, one H1, a canonical and a preview image`, async ({
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
	});
}

test("home carries one JSON-LD graph with no dangling ids", async ({
	page,
}) => {
	await page.goto("/");

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

test("/qr shows a LinkedIn code but stays out of search and the nav", async ({
	page,
	request,
}) => {
	await page.goto("/qr");

	await expect(
		page.getByRole("img", { name: /LinkedIn profile/ }),
	).toBeVisible();
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
		"content",
		/noindex/,
	);
	await expect(
		page.getByRole("navigation", { name: "Main" }).getByRole("link", {
			name: /QR/,
		}),
	).toHaveCount(0);
	const sitemap = await (await request.get("/sitemap.xml")).text();
	expect(sitemap).not.toContain("/qr");
});

test("retired pages redirect to where their content moved", async ({
	page,
}) => {
	for (const [from, to] of [
		["/about", /\/$/],
		["/education", /\/work$/],
		["/stack", /\/work$/],
		["/projects", /\/work$/],
	] as const) {
		await page.goto(from);
		await expect(page, from).toHaveURL(to);
	}
});

test("an unknown path answers 404 with a way home", async ({ page }) => {
	const response = await page.goto("/no-such-page");

	expect(response?.status()).toBe(404);
	await expect(page.getByRole("heading", { level: 1 })).toHaveText(
		"Page not found",
	);
	await expect(
		page.getByRole("main").getByRole("link", { name: "Go to the home page" }),
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

	for (const path of [...PAGES.map((p) => p.path), "/qr"]) {
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
