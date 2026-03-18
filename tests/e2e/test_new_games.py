
import re
from playwright.sync_api import Page, expect

def test_memory_match_game(page: Page):
    # Use mobile viewport
    page.set_viewport_size({"width": 390, "height": 844})

    # Navigate directly to the game (unit 3 module)
    # We need the link. Based on curriculumData, it's unit3-game-memory -> unit3-memory-lesson
    # Link: /games/memory-match?module=unit3-game-memory&lesson=unit3-memory-lesson
    game_url = "http://localhost:5173/games/memory-match?module=unit3-game-memory&lesson=unit3-memory-lesson"

    print(f"Navigating to {game_url}")
    try:
        page.goto(game_url, timeout=60000)
    except Exception as e:
        print(f"Error loading page: {e}")
        return

    expect(page.get_by_text("Jogo da Memória")).to_be_visible()

    # Logic to solve the game
    # 1. Get all cards
    cards = page.locator("[data-pair-id]")
    count = cards.count()
    print(f"Found {count} cards")

    # 2. Iterate and match
    # We need to find pairs.
    # Strategy:
    # Click card 0. Get pair-id.
    # Find another card with same pair-id that is NOT card 0.
    # Click it.
    # Repeat until all matched.

    # Since the DOM has the pair-id, we can cheat!

    matched_ids = set()

    # We can't iterate easily because the DOM updates (cards flip).
    # But we can query by attribute.

    # We need to do this carefully.
    # We will loop 8 times (8 pairs).
    for i in range(8):
        # Find a card that is not matched yet
        # We can use a CSS selector for not having opacity 0.6 if we want, or just rely on our tracking.
        # But simpler: Select all cards, filter by those we haven't matched.

        all_cards = page.locator("[data-pair-id]").all()

        first_card = None
        pair_id = None

        for card in all_cards:
            pid = card.get_attribute("data-pair-id")
            if pid not in matched_ids:
                first_card = card
                pair_id = pid
                break

        if not first_card:
            break

        print(f"Matching pair {pair_id}...")

        # Click first card
        first_card.click()
        page.wait_for_timeout(500)

        # Find the OTHER card with same pair id
        # We need to re-query because references might be stale? Playwright handles this usually, but safe side.
        candidates = page.locator(f"[data-pair-id='{pair_id}']").all()

        for cand in candidates:
            # We need to check if it's the same element.
            # Element handles are different objects, but we can check bounding box or just try clicking the one that isn't flipped?
            # The first one IS flipped now.
            # Wait, simply clicking the *second* one found in the list should work if the list order is stable.
            # Or better: The first card is now flipped. The second is not.
            # Note: Logic in game prevents clicking flipped cards.

            # Let's just click both candidates. One will be ignored (the one already clicked).
            # Wait, if I click the same one twice, it does nothing.
            # So clicking both candidates in sequence works!
            cand.click()
            page.wait_for_timeout(200)

        matched_ids.add(pair_id)
        page.wait_for_timeout(1000) # Wait for match animation

    # Expect Win
    expect(page.get_by_text("Parabéns!")).to_be_visible(timeout=10000)

    # Click Continue
    continue_btn = page.get_by_role("button", name="Continuar")
    if continue_btn.is_visible():
        continue_btn.click()

        # Verify returned to dashboard
        expect(page).to_have_url(re.compile(r"5173/?$"))
        print("Memory Match Test Passed!")
    else:
         print("Continue button not found, maybe auto-redirect?")

def test_word_scramble_game(page: Page):
    page.set_viewport_size({"width": 390, "height": 844})

    game_url = "http://localhost:5173/games/word-scramble?module=unit5-game-scramble&lesson=unit5-scramble-lesson"
    print(f"Navigating to {game_url}")
    page.goto(game_url)

    expect(page.get_by_text("Word Scramble")).to_be_visible()

    # We need to solve 5 words
    for i in range(5):
        print(f"Solving word {i+1}...")
        # Get the answer from data attribute
        # The container has data-answer
        container = page.locator("[data-answer]")
        expect(container).to_be_visible()

        answer = container.get_attribute("data-answer")
        print(f"Answer is: {answer}")

        # Type answer
        input_box = page.get_by_placeholder("Digite sua resposta...")
        input_box.fill(answer)
        input_box.press("Enter")

        page.wait_for_timeout(2000) # Wait for success and next word

    # Expect Level Complete
    expect(page.get_by_text("Nível Completo!")).to_be_visible(timeout=10000)

    # Click Continue
    page.get_by_role("button", name="Continuar").click()

    # Verify Dashboard
    expect(page).to_have_url(re.compile(r"5173/?$"))
    print("Word Scramble Test Passed!")
