from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # Use mobile viewport to verify mobile optimization and avoid desktop sidebar interference
    page = browser.new_page(viewport={"width": 390, "height": 844})

    # Determine port
    port = 5174
    url = f"http://localhost:{port}"

    print(f"Navigating to {url}")
    page.goto(url)

    # Wait for dashboard content
    # Look for "Jornada de Domínio do Inglês" or similar
    try:
        page.wait_for_selector("text=Jornada", timeout=10000)
    except:
        print("Timeout waiting for dashboard text. Taking screenshot of error state.")
        page.screenshot(path="/home/jules/verification/error_dashboard.png")
        raise

    # Screenshot Dashboard
    time.sleep(2) # Wait for animations/badges
    page.screenshot(path="/home/jules/verification/dashboard.png")
    print("Dashboard screenshot taken")

    # Test Game Page Back Button
    print("Testing Game Page Back Button...")
    # Go to Matching Pairs
    page.goto(f"{url}/exercises/matching-pairs")

    # Wait for content
    page.wait_for_selector("text=Par de Palavras", timeout=5000)
    page.screenshot(path="/home/jules/verification/game_page.png")

    # Click "Voltar"
    # It might be "Voltar" text in a Link or Button
    back_button = page.get_by_text("Voltar", exact=False).first
    if back_button.is_visible():
        back_button.click()
        print("Clicked Back button")

        # Verify we are back
        page.wait_for_selector("text=Jornada", timeout=5000)
        print("Successfully returned to Dashboard from Game")
    else:
        print("Back button not found!")

    # Test Rule Page Back Button
    print("Testing Rule Page Back Button...")
    # Go to a rule page
    # Need a valid ID. unit-1 has present-simple-intro -> rule: present-simple
    # Rules route: /rules/verbos/present-simple
    page.goto(f"{url}/rules/verbos/present-simple?module=foundations&lesson=present-simple-intro")

    page.wait_for_selector("text=Explicação", timeout=5000)
    page.screenshot(path="/home/jules/verification/rule_page.png")

    # Click "Voltar ao Início" (since isFromCurriculum is true)
    back_button = page.get_by_text("Voltar ao Início", exact=False).first
    if back_button.is_visible():
        back_button.click()
        print("Clicked Back to Home button")

        page.wait_for_selector("text=Jornada", timeout=5000)
        print("Successfully returned to Dashboard from Rule")
    else:
        print("Back to Home button not found!")

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
