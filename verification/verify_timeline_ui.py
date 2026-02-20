import os
from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:5173")

def verify_timeline_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        print(f"Navigating to {BASE_URL}")
        page.goto(BASE_URL)

        # Wait for the timeline to load
        page.wait_for_selector('[data-testid="chapter-header"]')

        # Scroll to the active lesson card
        active_card = page.locator('[data-testid="active-lesson-card"]')
        if active_card.count() > 0:
            active_card.scroll_into_view_if_needed()
            page.wait_for_timeout(1000) # Wait for scroll animation

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/timeline_ui.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_timeline_ui()
