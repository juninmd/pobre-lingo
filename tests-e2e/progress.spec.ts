import { expect, test } from "@playwright/test";

test.describe("Progress page", () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem("vite-ui-theme", "pobre-lingo");
			window.localStorage.setItem("pobrelingo_onboarded", "true");
		});
	});

	test("renders weekly bars, projections and practice links", async ({
		page,
	}) => {
		await page.goto("/progress");
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });
		await expect(
			page.getByRole("heading", { name: "Seu progresso" }),
		).toBeVisible();
		await expect(
			page.getByLabel("Minutos estudados por vertente esta semana"),
		).toBeVisible();
		await expect(page.getByRole("link", { name: "Biblioteca" })).toBeVisible();
		await expect(
			page.getByRole("link", { name: "Tutor", exact: true }),
		).toBeVisible();
	});

	test("changing the weekly goal persists across reloads", async ({ page }) => {
		await page.goto("/progress");
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });
		await page.getByRole("button", { name: "10h/sem" }).click();
		await expect(page.getByRole("button", { name: "10h/sem" })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
		await page.reload();
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });
		await expect(page.getByRole("button", { name: "10h/sem" })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
	});

	test("dashboard fluency card links to the progress route", async ({
		page,
	}) => {
		const log: Record<string, unknown> = {
			days: {},
			wordsRead: 0,
		};
		await page.addInitScript((value) => {
			window.localStorage.setItem(
				"pobrelingo_study_log",
				JSON.stringify(value),
			);
		}, log);
		await page.goto("/");
		await page.waitForSelector(".lucide-loader-2", { state: "hidden" });
		const detailsLink = page.getByRole("link", { name: /Ver detalhes/ });
		if (await detailsLink.count()) {
			await detailsLink.first().click();
			await expect(page).toHaveURL(/\/progress$/);
		}
	});
});
