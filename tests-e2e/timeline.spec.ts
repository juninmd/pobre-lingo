import { test, expect } from '@playwright/test';

test.describe('Journey Book Timeline', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should render the "Journey Book" structure', async ({ page }) => {
        // Verify Header "Sua História"
        await expect(page.getByRole('heading', { name: 'Sua História' })).toBeVisible();
        await expect(page.getByText('Cada lição é uma página virada')).toBeVisible();

        // Verify Chapter Headers
        await expect(page.getByText('Capítulo 1', { exact: true })).toBeVisible();

        // Verify Unit Headers
        await expect(page.getByRole('heading', { name: 'Unidade 1', exact: true })).toBeVisible();
    });

    test('should show the Bookmark and Active Lesson', async ({ page }) => {
        // Verify Bookmark "LER" is present
        await expect(page.getByText('LER')).toBeVisible();

        // Verify "Começar" button on active lesson
        const startButton = page.getByText('Começar');
        await expect(startButton).toBeVisible();

        // Check clicking it navigates
        await startButton.click();
        await expect(page).toHaveURL(/.*\/vocabulary\/.*/);
    });

    test('should manage navigation layout (Desktop vs Mobile)', async ({ page, isMobile }) => {
        if (isMobile) {
            // MobileNav should be visible (check for "Jornada" in nav)
            // MobileNav usually has "Jornada", "Arcade", etc.
            // Using a generic locator for nav
            await expect(page.locator('nav').getByText('Jornada')).toBeVisible();
        } else {
            // Desktop: Sidebar visible
            await expect(page.getByText('Aprenda Grátis')).toBeVisible();

            // MobileNav hidden (check for .lg:hidden containing PobreLingo which is in the mobile header)
            // Or simpler: The specific MobileNav container logic.
            // Let's rely on checking if the bottom nav "Jornada" is visible.
            // The sidebar has "Minha Jornada" (or "PobreLingo" header).
            // MobileNav has specific class `lg:hidden`.
            const mobileNav = page.locator('.lg\\:hidden > nav');
            await expect(mobileNav).toBeHidden();
        }
    });
});
