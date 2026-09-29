from playwright.sync_api import sync_playwright

def verify_timeline():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        try:
            print("Navigating to home...")
            page.goto("http://localhost:5173", timeout=30000)
            page.evaluate("localStorage.setItem('pobrelingo_onboarded', 'true')")
            page.reload()

            # Wait for key elements
            page.wait_for_selector("text=Sua Jornada", timeout=30000)

            # Screenshot Desktop Top
            print("Taking desktop screenshot...")
            page.screenshot(path="verification_timeline_desktop.png")

            # Mobile View
            print("Taking mobile screenshot...")
            page.set_viewport_size({"width": 375, "height": 667})
            page.wait_for_selector("text=Sua Jornada")
            # Wait a bit for layout
            page.wait_for_timeout(2000)
            page.screenshot(path="verification_timeline_mobile.png")

            print("Verification complete.")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_timeline()
