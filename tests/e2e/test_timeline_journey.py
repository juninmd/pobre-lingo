import os
import re
import pytest
from urllib.parse import urlparse
from playwright.sync_api import Page, expect

BASE_URL = os.environ.get("BASE_URL", "http://localhost:5173")

def test_timeline_journey_render(page: Page):
    """
    Verifies the Dashboard renders correctly with the 'Journey Book' timeline.
    Checks for the main header and at least one chapter header.
    """
    page.goto(BASE_URL)

    # Verify the "Journey Book" header
    expect(page.get_by_role("heading", name="Sua História")).to_be_visible(timeout=15000)

    # Verify the subtitle
    expect(page.get_by_text("Cada lição é uma página virada")).to_be_visible()

    # Verify that at least one Chapter Header is visible with the new animation and testid
    chapter_header = page.get_by_test_id("chapter-header").first
    expect(chapter_header).to_be_visible()

    # Verify the Unit Title is present (e.g. Unidade 1)
    expect(page.get_by_role("heading", name="Unidade 1", exact=True)).to_be_visible()

    # Check for the animation class to ensure 'Polish' was applied
    expect(chapter_header).to_have_class(re.compile(r"animate-in"))

def test_bookmark_auto_scroll(page: Page):
    """
    Verifies that the 'Bookmark' feature works:
    Upon loading the dashboard, the page should auto-scroll to the active lesson.
    """
    page.goto(BASE_URL)

    # The active lesson card is marked with data-testid="active-lesson-card"
    active_card = page.get_by_test_id("active-lesson-card")

    # Wait for the card to be attached to the DOM
    expect(active_card).to_be_attached(timeout=10000)

    # The auto-scroll has a 600ms delay + smooth scroll time.
    # We wait a bit to ensure scrolling has started/finished.
    page.wait_for_timeout(2000)

    # Verify it is in the viewport.
    # Note: 'toBeInViewport' checks if the element intersects with the viewport.
    expect(active_card).to_be_in_viewport()

    # Verify the "AGORA" bookmark indicator is visible near it
    # The "AGORA" text is absolutely positioned relative to the card wrapper's parent
    # We can just check if "AGORA" is visible on the page (it says "AQUI" now based on latest code)
    # Checking for "Aqui" case-insensitively or exactly as implemented ("Aqui")
    expect(page.get_by_text("Aqui", exact=True)).to_be_visible()

def test_navigation_responsive(page: Page):
    """
    Verifies that:
    - Sidebar is visible on Desktop (1280px+), MobileNav is hidden.
    - Sidebar is hidden on Mobile (<1024px), MobileNav is visible.
    """
    page.goto(BASE_URL)

    # --- Desktop View (Large) ---
    page.set_viewport_size({"width": 1280, "height": 800})
    page.wait_for_timeout(1000)

    # Sidebar check: The sidebar container should be visible.
    # SidebarProvider renders a sidebar.
    # We can check for a sidebar-specific element like the "PobreLingo" text in the sidebar header.
    # The desktop sidebar has "Aprenda Grátis" subtitle which is hidden on mobile header.
    expect(page.get_by_text("Aprenda Grátis")).to_be_visible()

    # MobileNav check: The container with lg:hidden should be hidden
    # We look for the MobileNav component. It usually contains the bottom bar links.
    # MobileNav has links like "Início", "Explorar", "Ranking", "Perfil".
    # We can check if the "Início" link inside the bottom nav is visible.
    # However, "Início" might be in the sidebar too.
    # The MobileNav is strictly hidden on lg screens.

    # Strategy: Check the .lg\:hidden container
    mobile_nav_container = page.locator(".lg\\:hidden > nav")
    # If the locator matches nothing visible, that's good.
    expect(mobile_nav_container).not_to_be_visible()

    # --- Mobile View ---
    page.set_viewport_size({"width": 375, "height": 667})
    page.wait_for_timeout(1000)

    # Sidebar check: "Aprenda Grátis" should be hidden (as sidebar collapses or hides)
    expect(page.get_by_text("Aprenda Grátis")).not_to_be_visible()

    # MobileNav check: Should be visible now
    # We can verify the "Início" link is visible in the bottom bar location?
    # Or just check the container again.
    # Note: MobileNav might be directly the .lg:hidden div content
    mobile_nav = page.locator(".lg\\:hidden").first
    expect(mobile_nav).to_be_visible()

def test_timeline_navigation(page: Page):
    """
    Verifies that clicking the active lesson card navigates to the lesson.
    """
    page.goto(BASE_URL)

    # Get the active card
    active_card = page.get_by_test_id("active-lesson-card")
    expect(active_card).to_be_visible(timeout=10000)

    # Get the expected URL from the href attribute
    expected_href = active_card.get_attribute("href")
    assert expected_href is not None, "Active card should have an href"

    # Click the card
    active_card.click()

    # Verify the URL changed to the expected one
    # Note: playwright page.url might include the full domain, while href might be relative.
    # We check if the href is contained in the current URL.
    page.wait_for_url(f"**{expected_href}", timeout=10000)

    # Also verify we are not on the dashboard anymore
    # The dashboard is likely BASE_URL or BASE_URL + "/"
    # We check that the path is not empty or just "/"
    current_path = urlparse(page.url).path
    assert current_path not in ('', '/')
