import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 900})
        await page.goto("http://localhost:5173/")

        # Bypass onboarding
        await page.evaluate("localStorage.setItem('pobrelingo_onboarded', 'true')")
        await page.reload()

        # Wait for page to load
        await page.wait_for_selector(".lucide-loader-2", state="hidden")

        # Try to find the section by text to scroll it into view
        section = page.get_by_text("Tendências 2024 & Prática Imersiva")
        if await section.count() > 0:
            await section.scroll_into_view_if_needed()
            await page.wait_for_timeout(500)

        await page.screenshot(path="/home/jules/verification/widgets_trends_2.png")
        await browser.close()

asyncio.run(main())
