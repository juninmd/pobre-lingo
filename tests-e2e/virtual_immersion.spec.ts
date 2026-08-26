import { expect, test } from "@playwright/test";

test.describe("VirtualImmersionWidget", () => {
	test("renders and simulates VR immersion correctly", async ({ page }) => {
		// Mock local storage to ensure clean state
		await page.addInitScript(() => {
			window.localStorage.setItem("pobrelingo_onboarded", "true");
			window.localStorage.removeItem("daily_vr_immersion_claimed");
		});

		await page.goto("/");

		// Wait for main content to load
		await page.waitForSelector("text=Tendências 2024 & Prática Imersiva");

		// Locate the widget
		const widget = page.locator(".glass-card", {
			hasText: "Imersão 360° / VR",
		});
		await expect(widget).toBeVisible();

		// Click to start
		const startButton = widget.getByRole("button");
		await expect(startButton).toContainText(/Iniciar Experiência 360°/i);
		await expect(startButton).toBeVisible();
		await startButton.click();

		// Verify loading state
		await expect(widget.locator("text=Carregando Cenário VR...")).toBeVisible();
		await expect(widget.locator("text=Explorando...")).toBeVisible();

		// Wait for completion (2s timeout in component)
		await page.waitForTimeout(2500);

		// Verify completion state
		const completedButton = widget.getByRole("button");
		await expect(completedButton).toContainText(/Exploração Concluída!/i);
		await expect(completedButton).toBeVisible();

		// Button should be disabled now
		await expect(completedButton).toBeDisabled();
	});
});
