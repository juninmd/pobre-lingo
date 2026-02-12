import os
from playwright.sync_api import sync_playwright

def verify_journey_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to see the desktop layout
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        # Navigate to dashboard
        page.goto("http://localhost:5173")

        # Wait for the timeline to load (look for "Sua História")
        page.wait_for_selector("text=Sua História", timeout=10000)

        # Wait a bit for animations and lazy loading
        page.wait_for_timeout(3000)

        # Take a screenshot of the full page
        os.makedirs("verification", exist_ok=True)
        page.screenshot(path="verification/journey_dashboard_desktop.png", full_page=True)

        # Mobile view
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667})
        page_mobile = context_mobile.new_page()
        page_mobile.goto("http://localhost:5173")
        page_mobile.wait_for_selector("text=Sua História", timeout=10000)
        page_mobile.wait_for_timeout(3000)
        page_mobile.screenshot(path="verification/journey_dashboard_mobile.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_journey_ui()
