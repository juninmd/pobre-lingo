import { test, expect } from '@playwright/test';

test('test_home_render', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Menu principal is hidden on mobile by default');

    // Set the onboarded flag to bypass the onboarding modal
    await page.addInitScript(() => {
        window.localStorage.setItem('pobrelingo_onboarded', 'true');
    });

    // Go to home
    await page.goto('/');

    // Check for "Menu principal" in nav (via generic locator)
    await expect(page.getByRole('navigation', { name: /Menu principal/i })).toBeVisible();

    // Check for "Onde parei" indicator
    await expect(page.getByText('Onde parei')).toBeVisible();
});

test('test_responsive_mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'This test is explicitly for mobile behavior');
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.addInitScript(() => {
        window.localStorage.setItem('pobrelingo_onboarded', 'true');
    });

    await page.goto('/');

    // In mobile, "Menu principal" sidebar is hidden initially, trigger is a button
    // Let's verify we can see the "Alternar menu" button
    const menuBtn = page.getByRole('button', { name: /Alternar menu/i });
    await expect(menuBtn).toBeVisible();

    // Click the menu
    await menuBtn.click();

    // Now "Menu principal" should be visible
    await expect(page.getByRole('navigation', { name: /Menu principal/i })).toBeVisible();

    // Check for "Onde parei" indicator
    await expect(page.getByText('Onde parei')).toBeVisible();
});
