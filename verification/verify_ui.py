from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Desktop
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto("http://localhost:5173")
        page.wait_for_selector("text=Sua História", timeout=15000)
        page.wait_for_timeout(2000) # Wait for animations
        page.screenshot(path="verification_timeline_desktop.png")
        print("Desktop screenshot taken.")

        # Mobile
        page_mobile = browser.new_page(viewport={"width": 375, "height": 667})
        page_mobile.goto("http://localhost:5173")
        page_mobile.wait_for_selector("text=Sua História", timeout=15000)
        page_mobile.wait_for_timeout(2000)

        # Check scroll
        page_mobile.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page_mobile.wait_for_timeout(1000)
        page_mobile.screenshot(path="verification_timeline_mobile.png")
        print("Mobile screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_ui()
