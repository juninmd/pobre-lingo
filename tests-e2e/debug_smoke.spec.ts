import { test, expect } from '@playwright/test';

test('smoke test with console logs', async ({ page }) => {
    page.on('console', msg => console.log(`BROWSER LOAD MSG: ${msg.text()}`));
    page.on('pageerror', err => console.log(`BROWSER LOAD ERR: ${err}`));

    await page.goto('/');
    await page.waitForTimeout(2000); // Give it a sec to crash or load

    // Check main title
    await expect(page).toHaveTitle(/PobreLingo/);

    // Check if root exists
    await expect(page.locator('#root')).toBeVisible();

    // take screenshot of what is visible
    await page.screenshot({ path: 'debug_screenshot.png' });

    // Check if we can find "My Journey"
    const journey = page.getByRole('heading', { name: 'My Journey' });
    if (await journey.isVisible()) {
        console.log('"My Journey" is VISIBLE');
    } else {
        console.log('"My Journey" is NOT VISIBLE');
    }
});
