import re
from playwright.sync_api import sync_playwright, expect

def test_full_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            page.goto("http://localhost:5173/", timeout=10000)
        except Exception as e:
            print(f"Error connecting: {e}")
            return

        expect(page.get_by_text("Dias Seguidos")).to_be_visible()
        print("Dashboard loaded.")

        # Find the specific game link.
        # Note: We use the href to be sure we are clicking the right thing.
        game_link = page.locator("a[href*='/games/flashcards']").first
        expect(game_link).to_be_visible()
        print("Game link found.")

        # Click and wait for navigation
        game_link.click()
        page.wait_for_url(re.compile(r".*/games/flashcards"))
        print(f"Navigated to: {page.url}")

        # Verify we are NOT on the dashboard anymore
        # "Dias Seguidos" should be gone
        expect(page.get_by_text("Dias Seguidos")).not_to_be_visible()

        # Verify Game Page Content
        # "Flashcards" text in the header. Use exact=True to avoid matching "Desafio: Flashcards" if it were present.
        # But since we verified Dashboard is gone, standard get_by_text should work if we target the right element.
        # Let's look for "Inglês" card label or something specific to the game.
        expect(page.get_by_text("Inglês", exact=True)).to_be_visible()
        expect(page.get_by_text("Toque para virar")).to_be_visible()
        print("Game page verified.")

        # 5. Check for 'Voltar ao Mapa' button
        back_button = page.get_by_text("Voltar ao Mapa")
        expect(back_button).to_be_visible()
        print("'Voltar ao Mapa' button verified.")

        browser.close()
        print("Test completed successfully.")

if __name__ == "__main__":
    test_full_flow()
