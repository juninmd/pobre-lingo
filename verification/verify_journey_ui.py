import os
from playwright.sync_api import sync_playwright

BASE_URL = os.getenv("BASE_URL", "http://localhost:5173")

def verify_journey_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # --- Desktop Verification ---
        print("Verifying Desktop Layout...")
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()
        page.goto(BASE_URL)

        # Wait for timeline to load (look for the unique class in LearningTimeline root)
        # or the "Sua História" text
        page.wait_for_selector("text=Sua História")

        # Ensure the content is actually visible
        page.wait_for_timeout(1000)

        page.screenshot(path="verification/journey_desktop.png", full_page=True)
        print("Screenshot saved to verification/journey_desktop.png")
        context.close()

        # --- Mobile Verification ---
        print("Verifying Mobile Layout...")
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667})
        page_mobile = context_mobile.new_page()
        page_mobile.goto(BASE_URL)

        # Wait for the specific content to load, avoiding the spinner
        page_mobile.wait_for_selector("text=Sua História")

        # Additional wait to ensure all cards and images are rendered
        page_mobile.wait_for_timeout(1000)

        page_mobile.screenshot(path="verification/journey_mobile.png", full_page=True)
        print("Screenshot saved to verification/journey_mobile.png")
        context_mobile.close()

        browser.close()

if __name__ == "__main__":
    verify_journey_ui()
