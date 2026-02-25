from playwright.sync_api import sync_playwright, expect

def verify_journey_book():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop View
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        try:
            print("Navigating to Dashboard...")
            page.goto("http://localhost:5173")

            # Wait for "Sua História" to ensure content is loaded
            expect(page.get_by_text("Sua História")).to_be_visible(timeout=10000)

            # Wait a bit for animations
            page.wait_for_timeout(2000)

            # Take screenshot of the top part (Header + Title + First Unit)
            page.screenshot(path="verification/journey_book_desktop.png")
            print("Screenshot saved to verification/journey_book_desktop.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            page.close()

        # Mobile View
        page_mobile = browser.new_page(viewport={"width": 390, "height": 844})
        try:
            print("Navigating to Mobile Dashboard...")
            page_mobile.goto("http://localhost:5173")

            expect(page_mobile.get_by_text("Sua História")).to_be_visible(timeout=10000)
            page_mobile.wait_for_timeout(2000)

            page_mobile.screenshot(path="verification/journey_book_mobile.png")
            print("Screenshot saved to verification/journey_book_mobile.png")

        except Exception as e:
            print(f"Error mobile: {e}")
        finally:
            page_mobile.close()

        browser.close()

if __name__ == "__main__":
    verify_journey_book()
