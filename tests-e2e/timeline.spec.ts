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
    });

    test('should show the Bookmark and Active Lesson', async ({ page }) => {
        // Verify Bookmark "Aqui" is present
        await expect(page.getByText('Aqui', { exact: true })).toBeVisible();

        // Verify "Começar" button on active lesson
        const startButton = page.getByText('Começar');
        await expect(startButton).toBeVisible();

        // Check clicking it navigates
        await startButton.click();
        await expect(page).toHaveURL(/.*\/vocabulary\/.*/);
    });

    test('should manage navigation layout (Desktop vs Mobile)', async ({ page, isMobile }) => {
        if (isMobile) {
            // On mobile, the Sidebar is hidden by default and accessible via a SidebarTrigger in the header
            await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();

            // Open the sidebar
            await page.getByRole('button', { name: 'Toggle menu' }).click({ force: true });

            // The sidebar should now be visible and contain "PobreLingo" header
            await expect(page.locator('[data-sidebar="sidebar"]').getByText('PobreLingo', { exact: true })).toBeVisible();
        } else {
            // Desktop: Sidebar visible by default
            await expect(page.getByText('Aprenda Grátis')).toBeVisible();
            await expect(page.getByRole('link', { name: 'Jornada' })).toBeVisible();
        }
    });
});
