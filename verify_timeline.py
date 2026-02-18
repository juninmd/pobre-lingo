import os
import time
from playwright.sync_api import sync_playwright

def verify_timeline():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Desktop
        print("Verifying Desktop...")
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto("http://localhost:5173")

        # Wait for content
        page.wait_for_selector('h1:has-text("Sua História")')
        time.sleep(3) # Wait for animations/scroll

        # Screenshot Desktop
        page.screenshot(path="verification_timeline_desktop.png")
        print("Desktop screenshot saved.")

        # Mobile
        print("Verifying Mobile...")
        page_mobile = browser.new_page(viewport={"width": 375, "height": 667})
        page_mobile.goto("http://localhost:5173")
        page_mobile.wait_for_selector('h1:has-text("Sua História")')
        time.sleep(3)

        # Screenshot Mobile
        page_mobile.screenshot(path="verification_timeline_mobile.png")
        print("Mobile screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_timeline()
