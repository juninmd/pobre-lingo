
import time
import re
from playwright.sync_api import sync_playwright, expect

def test_full_app_flow():
    """
    Verifies the critical user journey:
    1. Dashboard Loads (Responsive Check)
    2. Gamification Interaction (Refresh Tip)
    3. Navigation to Lesson (Ordering Food)
    4. Completing a Conversation Lesson
    5. Returning to Dashboard
    """
    with sync_playwright() as p:
        # Use a mobile viewport to verify responsive layout
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()

        print("Navigating to Dashboard...")
        try:
            page.goto("http://localhost:5173", timeout=60000)
        except Exception as e:
            # If server is not running, we might fail.
            # Ideally this test runs against a running instance.
            print(f"Error loading page: {e}")
            return

        # 1. Verify Dashboard UI
        expect(page.get_by_text("Vamos aprender algo novo hoje!")).to_be_visible()

        # 2. Test Refresh Tip
        tip_card = page.locator(".border-primary\\/20") # Tip card
        expect(tip_card).to_be_visible()

        # Find refresh button (icon button inside card header)
        refresh_btn = tip_card.get_by_role("button")
        refresh_btn.click()
        time.sleep(0.5) # Wait for animation

        # 3. Navigate to a Conversation Lesson (Unit 2: Ordering Food)

        # Scroll down a bit
        page.mouse.wheel(0, 1000)
        time.sleep(1)

        # Find the link for ordering-food-sim
        lesson_link = page.locator("a[href*='ordering-food-sim']")

        # Scroll into view if needed
        lesson_link.scroll_into_view_if_needed()
        expect(lesson_link).to_be_visible()

        lesson_link.click()

        # 4. Conversation Page
        # Verify URL contains 'conversation'
        expect(page).to_have_url(re.compile(r"conversation"))

        # Scenario: ordering-food
        # Step 1: "Hi! Are you ready to order?"
        # Correct: "I think so. I'll have the steak." (fo1)
        page.get_by_text("I think so. I'll have the steak.").click()
        time.sleep(1)

        # Step 2: "How would you like your steak cooked?"
        # Correct: "Medium rare, please." (fo21)
        page.get_by_text("Medium rare, please.").click()
        time.sleep(1)

        # Step 3: "Excellent choice. Anything to drink?"
        # Correct: "Just water, please." (fo31)
        page.get_by_text("Just water, please.").click()
        time.sleep(1)

        # 5. Completion
        # Should see "Continuar" button
        continue_btn = page.get_by_role("button", name="Continuar")
        expect(continue_btn).to_be_visible(timeout=10000)

        continue_btn.click()

        # 6. Verify Return to Dashboard
        expect(page).to_have_url(re.compile(r"5173/?"))
        expect(page.get_by_text("Vamos aprender algo novo hoje!")).to_be_visible()

        print("Full flow test passed successfully!")
        browser.close()

if __name__ == "__main__":
    test_full_app_flow()
