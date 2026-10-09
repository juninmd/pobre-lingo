import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests-e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: "http://localhost:5187",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},
	],
	webServer: {
		command:
			"node node_modules/vite/bin/vite.js build && node node_modules/vite/bin/vite.js preview --port 5187 --strictPort",
		url: "http://localhost:5187",
		reuseExistingServer: false,
		timeout: 120 * 1000,
	},
});
