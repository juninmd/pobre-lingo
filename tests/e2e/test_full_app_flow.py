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

    # Click the module. We target the link containing the text.
    # The new Timeline uses different locators and doesn't wrap the whole module in an anchor tag.
    # Instead, we will look for a module title inside the timeline.
    module_link = page.locator("h3").filter(has_text="Fundamentos do Inglês")

    # Ensure it's visible
    expect(module_link).to_be_visible()

    # Click it. We use force=True to bypass the pointer-events check on the specific point if it hits the label.
    module_link.click(force=True)

    # Expect the Pre-Lesson Modal
    expect(page.get_by_text("COMEÇAR")).to_be_visible()
    expect(page.get_by_text("Fundamentos do Inglês")).to_be_visible()

    # Click Start
    page.get_by_role("button", name="COMEÇAR").click()

    # Should navigate away from root
    expect(page).not_to_have_url("http://localhost:5173/")
