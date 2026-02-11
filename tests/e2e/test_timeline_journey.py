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
    # This text is prominent in the new LearningTimeline
    expect(page.get_by_text("Sua História")).to_be_visible(timeout=15000)

    # Verify the subtitle or description
    expect(page.get_by_text("Cada lição é uma página virada")).to_be_visible()

def test_timeline_structure(page: Page):
    """
    Verifies that the timeline units and modules are rendered.
    """
    page.goto(BASE_URL)

    # Check for at least one Unit Header (e.g., Unidade 1, Basic, etc.)
    # We look for "Unidade" text which is common in the data
    expect(page.get_by_text("Unidade", exact=False).first).to_be_visible()

    # Check for at least one Module/Chapter
    # The new layout uses "Capítulo" in the module header
    expect(page.get_by_text("Capítulo", exact=False).first).to_be_visible()

def test_bookmark_visibility(page: Page):
    """
    Verifies that the 'Bookmark' indicator is present.
    """
    page.goto(BASE_URL)

    # The "AGORA" text is inside the floating bookmark indicator
    # We wait a bit as it might animate in
    bookmark_label = page.get_by_text("AGORA")

    # It should be visible if there is an active lesson
    # We assume a fresh seed or default state has at least one active lesson
    expect(bookmark_label.first).to_be_visible(timeout=5000)

def test_navigation_responsive(page: Page):
    """
    Verifies that:
    - Sidebar is visible on Desktop, MobileNav is hidden.
    - Sidebar is hidden on Mobile, MobileNav is visible.
    """
    page.goto(BASE_URL)

    # --- Desktop View (Large) ---
    page.set_viewport_size({"width": 1280, "height": 800})
    page.wait_for_timeout(1000)

    # Sidebar should be visible.
    # In Layout.tsx, Sidebar has 'hidden lg:flex'.
    # We can look for the "PobreLingo" brand text inside the sidebar area.
    # The sidebar is typically on the left.

    # We can also check for the absence of the Mobile Nav which is usually at the bottom.
    # MobileNav has 'lg:hidden' class.

    # Check for Sidebar visibility
    # We assume the sidebar contains "Aprenda Grátis" or similar unique text
    sidebar_specific_text = page.get_by_text("Aprenda Grátis")
    expect(sidebar_specific_text).to_be_visible()

    # Check MobileNav hidden
    # MobileNav usually has links like "Perfil" at the bottom
    # We can try to find a nav element that is visible at the bottom.
    # But easier: check if the "Aprender" link (which is in both) is visible in the sidebar vs bottom bar?
    # Actually, Sidebar has "Aprender" too.

    # Let's rely on the container classes if possible, or distinct text.
    # MobileNav has icons.

    # Let's verify that the element with class 'lg:hidden' containing the nav is actually hidden.
    # This is hard to target by class in Playwright without CSS selector.
    mobile_nav_container = page.locator(".lg\\:hidden").locator("nav")
    # If strictly hidden by CSS media query/class, Playwright should report hidden.
    if mobile_nav_container.count() > 0:
        expect(mobile_nav_container.first).not_to_be_visible()


    # --- Mobile View ---
    page.set_viewport_size({"width": 375, "height": 667})
    page.wait_for_timeout(1000)

    # Sidebar text should be hidden
    expect(sidebar_specific_text).not_to_be_visible()

    # MobileNav should be visible
    # We can look for the mobile nav container again
    # Or look for the specific MobileNav layout
    mobile_nav_items = page.locator("nav").get_by_text("Aprender")
    # This might find multiple if sidebar is still in DOM but hidden.
    # But strictly speaking, if sidebar is hidden, only mobile nav 'Aprender' might be interactable?
    # Let's check if there is a visible 'nav' at the bottom.

    # Better: The MobileNav component typically has a specific aria-label or role, or we can check the 'lg:hidden' container is now visible.
    if mobile_nav_container.count() > 0:
        expect(mobile_nav_container.first).to_be_visible()
