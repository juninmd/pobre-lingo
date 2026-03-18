import pytest
import re
from playwright.sync_api import Page, expect

def test_listening_exercise_flow(page: Page):
    """
    Test the full flow of a Listening Exercise:
    1. Direct navigation
    2. Answering questions correctly
    3. Seeing the Celebration Modal
    4. Returning to Dashboard
    """
    # Use 'module' and 'lesson' as per routes.ts generation
    page.goto("http://localhost:5173/exercises/listening?module=foundations&lesson=foundations-listening")

    # 2. Check UI elements
    expect(page.get_by_text("Exercício de Escuta")).to_be_visible()

    # 3. Interact with the exercise
    # We mocked the data in listeningExercisesMap['foundations-listening']

    # --- Question 1 ---
    option_1 = page.get_by_text("My name is John.", exact=True)
    option_1.click()

    page.get_by_role("button", name="Verificar").click()
    expect(page.get_by_text("Muito bem!")).to_be_visible()
    page.get_by_role("button", name="Próximo").click()

    # --- Question 2 ---
    option_2 = page.get_by_text("Good morning.", exact=True)
    option_2.click()
    page.get_by_role("button", name="Verificar").click()
    page.get_by_role("button", name="Próximo").click()

    # --- Question 3 ---
    option_3 = page.get_by_text("The book is on the table.", exact=True)
    option_3.click()
    page.get_by_role("button", name="Verificar").click()
    page.get_by_role("button", name="Próximo").click()

    # 4. Expect Celebration Modal
    expect(page.get_by_text("Lição Dominada!")).to_be_visible(timeout=10000)
    expect(page.get_by_text("XP Ganho")).to_be_visible()

    # 5. Click Continue
    page.get_by_role("button", name="CONTINUAR").click()

    # 6. Expect redirect to Dashboard
    # Expect URL to be the root
    expect(page).to_have_url(re.compile(r"^http://localhost:5173/?$"))

def test_dashboard_interaction(page: Page):
    """
    Test interaction with the new Learning Path visual elements.
    """
    page.goto("http://localhost:5173/")

    # With the new "Journey Book" metaphor, there are no "COMEÇAR" popups.
    # We find the active lesson card and click it directly to start the lesson.

    # 1. Verify the chapter header is visible
    chapter_header = page.locator("h3").filter(has_text="Fundamentos do Inglês")
    expect(chapter_header).to_be_visible()

    # 2. Find the active lesson card
    active_card = page.get_by_test_id("active-lesson-card").first
    expect(active_card).to_be_visible()

    # 3. Verify it has the "Começar" text indicator directly on the card
    expect(active_card.get_by_text("Começar", exact=True)).to_be_visible()

    # 4. Click the active card to navigate to the lesson directly
    active_card.click()

    # 5. Should navigate away from root to the lesson URL
    page.wait_for_url(re.compile(r".*/vocabulary/.*"))
    expect(page).not_to_have_url("http://localhost:5173/")
