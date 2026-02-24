from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop Context
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        try:
            print("Navigating to Dashboard (Desktop)...")
            page.goto("http://localhost:5173")
            page.wait_for_load_state("networkidle")

            # Wait for timeline to be visible
            page.wait_for_selector('h1:has-text("Sua História")')

            # Screenshot Desktop
            print("Taking screenshot...")
            page.screenshot(path="verification_timeline_desktop.png", full_page=True)
            print("Desktop screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            context.close()

        # Mobile Context
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667})
        page_mobile = context_mobile.new_page()

        try:
            print("Navigating to Dashboard (Mobile)...")
            page_mobile.goto("http://localhost:5173")
            page_mobile.wait_for_load_state("networkidle")

            page_mobile.wait_for_selector('h1:has-text("Sua História")')

            # Screenshot Mobile
            print("Taking screenshot...")
            page_mobile.screenshot(path="verification_timeline_mobile.png", full_page=True)
            print("Mobile screenshot saved.")

        except Exception as e:
            print(f"Error mobile: {e}")
        finally:
            context_mobile.close()
            browser.close()

if __name__ == "__main__":
    run()
