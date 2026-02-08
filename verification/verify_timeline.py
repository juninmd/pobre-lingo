from playwright.sync_api import sync_playwright

def verify_timeline():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop View
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto("http://localhost:5173")

        # Wait for "Sua História"
        page.wait_for_selector("text=Sua História")

        # Take full page screenshot
        page.screenshot(path="verification/timeline_desktop.png", full_page=True)
        print("Desktop screenshot saved.")

        # Mobile View
        page_mobile = browser.new_page(viewport={"width": 375, "height": 667})
        page_mobile.goto("http://localhost:5173")
        page_mobile.wait_for_selector("text=Sua História")

        # Wait a bit for animations
        page_mobile.wait_for_timeout(1000)

        page_mobile.screenshot(path="verification/timeline_mobile.png", full_page=True)
        print("Mobile screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_timeline()
