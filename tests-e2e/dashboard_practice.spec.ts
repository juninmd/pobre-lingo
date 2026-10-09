import { expect, test } from "@playwright/test";

test("dashboard directs beginners to real practice without click rewards", async ({
	page,
}) => {
	await page.addInitScript(() => {
		localStorage.setItem("pobrelingo_onboarded", "true");
		localStorage.setItem("pl_xp", "0");
		localStorage.setItem("pl_gems", "0");
	});
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto("/");
	await expect(
		page.getByText("Palavra do dia · A1", { exact: true }),
	).toBeVisible();
	await page.getByRole("button", { name: "Revelar significado" }).click();
	await expect(page.locator("#daily-word-meaning")).toBeVisible();
	await page.getByRole("button", { name: "Nova dica" }).click();
	await page
		.getByRole("link", { name: "Praticar uma expressão da minha aula" })
		.click();
	await expect(page).toHaveURL(/\/course$/);
	const rewards = await page.evaluate(() => [
		localStorage.getItem("pl_xp"),
		localStorage.getItem("pl_gems"),
	]);
	expect(rewards).toEqual(["0", "0"]);
	expect(errors).toEqual([]);
	await page.goto("/");
	await expect(
		page.getByRole("link", { name: "Praticar uma expressão da minha aula" }),
	).toBeVisible();
	await page.screenshot({
		path: `e2e-screenshots/practice-dashboard-${test.info().project.name}.png`,
		fullPage: true,
	});
});
