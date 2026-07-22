import { test, expect } from '@playwright/test';

test.describe('Learning Timeline (Journey Book)', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            window.localStorage.setItem('pobrelingo_onboarded', 'true');
        });
    });

    test('should render timeline on home', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'Sua Jornada', exact: true })).toBeVisible();
        await expect(page.getByText('To be continued...')).toBeVisible();
    });
});
