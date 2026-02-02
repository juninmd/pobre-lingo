import pytest
import re
from playwright.sync_api import Page, expect

def test_timeline_structure(page: Page):
    """
    Verifies the new LearningTimeline structure renders correctly.
    """
    page.goto("http://localhost:5173/")

    # Check for the main header of the timeline
    expect(page.get_by_text("Sua Jornada")).to_be_visible()

    # Check for Unit Header (sticky)
    # Using a looser locator to match text within the element
    expect(page.locator("body")).to_contain_text("Unidade 1")
    expect(page.locator("body")).to_contain_text("Primeiros Passos")

    # Check for Module (Chapter)
    expect(page.get_by_text("Capítulo 1")).to_be_visible()
    expect(page.get_by_text("Fundamentos do Inglês")).to_be_visible()

    # Check for Lesson (Page)
    # The first lesson is "Alfabeto e Pronúncia"
    expect(page.get_by_text("Alfabeto e Pronúncia")).to_be_visible()

def test_timeline_interaction(page: Page):
    """
    Verifies that clicking an active lesson navigates correctly.
    """
    page.goto("http://localhost:5173/")

    # The first lesson "Alfabeto e Pronúncia" should be active.
    # It acts as a link.
    # We find the link that contains the text.
    lesson_link = page.locator("a").filter(has_text="Alfabeto e Pronúncia")
    expect(lesson_link).to_be_visible()

    # Click it
    lesson_link.click()

    # Should navigate to vocabulary page
    # The URL should contain /vocabulary/foundations/alphabet-pronunciation
    expect(page).to_have_url(re.compile(r"/vocabulary/foundations/alphabet-pronunciation"))

def test_responsive_layout(page: Page):
    """
    Verifies that the layout adapts to mobile/desktop.
    """
    # 1. Desktop View
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:5173/")

    # On Desktop, the Sidebar should be visible.
    # Sidebar contains "Minha Jornada" link.
    # We expect the sidebar to be visible (it has 'hidden lg:flex' class).
    # We can check for a sidebar specific element.
    expect(page.get_by_test_id("sidebar") if False else page.locator("aside")).to_be_visible()

    # 2. Mobile View
    page.set_viewport_size({"width": 375, "height": 667})

    # On Mobile, the Sidebar should be hidden (collapsed/drawer).
    # The "aside" locator usually points to the sidebar.
    expect(page.locator("aside")).not_to_be_visible()

    # The Mobile Nav should be visible at the bottom.
    # It has links like "Jornada", "Jogos".
    # We can check for the text "Jornada" in a navigation context that is not the sidebar.
    # Or simply check that the page content is still visible.
    expect(page.get_by_text("Sua Jornada")).to_be_visible()
