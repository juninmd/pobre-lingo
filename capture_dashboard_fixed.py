import asyncio
from playwright.async_api import async_playwright

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        # Bypass onboarding
        await page.goto("http://localhost:5173")
        await page.evaluate("localStorage.setItem('pobrelingo_onboarded', 'true')")

        # Reload to apply localStorage
        await page.goto("http://localhost:5173")

        # Wait for loading indicator to disappear
        await page.wait_for_selector(".lucide-loader-2", state="hidden", timeout=10000)

        # Small wait for layout to settle
        await page.wait_for_timeout(1000)

        # Scroll to the Immersive Practice section
        await page.evaluate("""
            const section = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Tendências 2024 & Prática Imersiva'));
            if (section) {
                section.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        """)

        # Another wait for scrolling to settle
        await page.wait_for_timeout(1000)

        await page.screenshot(path="/home/jules/verification/dashboard_trends_final.png")
        await browser.close()

asyncio.run(capture())
