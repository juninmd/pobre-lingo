from playwright.sync_api import sync_playwright, expect
import os

def verify_curriculum_page():
    # Use relative path for portability
    base_dir = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(base_dir, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            # Go to Dashboard first
            page.goto("http://localhost:5173/", timeout=10000)
            print("Dashboard loaded.")

            # Navigate to Curriculum
            page.goto("http://localhost:5173/curriculum", timeout=10000)
            print("Curriculum page loaded.")

            expect(page.get_by_text("Jornada de Aprendizado")).to_be_visible()

            # Take screenshot
            screenshot_path = os.path.join(base_dir, "curriculum_page.png")
            page.screenshot(path=screenshot_path, full_page=True)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"Error: {e}")
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    verify_curriculum_page()
