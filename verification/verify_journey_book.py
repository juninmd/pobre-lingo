import os
from playwright.sync_api import sync_playwright

def verify_journey_book():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        try:
            print("Navigating to dashboard...")
            page.goto("http://localhost:5173", timeout=30000)
            page.wait_for_timeout(3000) # Wait for animations

            # Take screenshot of the top part (Header + Chapter 1)
            page.screenshot(path="verification/journey_book_dashboard.png")
            print("Screenshot saved to verification/journey_book_dashboard.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    verify_journey_book()
