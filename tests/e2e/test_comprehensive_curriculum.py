
from playwright.sync_api import Page, expect
import pytest

# Comprehensive Curriculum Walkthrough

@pytest.fixture(autouse=True)
def setup(page: Page):
    page.goto("http://localhost:5173/")


def test_load_lesson_alphabet_pronunciation_in_foundations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/foundations/alphabet-pronunciation"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_present_simple_intro_in_foundations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=foundations&lesson=present-simple-intro"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_basic_vocabulary_in_foundations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/foundations/basic-vocabulary"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_pronunciation_intro_in_foundations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/foundations/pronunciation-intro"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_basic_pairs_in_foundations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/matching-pairs?module=foundations&lesson=basic-pairs"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_simple_sentences_practice_in_foundations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/sentence-ordering?module=foundations&lesson=simple-sentences-practice"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_foundations_listening_in_foundations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/listening?module=foundations&lesson=foundations-listening"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_foundations_quiz_in_foundations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/quiz/foundations/foundations-quiz"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_ordering_food_sim_in_ordering_food_module(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/conversation?module=ordering-food-module&lesson=ordering-food-sim"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit4_speedmatch_lesson_in_unit4_game_speedmatch(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/speed-match?module=unit4-game-speedmatch&lesson=unit4-speedmatch-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit3_memory_lesson_in_unit3_game_memory(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/memory-match?module=unit3-game-memory&lesson=unit3-memory-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit8_speedmatch_lesson_in_unit8_game_speedmatch(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/speed-match?module=unit8-game-speedmatch&lesson=unit8-speedmatch-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit2_hangman_lesson_in_unit2_game_hangman(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/hangman?module=unit2-game-hangman&lesson=unit2-hangman-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit12_speedmatch_lesson_in_unit12_game_speedmatch(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/speed-match?module=unit12-game-speedmatch&lesson=unit12-speedmatch-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit5_scramble_lesson_in_unit5_game_scramble(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/word-scramble?module=unit5-game-scramble&lesson=unit5-scramble-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit4_sentencerush_lesson_in_unit4_game_sentencerush(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/sentence-rush?module=unit4-game-sentencerush&lesson=unit4-sentencerush-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_foundations_flashcards_lesson_in_foundations_game_module(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/flashcards?module=foundations-game-module&lesson=foundations-flashcards-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_foundations_bubble_lesson_in_foundations_game_bubble(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/bubble-pop?module=foundations-game-bubble&lesson=foundations-bubble-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_tipping_culture_in_culture_tips_basic(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=culture-tips-basic&lesson=tipping-culture"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_politeness_levels_in_culture_tips_basic(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/culture-tips-basic/politeness-levels"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_greetings_introductions_in_daily_conversations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/daily-conversations/greetings-introductions"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_questions_basics_in_daily_conversations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=daily-conversations&lesson=questions-basics"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_conversation_practice_in_daily_conversations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/conversation?module=daily-conversations&lesson=conversation-practice"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_conversations_quiz_in_daily_conversations(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/quiz/daily-conversations/conversations-quiz"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit5_flashcards_lesson_in_unit5_game_flashcards(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/flashcards?module=unit5-game-flashcards&lesson=unit5-flashcards-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit3_wordsearch_lesson_in_unit3_game_wordsearch(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/word-search?module=unit3-game-wordsearch&lesson=unit3-wordsearch-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_past_simple_intro_in_past_present(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=past-present&lesson=past-simple-intro"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_present_continuous_intro_in_past_present(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=past-present&lesson=present-continuous-intro"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_tense_comparison_in_past_present(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=past-present&lesson=tense-comparison"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_tenses_practice_in_past_present(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/find-incorrect-words?module=past-present&lesson=tenses-practice"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_tenses_quiz_in_past_present(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/quiz/past-present/tenses-quiz"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_airport_vocabulary_in_travel_basics(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/travel-basics/airport-vocabulary"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_hotel_checkin_in_travel_basics(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/travel-basics/hotel-checkin"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_directions_in_travel_basics(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/listening?module=travel-basics&lesson=directions"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_travel_etiquette_in_travel_basics(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=travel-basics&lesson=travel-etiquette"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_airport_checkin_sim_in_travel_conversation_module(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/conversation?module=travel-conversation-module&lesson=airport-checkin-sim"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_present_perfect_intro_in_perfect_tenses(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=perfect-tenses&lesson=present-perfect-intro"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_past_perfect_intro_in_perfect_tenses(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=perfect-tenses&lesson=past-perfect-intro"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_perfect_vs_simple_in_perfect_tenses(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=perfect-tenses&lesson=perfect-vs-simple"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_perfect_tenses_practice_in_perfect_tenses(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/sentence-identification?module=perfect-tenses&lesson=perfect-tenses-practice"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_perfect_reading_in_perfect_tenses(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=perfect-tenses&lesson=perfect-reading"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_zero_first_conditional_in_conditionals(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=conditionals&lesson=zero-first-conditional"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_second_conditional_in_conditionals(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=conditionals&lesson=second-conditional"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_third_conditional_in_conditionals(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=conditionals&lesson=third-conditional"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_conditionals_practice_in_conditionals(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/find-incorrect-words?module=conditionals&lesson=conditionals-practice"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit6_wordsearch_lesson_in_unit6_game_wordsearch(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/word-search?module=unit6-game-wordsearch&lesson=unit6-wordsearch-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_passive_basics_in_passive_voice(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=passive-voice&lesson=passive-basics"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_passive_tenses_in_passive_voice(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=passive-voice&lesson=passive-tenses"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_active_passive_conversion_in_passive_voice(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/sentence-ordering?module=passive-voice&lesson=active-passive-conversion"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_passive_reading_in_passive_voice(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=passive-voice&lesson=passive-reading"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit7_wordsearch_lesson_in_unit7_game_wordsearch(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/word-search?module=unit7-game-wordsearch&lesson=unit7-wordsearch-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_emails_in_business_english(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/business-english/emails"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_meetings_in_business_english(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/listening?module=business-english&lesson=meetings"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_presentations_in_business_english(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=business-english&lesson=presentations"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_presentation_speaking_in_business_english(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/business-english/presentation-speaking"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_job_interview_sim_mid_in_job_interview_module(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/conversation?module=job-interview-module&lesson=job-interview-sim-mid"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_reported_speech_in_advanced_grammar(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=advanced-grammar&lesson=reported-speech"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_modal_verbs_advanced_in_advanced_grammar(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=advanced-grammar&lesson=modal-verbs-advanced"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_relative_clauses_in_advanced_grammar(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=advanced-grammar&lesson=relative-clauses"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_advanced_grammar_practice_in_advanced_grammar(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/find-incorrect-words?module=advanced-grammar&lesson=advanced-grammar-practice"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit8_sentencerush_lesson_in_unit8_game_sentencerush(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/sentence-rush?module=unit8-game-sentencerush&lesson=unit8-sentencerush-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_common_idioms_in_idiomatic_expressions(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/idiomatic-expressions/common-idioms"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_phrasal_verbs_advanced_in_idiomatic_expressions(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/idiomatic-expressions/phrasal-verbs-advanced"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_colloquialisms_in_idiomatic_expressions(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/idiomatic-expressions/colloquialisms"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_idioms_practice_in_idiomatic_expressions(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/sentence-identification?module=idiomatic-expressions&lesson=idioms-practice"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_literary_texts_in_advanced_reading(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=advanced-reading&lesson=literary-texts"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_academic_writing_in_advanced_reading(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=advanced-reading&lesson=academic-writing"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_critical_analysis_in_advanced_reading(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=advanced-reading&lesson=critical-analysis"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_mastery_quiz_in_advanced_reading(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/quiz/advanced-reading/mastery-quiz"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_informal_contractions_lesson_in_native_speech(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=native-speech&lesson=informal-contractions-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_listening_native_speed_in_native_speech(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/listening?module=native-speech&lesson=listening-native-speed"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_unit9_sentencerush_lesson_in_unit9_game_sentencerush(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/sentence-rush?module=unit9-game-sentencerush&lesson=unit9-sentencerush-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_internet_slang_lesson_in_internet_culture(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=internet-culture&lesson=internet-slang-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_social_media_reading_in_internet_culture(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=internet-culture&lesson=social-media-reading"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_internet_bubble_challenge_in_internet_culture(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/games/bubble-pop?module=internet-culture&lesson=internet-bubble-challenge"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_ultimate_challenge_in_internet_culture(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/quiz/internet-culture/ultimate-challenge"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_subjunctive_lesson_in_professional_fluency(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=professional-fluency&lesson=subjunctive-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_inversion_lesson_in_professional_fluency(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=professional-fluency&lesson=inversion-lesson"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_debate_vocabulary_in_professional_fluency(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/professional-fluency/debate-vocabulary"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_fluency_challenge_in_professional_fluency(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/quiz/professional-fluency/fluency-challenge"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_advanced_adjectives_in_nuance_mastery(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/nuance-mastery/advanced-adjectives"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_descriptive_writing_in_nuance_mastery(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=nuance-mastery&lesson=descriptive-writing"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_nuance_quiz_in_nuance_mastery(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/quiz/nuance-mastery/nuance-quiz"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_persuasive_language_in_rhetoric_debate(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/rhetoric-debate/persuasive-language"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_debate_structure_in_rhetoric_debate(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/rules?module=rhetoric-debate&lesson=debate-structure"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_logical_connectors_in_rhetoric_debate(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/sentence-ordering?module=rhetoric-debate&lesson=logical-connectors"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_debate_speaking_in_rhetoric_debate(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/rhetoric-debate/debate-speaking"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_sarcasm_irony_in_cultural_immersion(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=cultural-immersion&lesson=sarcasm-irony"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_complex_idioms_in_cultural_immersion(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/cultural-immersion/complex-idioms"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_cultural_quiz_in_cultural_immersion(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/quiz/cultural-immersion/cultural-quiz"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_c2_vocabulary_in_final_mastery(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/final-mastery/c2-vocabulary"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_master_reading_in_final_mastery(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/news-comprehension?module=final-mastery&lesson=master-reading"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_the_final_boss_in_final_mastery(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/quiz/final-mastery/the-final-boss"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_shadowing_challenge_in_final_mastery(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/final-mastery/shadowing-challenge"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_negotiations_in_business_mastery_module(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/business-mastery-module/negotiations"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_leadership_vocab_in_business_mastery_module(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/vocabulary/business-mastery-module/leadership-vocab"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)

def test_load_lesson_job_interview_sim_in_business_mastery_module(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173/exercises/conversation?module=business-mastery-module&lesson=job-interview-sim"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)
