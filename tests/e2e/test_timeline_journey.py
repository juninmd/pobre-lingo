import os
import pytest
from playwright.sync_api import Page, expect

BASE_URL = os.environ.get("BASE_URL", "http://localhost:5173")

def test_dashboard_render(page: Page):
    """
    Verifies the Dashboard renders correctly with the 'Journey Book' timeline.
    """
    page.goto(BASE_URL)

    # Verify the "Journey Book" header
    # LearningTimeline.tsx contains: <h1>Sua História</h1>
    expect(page.get_by_role("heading", name="Sua História")).to_be_visible(timeout=15000)

    # Verify the subtitle
    expect(page.get_by_text("Cada lição é uma página virada")).to_be_visible()

def test_timeline_structure(page: Page):
    """
    Verifies that the timeline units and modules are rendered.
    """
    page.goto(BASE_URL)

    # Check for Unit Header (e.g., Unidade 1)
    # TimelineUnit.tsx: Unidade {unit.order}
    expect(page.get_by_text("Unidade", exact=False).first).to_be_visible()

    # Check for Lesson content (Lesson title or description)
    # TimelineLessonCard.tsx renders lesson.title_pt
    # Since we don't know the exact text from data, we check for common elements or structure
    # We can check for the lesson card class or the 'Começar' button if active
    # or 'Bloqueado' if locked.

    # We expect at least one lesson to be visible
    expect(page.locator(".group\\/card").first).to_be_visible()

def test_bookmark_visibility(page: Page):
    """
    Verifies that the 'Bookmark' indicator is present.
    """
    page.goto(BASE_URL)

    # The "AGORA" text is inside the floating bookmark indicator
    # TimelineLessonCard.tsx: <div ...>AGORA</div>
    # It only appears if isFirstActive is true.
    # On a fresh load, the first lesson should be active.
    bookmark = page.get_by_text("AGORA")
    expect(bookmark).to_be_visible(timeout=5000)

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

    # Sidebar check: Look for "PobreLingo" in the sidebar header
    # The sidebar header has "PobreLingo"
    # The mobile header also has "PobreLingo", so be careful.
    # The desktop sidebar has "Aprenda Grátis"
    expect(page.get_by_text("Aprenda Grátis")).to_be_visible()

    # MobileNav check: The container with lg:hidden should be hidden
    # MobileNav.tsx is wrapped in <div className="lg:hidden ...">
    # We verify that the nav element inside it is not visible
    mobile_nav = page.locator(".lg\\:hidden nav")
    expect(mobile_nav).not_to_be_visible()

    # --- Mobile View ---
    page.set_viewport_size({"width": 375, "height": 667})
    page.wait_for_timeout(1000)

    # Sidebar check: "Aprenda Grátis" should be hidden
    expect(page.get_by_text("Aprenda Grátis")).not_to_be_visible()

    # MobileNav check: Should be visible now
    expect(mobile_nav).to_be_visible()
