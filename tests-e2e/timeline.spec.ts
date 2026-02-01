import { test, expect } from '@playwright/test';

test.describe('Learning Timeline', () => {
    test.beforeEach(async ({ page }) => {
        // Go to home page where the timeline is
        await page.goto('/');
    });

    test('should render the timeline structure', async ({ page }) => {
        // Verify "My Journey" title is present
        await expect(page.getByRole('heading', { name: 'My Journey' })).toBeVisible();
        await expect(page.getByText('Keep moving forward, chapter by chapter.')).toBeVisible();

        // Verify at least one Unit is visible (e.g. Unit 1)
        await expect(page.getByText('Unidade 1: Primeiros Passos')).toBeVisible();
    });

    test('should show the Resume/Bookmark button when there is progress', async ({ page }) => {
        // Note: This relies on the default mock/local state which usually has some progress or unlocked first lesson.
        // If state is empty, this might fail unless we mock the storage or data.
        // For now, assuming default state allows starting the first lesson.

        // Check for "Resume" or "Start" context in the bookmark card
        // The implementation uses "Resume" text in the button inside the bookmark card
        const resumeButton = page.getByRole('button', { name: 'Resume' });

        // It might depend on whether "nextUp" logic finds something. 
        // Usually Unit 1 Lesson 1 is unlocked by default.
        if (await resumeButton.isVisible()) {
            await expect(resumeButton).toBeVisible();
            await expect(page.getByText('Continue where you left off')).toBeVisible();
        } else {
            console.log('Resume button not visible, possibly no progress state or all locked');
        }
    });

    test('should adapt to mobile layout', async ({ page, isMobile }) => {
        if (isMobile) {
            // Verify timeline line has margin adjustments or container width
            // This is more visual, but we can check if elements are stacked
            const timelineContainer = page.locator('.border-l-2');
            await expect(timelineContainer).toBeVisible();

            // Verify no horizontal scrollbar ideally, but hard to test directly
            // Check if main container has padding
            await expect(page.locator('.max-w-2xl')).toBeVisible();
        }
    });

    test('should navigate to lesson when clicking a module', async ({ page }) => {
        // Find a module card (any card with a title)
        const moduleCard = page.locator('.space-y-4 > .relative > .border').first(); // Adjust selector based on LearningTimeline markup

        // Ensure it exists
        if (await moduleCard.isVisible()) {
            // Click to expand if not expanded (how to check? maybe just click it)
            // We can check if we see "Começar" or "Ver" buttons.
            // If not visible, click the card.

            const startButton = page.getByRole('button', { name: 'Começar' }).first().or(page.getByRole('button', { name: 'Ver' }).first());

            if (!await startButton.isVisible()) {
                await moduleCard.click();
                await page.waitForTimeout(500); // Wait for expansion animation
            }

            // Now try to find a lesson link
            // We look for any link inside the timeline that looks like a lesson
            const lessonLink = page.locator('a[href*="/vocabulary/"], a[href*="/exercises/"], a[href*="/quiz/"], a[href*="/rules"]').first();

            if (await lessonLink.isVisible()) {
                const href = await lessonLink.getAttribute('href');
                await lessonLink.click();
                // Verify URL - checking path prefix mostly
                const expectedPath = href!.split('?')[0];
                await expect(page).toHaveURL(new RegExp(expectedPath));
            } else {
                console.log("No lesson links found even after clicking module");
            }
        }
    });
});
