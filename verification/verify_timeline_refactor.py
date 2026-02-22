import os
import time
from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:5173")

def verify_timeline_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        print(f"Navigating to {BASE_URL}")
        page.goto(BASE_URL)

        # Wait for the timeline to load
        page.wait_for_selector('[data-testid="chapter-header"]')
        time.sleep(2) # Wait for animations

        # Screenshot 1: Top of the timeline (Desktop)
        print("Taking screenshot: timeline_desktop_top.png")
        page.screenshot(path="verification/timeline_desktop_top.png")

        # Scroll to active lesson (Bookmark)
        active_card = page.get_by_test_id("active-lesson-card")
        if active_card.is_visible():
            active_card.scroll_into_view_if_needed()
            time.sleep(1)
            print("Taking screenshot: timeline_desktop_bookmark.png")
            page.screenshot(path="verification/timeline_desktop_bookmark.png")

        # Mobile View
        print("Switching to Mobile View")
        page.set_viewport_size({"width": 375, "height": 667})
        time.sleep(1)

        # Verify Sidebar Trigger is visible
        # It is a button with an icon (Menu)
        # Using a locator that finds the trigger inside the header
        sidebar_trigger = page.locator("header button").first
        if sidebar_trigger.is_visible():
             print("Sidebar Trigger IS VISIBLE on Mobile.")
        else:
             print("Sidebar Trigger IS NOT VISIBLE on Mobile.")

        # Screenshot 3: Mobile View with Nav
        print("Taking screenshot: timeline_mobile.png")
        page.screenshot(path="verification/timeline_mobile.png")

        browser.close()

if __name__ == "__main__":
    verify_timeline_ui()
