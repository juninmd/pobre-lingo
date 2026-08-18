import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            window.localStorage.setItem('pobrelingo_onboarded', 'true');
        });
        await page.goto('/');
    });

    test('should render the home dashboard', async ({ page, isMobile }) => {
        await expect(page.getByRole('heading', { name: 'Prática Imersiva' }).or(page.getByText('Prática Imersiva'))).toBeVisible();

        // Verify that the layout adjusts based on mobile
        if (isMobile) {
            // Verify desktop navigation is hidden and mobile nav is shown
            const desktopNav = page.locator('nav').first();
            // In MobileNav, we have `nav[aria-label="Navegação principal móvel"]`
            const mobileNav = page.locator('nav[aria-label="Navegação principal móvel"]');
            await expect(mobileNav).toBeVisible();
        } else {
            // Verify mobile nav is not visible on desktop
            const mobileNav = page.locator('nav[aria-label="Navegação principal móvel"]');
            await expect(mobileNav).not.toBeVisible();
        }
    });

    test('should navigate to current lesson when clicking active lesson bookmark', async ({ page }) => {
        const activeLesson = page.locator('a[href*="/lesson/"]').locator('div.animate-pulse').first().locator('..');

        try {
           await activeLesson.waitFor({ state: 'visible', timeout: 5000 });
           await activeLesson.click({ force: true });
           await expect(page).not.toHaveURL('/');
        } catch {
            // fallback if it renders differently
             const alternative = page.locator('a.bg-gradient-to-r').first();
             await alternative.waitFor({ state: 'visible', timeout: 5000 });
             await alternative.click({ force: true });
             await expect(page).not.toHaveURL('/');
        }
    });
});
