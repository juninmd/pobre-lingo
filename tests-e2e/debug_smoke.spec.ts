import { test, expect } from '@playwright/test';

test('smoke test with console logs', async ({ page }) => {
    page.on('console', msg => console.log(`BROWSER LOAD MSG: ${msg.text()}`));
    page.on('pageerror', err => console.log(`BROWSER LOAD ERR: ${err}`));

    await page.addInitScript(() => {
        window.localStorage.setItem('pobrelingo_onboarded', 'true');
    });

    await page.goto('/');
    await page.waitForTimeout(2000); // Give it a sec to crash or load

    // Check main title
    await expect(page).toHaveTitle(/PobreLingo/);

    // Check if root exists
    await expect(page.locator('#root')).toBeVisible();

    // take screenshot of what is visible
    await page.screenshot({ path: 'debug_screenshot.png' });

    // Check if we can find "Sua Jornada"
    const journey = page.getByRole('heading', { name: 'Sua Jornada' });
    if (await journey.isVisible()) {
        console.log('"Sua Jornada" is VISIBLE');
    } else {
        console.log('"Sua Jornada" is NOT VISIBLE');
    }
});
