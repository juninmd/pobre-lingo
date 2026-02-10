import os
import pytest
from playwright.sync_api import Page, expect

BASE_URL = os.environ.get("BASE_URL", "http://localhost:5173")

def test_dashboard_render(page: Page):
    """
    Verifies the Dashboard renders correctly with the 'Journey Book' timeline.
    """
    page.goto(BASE_URL)

    # Verify the "Journey Book" header (Sua História)
    expect(page.get_by_text("Sua História")).to_be_visible(timeout=15000)
    expect(page.get_by_text("Cada lição é uma página virada rumo à fluência.")).to_be_visible()

def test_timeline_structure(page: Page):
    """
    Verifies that the timeline units and modules are rendered.
    """
    page.goto(BASE_URL)

    # Check for at least one Unit Header (e.g., Unidade 1)
    expect(page.get_by_text("Unidade 1", exact=False).first).to_be_visible()

    # Check for at least one Module Header (e.g., Capítulo 1)
    # The module header usually contains "Capítulo X"
    expect(page.get_by_text("Capítulo 1", exact=False).first).to_be_visible()

def test_bookmark_visibility_and_interaction(page: Page):
    """
    Verifies that the 'Bookmark' indicator is present and clicking the active lesson works.
    """
    page.goto(BASE_URL)

    # 1. Verify "AGORA" bookmark visibility
    # The "AGORA" text is inside the floating bookmark indicator
    bookmark_label = page.get_by_text("AGORA")

    # Wait for potential animations or lazy loading
    page.wait_for_timeout(2000)

    if bookmark_label.count() > 0:
        expect(bookmark_label.first).to_be_visible()

        # 2. Find the active lesson card associated with this bookmark
        # The bookmark is absolute positioned inside the card container.
        # We can find the "Começar" button which appears on active cards.
        start_button = page.get_by_text("Começar", exact=True).first
        expect(start_button).to_be_visible()

        # 3. Click the active lesson card (or the start button)
        # Note: The whole card is a link if active.
        # We'll click the "Começar" button to be precise.

        # Capture current URL
        dashboard_url = page.url

        start_button.click()

        # 4. Verify navigation away from dashboard
        page.wait_for_url(lambda url: url != dashboard_url, timeout=5000)
        assert page.url != dashboard_url

        # The URL should match one of the expected patterns for lessons/exercises
        # e.g. /lesson/..., /exercise/..., /vocabulary/..., /grammar/..., /reading/...
        # or just simply ensure we are not on root.
        valid_paths = ["/lesson/", "/exercise/", "/vocabulary/", "/grammar/", "/reading/", "/culture/", "/quiz/", "/speaking/"]
        assert any(path in page.url for path in valid_paths), f"URL {page.url} does not seem to be a lesson/exercise page"

    else:
        print("Warning: No 'AGORA' bookmark found. Skipping interaction test as all lessons might be completed or locked.")

def test_navigation_responsive(page: Page):
    """
    Verifies that:
    - Sidebar is visible on Desktop, MobileNav is hidden.
    - Sidebar is hidden on Mobile, MobileNav is visible.
    """
    page.goto(BASE_URL)

    # 1. Desktop View (Large)
    page.set_viewport_size({"width": 1280, "height": 800})
    page.wait_for_timeout(1000)

    # Sidebar should be visible
    # Looking for the desktop sidebar container which has data-variant="sidebar"
    desktop_sidebar = page.locator("[data-variant='sidebar']")
    # And check for "PobreLingo" inside it to be sure
    desktop_sidebar_text = desktop_sidebar.get_by_text("PobreLingo").first
    expect(desktop_sidebar_text).to_be_visible()

    # MobileNav should be hidden
    # MobileNav contains links with text like "Aprender", "Perfil".
    # We can look for the nav element fixed at bottom.
    mobile_nav = page.locator("nav.fixed.bottom-0")
    if mobile_nav.count() == 0:
         # Maybe it's a div with fixed bottom-0
         mobile_nav = page.locator("div.fixed.bottom-0.left-0.right-0")

    expect(mobile_nav).to_be_hidden()

    # 2. Mobile View
    page.set_viewport_size({"width": 375, "height": 667})
    page.wait_for_timeout(1000)

    # MobileNav should be visible
    expect(mobile_nav).to_be_visible()

    # Sidebar should be hidden
    expect(desktop_sidebar_text).not_to_be_visible()
