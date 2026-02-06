import re
import os
from playwright.sync_api import Page, expect

# Use environment variable or default to localhost
BASE_URL = os.getenv("BASE_URL", "http://localhost:5173")

def test_timeline_journey_rendering(page: Page):
    """
    Test that the Learning Timeline renders correctly on the Dashboard.
    """
    page.goto(BASE_URL)

    # Check for the main heading "Sua História" from LearningTimeline
    expect(page.get_by_role("heading", name="Sua História")).to_be_visible()

    # Check for the book icon/intro
    expect(page.locator(".lucide-book-open").first).to_be_visible()

    # Check that units and modules are rendered
    # We expect "Capítulo 1" or similar text from ModuleSection
    # Use exact=True to avoid matching "Capítulo 10"
    expect(page.get_by_text("Capítulo 1", exact=True)).to_be_visible()

    # Check for Unit Header (sticky)
    expect(page.get_by_role("heading", name="Unidade 1", exact=True)).to_be_visible()

def test_timeline_bookmark_functionality(page: Page):
    """
    Test that the timeline shows the bookmark/active lesson indicator.
    """
    page.goto(BASE_URL)

    # The active lesson should have the "Começar" badge/button
    start_btn = page.get_by_text("Começar")
    expect(start_btn).to_be_visible()

    # Check it has button-like classes (bg-primary from shadcn button)
    expect(start_btn).to_have_class(re.compile(r"bg-primary"))

    # Verify the bookmark icon is present (it has text "LER" inside)
    # The container has text "LER" centered
    expect(page.get_by_text("LER")).to_be_visible()

    # Verify the bookmark icon itself (from Lucide)
    expect(page.locator(".lucide-bookmark")).to_be_visible()

def test_navigation_from_timeline(page: Page):
    """
    Test clicking a lesson card navigates to the correct route.
    """
    page.goto(BASE_URL)

    # Find the active lesson link (wrapper around the content)
    # The active lesson has "Começar" inside it.
    start_button = page.get_by_text("Começar")
    expect(start_button).to_be_visible()

    # Click it
    # Note: Since the card is wrapped in a Link, clicking the internal div works.
    start_button.click()

    # Should navigate to a lesson page.
    # We expect to leave the root page
    # Handle potentially different trailing slashes
    expect(page).not_to_have_url(re.compile(re.escape(BASE_URL) + r"/?$"))

    current_url = page.url
    # Verify we are on a relevant lesson page (vocabulary, rules, exercises, etc.)
    # The first lesson is 'alphabet-pronunciation' which is type 'vocabulary' -> /vocabulary/...
    assert "lesson=" in current_url or "/vocabulary/" in current_url or "/rules" in current_url

def test_responsiveness_and_layout(page: Page):
    """
    Test sidebar vs mobile nav visibility.
    """
    # 1. Desktop View
    page.set_viewport_size({"width": 1280, "height": 800})
    page.goto(BASE_URL)

    # Sidebar should be visible
    expect(page.get_by_text("Aprenda Grátis")).to_be_visible()

    # MobileNav should be HIDDEN
    # MobileNav is inside a div with lg:hidden.
    # At 1280px, it should be hidden.
    # We can check if the nav element is hidden.
    # MobileNav renders a <nav> inside the fixed div.
    # Sidebar also renders a <nav> (SidebarMenu).

    # Check that the specific mobile nav wrapper is hidden
    # MobileNav wrapper has `fixed bottom-0`
    mobile_nav = page.locator(".fixed.bottom-0.lg\\:hidden")
    expect(mobile_nav).not_to_be_visible()


    # 2. Mobile View
    page.set_viewport_size({"width": 375, "height": 667})

    # Sidebar should be hidden
    expect(page.get_by_text("Aprenda Grátis")).not_to_be_visible()

    # MobileNav should be visible
    expect(mobile_nav).to_be_visible()

def test_header_stats_rendering(page: Page):
    """
    Test that the polished header stats (Coins/Level) are rendered.
    """
    page.goto(BASE_URL)

    # Check for Level text (e.g. "Nível 1")
    expect(page.get_by_title("Nível")).to_be_visible()

    # Check for Coins (e.g. "0" or similar)
    expect(page.get_by_title("PobreCoins")).to_be_visible()
