import os
import pytest
from playwright.sync_api import Page, expect

# Use environment variable or default to localhost
BASE_URL = os.getenv("BASE_URL", "http://localhost:5173")

def test_journey_book_structure(page: Page):
    """
    Verify the basic structure of the Journey Book (LearningTimeline).
    """
    page.goto(BASE_URL)

    # 1. Verify LearningTimeline Container
    # It should have the specific class for the timeline or ID
    # In the code: <div className="w-full min-h-screen pb-32"> (inside LearningTimeline)
    expect(page.locator(".w-full.min-h-screen.pb-32")).to_be_visible()

    # 2. Verify "Sua História" header
    expect(page.get_by_role("heading", name="Sua História")).to_be_visible()

    # 3. Verify Unit Headers (Sticky)
    # Look for "Unidade 1"
    # We use exact=True on the heading role to avoid matching "Unidade 10", "Unidade 11" etc.
    expect(page.get_by_role("heading", name="Unidade 1", exact=True)).to_be_visible()

    # 4. Verify Lesson Cards
    # We expect at least one "Começar" button for the active lesson
    start_button = page.get_by_text("Começar")
    expect(start_button).to_be_visible()

    # 5. Verify Bookmark
    # The bookmark text "LER" should be visible
    expect(page.get_by_text("LER")).to_be_visible()

def test_navigation_unification(page: Page):
    """
    Verify that navigation items are consistent across desktop and mobile.
    """
    page.goto(BASE_URL)

    # Desktop View
    page.set_viewport_size({"width": 1280, "height": 800})

    # Sidebar should verify items: "Jornada", "Arcade", "Regras", "Nível"
    # Note: I need to update navigation.ts first for these to match exactly "Jornada" instead of "Minha Jornada"
    # For now, I'll check for the existence of the links, assuming I will rename them.
    # If the test fails before I rename, that's expected (TDD).

    # I'll check for the *intended* names.
    expect(page.get_by_role("link", name="Jornada")).to_be_visible()

    # Mobile View
    page.set_viewport_size({"width": 375, "height": 667})

    # MobileNav should be visible
    mobile_nav = page.locator(".lg\\:hidden.fixed.bottom-0")
    expect(mobile_nav).to_be_visible()

    # Check for items in Mobile Nav
    expect(mobile_nav.get_by_text("Jornada")).to_be_visible()

def test_header_stats(page: Page):
    """
    Verify the header stats are present and accessible.
    """
    page.goto(BASE_URL)

    # Check for Level and Gems using the title attribute I saw in Layout.tsx
    # <div ... title="Nível">
    expect(page.locator("[title='Nível']")).to_be_visible()
    # <div ... title="PobreCoins">
    expect(page.locator("[title='PobreCoins']")).to_be_visible()
