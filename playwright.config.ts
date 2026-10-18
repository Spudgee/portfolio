import { defineConfig, devices } from "@playwright/test";

/** The specs run against the production server on its own port, so `bun dev` keeps 3000. */
const PORT = 3100;

export default defineConfig({
	testDir: "e2e",
	forbidOnly: Boolean(process.env.CI),
	reporter: process.env.CI
		? [["line"], ["json", { outputFile: "test-results/results.json" }]]
		: "list",
	use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
	webServer: {
		command: `bun run start --port ${PORT}`,
		url: `http://localhost:${PORT}`,
		reuseExistingServer: !process.env.CI,
		timeout: 60_000,
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
