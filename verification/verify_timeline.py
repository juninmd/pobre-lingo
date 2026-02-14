from playwright.sync_api import sync_playwright

def verify_timeline():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Desktop View
        page.set_viewport_size({"width": 1280, "height": 800})
        try:
            page.goto("http://localhost:5173")
            page.wait_for_selector(".group\\/card") # Wait for lesson cards
            # Wait a bit for animations
            page.wait_for_timeout(2000)

            page.screenshot(path="verification/timeline_desktop.png", full_page=True)
            print("Desktop screenshot taken.")

            # Mobile View
            page.set_viewport_size({"width": 375, "height": 667})
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/timeline_mobile.png", full_page=True)
            print("Mobile screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_timeline()
