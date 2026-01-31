from playwright.sync_api import sync_playwright

def verify_doctor_scenario():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the specific conversation lesson
        url = "http://localhost:5173/exercises/conversation?module=doctor-module&lesson=doctor-appointment"
        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for content to load
        page.wait_for_timeout(3000)

        # Check for keywords specific to the doctor scenario
        # Based on conversationData.ts
        keywords = ["What seems to be the problem today?", "terrible headache"]
        content = page.content()

        found = False
        for kw in keywords:
            if kw in content:
                found = True
                print(f"SUCCESS: Found keyword '{kw}' - Doctor scenario confirmed.")
                break

        if not found:
            print("FAILURE: Doctor scenario keywords NOT found.")
            print("Text found on page:", page.locator("body").inner_text()[:500])

        browser.close()

if __name__ == "__main__":
    verify_doctor_scenario()
