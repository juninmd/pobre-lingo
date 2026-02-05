import re
from playwright.sync_api import Page, expect

def test_timeline_journey_rendering(page: Page):
    """
    Test that the Learning Timeline renders correctly on the Dashboard.
    """
    page.goto("/")

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
    page.goto("/")

    # The active lesson should have the "Começar" badge/button
    expect(page.get_by_text("Começar")).to_be_visible()

    # Verify the bookmark icon is present (it has text "LER" inside)
    # The container has text "LER" centered
    expect(page.get_by_text("LER")).to_be_visible()

    # Verify the bookmark icon itself (from Lucide)
    expect(page.locator(".lucide-bookmark")).to_be_visible()

def test_navigation_from_timeline(page: Page):
    """
    Test clicking a lesson card navigates to the correct route.
    """
    page.goto("/")

    # Find the active lesson link (wrapper around the content)
    # The active lesson has "Começar" inside it.
    # We can find the link that contains "Começar"

    # In LearningTimeline, the active card is wrapped in a Link if status != locked
    # The status='active' card has a specific class or we can click the "Começar" text

    start_button = page.get_by_text("Começar")
    expect(start_button).to_be_visible()

    # Click it
    start_button.click()

    # Should navigate to a lesson page.
    # Usually /vocabulary/foundations/alphabet-pronunciation or similar
    # We just check we moved away from / (root) or match a lesson pattern
    expect(page).not_to_have_url("http://localhost:3000/") # strict check might depend on base url, but relative check is safer

    # Expect URL to contain 'module=' or be a lesson path like /vocabulary/...
    # The first lesson is usually /vocabulary/foundations/alphabet-pronunciation
    # or /rules?module=...
    # Let's just check it's not the dashboard.

    current_url = page.url
    assert "lesson=" in current_url or "/vocabulary/" in current_url or "/rules" in current_url

def test_responsiveness_and_layout(page: Page):
    """
    Test sidebar vs mobile nav visibility.
    """
    # 1. Desktop View (Default is usually 1280x720 in Playwright, which is > lg:1024)
    page.set_viewport_size({"width": 1280, "height": 800})
    page.goto("/")

    # Sidebar should be visible
    # We can check for "PobreLingo" text in the sidebar header
    expect(page.get_by_text("Aprenda Grátis")).to_be_visible()

    # MobileNav should be HIDDEN
    # MobileNav has a distinctive fixed bottom style.
    # We can look for a link that is only in MobileNav if unique, or check visibility of the container.
    # But since they share links, let's check the container class 'lg:hidden' effectiveness.
    # Easier: MobileNav usually has icons like 'Home', 'Games'.
    # Sidebar has 'PobreLingo'.

    # Let's rely on the fact that MobileNav is strictly <div className="lg:hidden">
    # If we are wide, that div is hidden.

    # 2. Mobile View
    page.set_viewport_size({"width": 375, "height": 667})

    # Sidebar should be hidden (it has hidden lg:flex)
    expect(page.get_by_text("Aprenda Grátis")).not_to_be_visible()

    # MobileNav should be visible
    # Verify the bottom nav exists.
    # We can look for the nav element.
    expect(page.locator("nav").last).to_be_visible()

def test_header_stats_rendering(page: Page):
    """
    Test that the polished header stats (Coins/Level) are rendered.
    """
    page.goto("/")

    # Check for Level text (e.g. "Nível 1")
    expect(page.get_by_title("Nível")).to_be_visible()

    # Check for Coins (e.g. "0" or similar)
    expect(page.get_by_title("PobreCoins")).to_be_visible()
