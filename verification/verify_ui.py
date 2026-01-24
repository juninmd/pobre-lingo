from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use mobile viewport to verify MobileNav and Layout
        context = browser.new_context(viewport={'width': 390, 'height': 844})
        page = context.new_page()

        page.goto("http://localhost:5173/")

        # Wait for the main content
        page.wait_for_timeout(2000)

        # Screenshot 1: Top of Dashboard (Headers + Path)
        page.screenshot(path="verification/dashboard_top.png")

        # Scroll to bottom (Unit 14 - Boss Level)
        # Try to find the last unit title
        try:
            page.locator("text=Unidade 14").scroll_into_view_if_needed()
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/dashboard_boss.png")
        except:
            print("Could not scroll to Unit 14")
            page.screenshot(path="verification/dashboard_error.png")

        browser.close()

if __name__ == "__main__":
    verify_ui()
