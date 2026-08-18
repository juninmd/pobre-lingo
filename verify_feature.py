from playwright.sync_api import sync_playwright
import time

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5173")
        page.evaluate("localStorage.setItem('pobrelingo_onboarded', 'true')")
        page.reload()

        # Wait for page to load
        page.wait_for_selector(".animate-pulse", state="visible", timeout=15000)
        time.sleep(2) # Give it a moment to render animations

        # Take full page screenshot
        page.screenshot(path="/home/jules/verification/timeline_desktop.png", full_page=True)
        print("Screenshot captured to /home/jules/verification/timeline_desktop.png")

        browser.close()

verify()
