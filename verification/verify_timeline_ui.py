import os
from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:5174")

def verify_timeline_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(BASE_URL)

        # Wait for content
        page.wait_for_selector("h1:has-text('Sua História')")

        # Wait for auto-scroll
        page.wait_for_timeout(3000)

        # Take screenshot
        screenshot_path = "timeline_verification.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_timeline_ui()
