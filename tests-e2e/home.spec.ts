import { test, expect } from '@playwright/test';

test.describe('Home / Interactive Journey Book', () => {
  test('should render the timeline structure successfully', async ({ page }) => {
    await page.goto('/');

    // Verify header title logic based on path
    const title = page.locator('h1.font-headline');
    await expect(title).toHaveText(/PobreLingo|Minha Jornada/i);

    // Timeline spine indicator / module list
    await expect(page.locator('.max-w-2xl').first()).toBeVisible();
    await expect(page.getByText('Sua Jornada', { exact: true })).toBeVisible();

    // Responsive structure
    const isMobile = await page.evaluate(() => window.innerWidth < 768);
    if (!isMobile) {
      // Sidebar should be visible on desktop
      await expect(page.getByRole('navigation', { name: /sidebar/i }).or(page.locator('.md\\:flex.border-r'))).toBeVisible();
    }
  });

  test('should not show legacy MobileNav component on desktop', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Reason: Only applicable to desktop');
    await page.goto('/');

    // We removed MobileNav entirely, so it should not exist at all, or at least not be visible on desktop
    const mobileNav = page.locator('.md\\:hidden.fixed.bottom-0');
    await expect(mobileNav).toHaveCount(0);
  });
});
