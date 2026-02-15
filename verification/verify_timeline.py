import os
import time
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:5173"
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

def verify_timeline():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # --- Desktop Verification ---
        context_desktop = browser.new_context(viewport={"width": 1280, "height": 800})
        page_desktop = context_desktop.new_page()
        try:
            print(f"Navigating to {BASE_URL} (Desktop)...")
            page_desktop.goto(BASE_URL)
            page_desktop.wait_for_selector("text=Sua História", timeout=10000)

            # Scroll a bit to show the timeline better
            page_desktop.evaluate("window.scrollBy(0, 100)")
            time.sleep(1) # Wait for animations/scroll

            screenshot_path = os.path.join(OUTPUT_DIR, "verification_timeline_desktop.png")
            page_desktop.screenshot(path=screenshot_path, full_page=True)
            print(f"Desktop screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"Desktop verification failed: {e}")
            page_desktop.screenshot(path=os.path.join(OUTPUT_DIR, "verification_error.png"))

        # --- Mobile Verification ---
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667}, is_mobile=True)
        page_mobile = context_mobile.new_page()
        try:
            print(f"Navigating to {BASE_URL} (Mobile)...")
            page_mobile.goto(BASE_URL)
            page_mobile.wait_for_selector("text=Sua História", timeout=10000)

            # Check for Mobile Nav (should be visible)
            mobile_nav = page_mobile.locator(".lg\\:hidden nav") # Ensure selector matches
            if mobile_nav.is_visible():
                print("Mobile Nav is visible.")
            else:
                print("Mobile Nav NOT visible!")

            screenshot_path = os.path.join(OUTPUT_DIR, "verification_timeline_mobile.png")
            page_mobile.screenshot(path=screenshot_path, full_page=True)
            print(f"Mobile screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"Mobile verification failed: {e}")

        browser.close()

if __name__ == "__main__":
    verify_timeline()
