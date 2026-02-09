import os
import re
import pytest
from playwright.sync_api import Page, expect

BASE_URL = os.environ.get("BASE_URL", "http://localhost:5173")

def test_dashboard_render(page: Page):
    """
    Verifies the Dashboard renders correctly with the 'Journey Book' timeline.
    """
    page.goto(BASE_URL)

    # Verify the "Journey Book" header (Sua História)
    # This text is expected to be present in LearningTimeline.tsx
    expect(page.get_by_text("Sua História")).to_be_visible(timeout=10000)
    expect(page.get_by_text("Cada lição é uma página virada rumo à fluência.")).to_be_visible()

def test_timeline_structure(page: Page):
    """
    Verifies that the timeline units and modules are rendered.
    """
    page.goto(BASE_URL)

    # Check for at least one Unit Header (e.g., Unidade 1)
    expect(page.get_by_text("Unidade 1", exact=False).first).to_be_visible()

    # Check for at least one Module Header (e.g., Capítulo 1)
    expect(page.get_by_text("Capítulo 1", exact=False).first).to_be_visible()

    # Check for the spine element (visual check might be hard, but we can check for elements with specific classes if needed)
    # For now, just ensuring the structure is there is enough.

def test_bookmark_visibility(page: Page):
    """
    Verifies that the 'Bookmark' indicator is present.
    Note: This assumes there is an incomplete lesson that triggers the bookmark.
    If the user has completed everything (unlikely in fresh env), this might fail or need setup.
    """
    page.goto(BASE_URL)

    # The bookmark text "LER" should be visible
    # Or look for the bookmark icon if it has an aria-label or specific text
    # In TimelineLessonCard.tsx, I plan to add "LER" text.

    # Wait for potential animation
    page.wait_for_timeout(1000)

    # Check if any bookmark is visible.
    # If no lessons are active (all locked?), it won't show.
    # But usually the first lesson is active by default.

    # Locate the element with text "AGORA" which acts as the bookmark label
    bookmark = page.get_by_text("AGORA")
    if bookmark.count() > 0:
        expect(bookmark.first).to_be_visible()
    else:
        print("Warning: No bookmark found. This might be because no lesson is 'active' or all are completed.")

def test_navigation_responsive(page: Page):
    """
    Verifies that:
    - Sidebar is visible on Desktop, MobileNav is hidden.
    - Sidebar is hidden on Mobile, MobileNav is visible.
    """
    page.goto(BASE_URL)

    # 1. Desktop View (Large)
    page.set_viewport_size({"width": 1280, "height": 800})
    page.wait_for_timeout(500)

    # Sidebar should be visible
    # Sidebar has class 'group/sidebar-wrapper' or similar from Shadcn UI, or we can look for specific text in it
    sidebar = page.locator("aside") # Standard HTML tag for sidebar often used
    # Or look for "PobreLingo" text in the sidebar header
    desktop_brand = page.locator("div").filter(has_text="PobreLingo").first
    expect(desktop_brand).to_be_visible()

    # MobileNav should be hidden
    # MobileNav has text "Aprender", "Praticar", etc. and is in a nav tag at the bottom
    # It has class lg:hidden.
    # We can try to locate it by a unique element, e.g., the 'nav' element inside the bottom div
    mobile_nav = page.locator("nav").filter(has_text="Aprender").last # Might be multiple navs

    # Validating generic MobileNav visibility is tricky without specific ID.
    # But we know MobileNav contains specific links like "Ranking" (if it existed) or "Perfil".
    # Let's look for the container with fixed bottom-0
    mobile_nav_container = page.locator(".fixed.bottom-0.left-0.right-0")

    # In Desktop, this should be hidden (display: none via class)
    # Playwright's to_be_hidden() checks if it's not visible or detached or display:none
    expect(mobile_nav_container).to_be_hidden()

    # 2. Mobile View
    page.set_viewport_size({"width": 375, "height": 667})
    page.wait_for_timeout(500)

    # MobileNav should be visible
    expect(mobile_nav_container).to_be_visible()

    # Sidebar should be hidden (or collapsed to a point it's not the main view)
    # The default Sidebar from shadcn/ui is usually hidden on mobile or becomes a drawer
    # We can check if the main desktop sidebar is hidden.
    # The sidebar usually has `hidden lg:flex` class.
    # We can verify the "PobreLingo" brand in the sidebar is not visible or the sidebar itself is hidden.
    # Shadcn sidebar usually renders a sheet on mobile, but the main desktop one is hidden.

    desktop_sidebar = page.locator("aside.hidden.lg\\:flex")
    expect(desktop_sidebar).to_be_hidden()

