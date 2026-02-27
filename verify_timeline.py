import os
import time
from playwright.sync_api import sync_playwright

def verify_timeline_visuals():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a desktop viewport to see the full timeline layout
        context = browser.new_context(viewport={"width": 1280, "height": 1200})
        page = context.new_page()

        try:
            print("Navigating to Dashboard...")
            page.goto("http://localhost:5173", timeout=60000)

            # Wait for the timeline to load
            print("Waiting for chapter header...")
            page.wait_for_selector('[data-testid="chapter-header"]', timeout=30000)

            # Wait a bit for animations (opening book, fade-ins) to settle
            time.sleep(2)

            print("Taking desktop screenshot...")
            page.screenshot(path="verification_timeline_desktop.png", full_page=True)

            # --- Mobile Verification ---
            print("Switching to Mobile Viewport...")
            page.set_viewport_size({"width": 390, "height": 844})
            time.sleep(1) # Allow layout to adapt

            print("Taking mobile screenshot...")
            page.screenshot(path="verification_timeline_mobile.png", full_page=True)

            # --- Check Bookmark Scroll ---
            # Reload to trigger auto-scroll again
            print("Reloading to check auto-scroll...")
            page.reload()
            page.wait_for_selector('[data-testid="active-lesson-card"]', timeout=30000)
            time.sleep(2) # Wait for scroll animation

            print("Taking screenshot after auto-scroll...")
            page.screenshot(path="verification_timeline_mobile_scroll_check.png")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_timeline_visuals()
