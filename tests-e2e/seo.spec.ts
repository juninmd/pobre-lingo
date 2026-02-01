import { test, expect } from '@playwright/test';

test.describe('SEO Verification', () => {
    test('Dashboard should have correct title and meta tags', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Dashboard | PobreLingo/);

        const description = page.locator('meta[name="description"]');
        await expect(description).toHaveAttribute('content', /Acompanhe seu progresso/);

        // Open Graph
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Dashboard | PobreLingo/);
    });

    test('Curriculum page should have correct title', async ({ page }) => {
        await page.goto('/curriculum');
        await expect(page).toHaveTitle(/Jornada de Aprendizado | PobreLingo/);
    });
});
