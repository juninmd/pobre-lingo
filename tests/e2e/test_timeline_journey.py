import re
from playwright.sync_api import Page, expect

def test_timeline_journey_rendering(page: Page):
    """
    Test that the Learning Timeline renders correctly on the Dashboard.
    """
    page.goto("/")

    # Check for the main heading "Sua Jornada"
    expect(page.get_by_role("heading", name="Sua Jornada")).to_be_visible()

    # Check for the book icon/intro
    expect(page.locator(".lucide-book-open").first).to_be_visible()

    # Check that units and modules are rendered
    # We expect at least one "Capítulo"
    expect(page.get_by_text("Capítulo 1")).to_be_visible()

def test_timeline_bookmark_functionality(page: Page):
    """
    Test that the timeline shows the bookmark/active lesson indicator.
    """
    page.goto("/")

    # Since we are a new user (or state is reset), the first lesson should be active
    # The active lesson has the text "Agora" or the bookmark "Continue Aqui"

    # Check for "Continue Aqui" tooltip/badge (might need hover or just exist in DOM)
    # The code has: <div className="... hidden md:block ...">Continue Aqui</div>
    # So it should be visible on desktop size (default)

    # Verify the bookmark icon is present
    # We used the Bookmark icon from lucide-react, class contains lucide-bookmark
    expect(page.locator(".lucide-bookmark")).to_be_visible()

    # Verify "Agora" badge on the lesson card
    expect(page.get_by_text("Agora")).to_be_visible()

def test_navigation_from_timeline(page: Page):
    """
    Test clicking a lesson card navigates to the correct route.
    """
    page.goto("/")

    # Find the first active lesson card (the one with "Agora")
    # We can click the link inside the active lesson wrapper

    # The first lesson is usually "Alfabeto e Pronúncia" in unit 1
    # Let's find the link for it.
    lesson_link = page.get_by_role("link", name="Alfabeto e Pronúncia")
    expect(lesson_link).to_be_visible()

    lesson_link.click()

    # Should navigate to /vocabulary/foundations/alphabet-pronunciation
    expect(page).to_have_url(re.compile(r".*/vocabulary/foundations/alphabet-pronunciation"))

def test_mobile_responsiveness(page: Page):
    """
    Test that the layout adapts to mobile.
    """
    # Set viewport to mobile size
    page.set_viewport_size({"width": 375, "height": 667})
    page.goto("/")

    # Check that MobileNav is visible
    # MobileNav has links to "Jornada", "Jogos", etc.
    expect(page.get_by_role("link", name="Jornada")).to_be_visible()
    expect(page.get_by_role("link", name="Nível")).to_be_visible()

    # Check that Desktop Sidebar is hidden (NavMenu)
    # The sidebar container has 'hidden lg:flex'
    # We can check if "Minha Jornada" (desktop label) is hidden if it differs from mobile "Jornada"
    # Actually, both have similar labels.
    # MobileNav is fixed bottom.

    # Verify the timeline is still visible
    expect(page.get_by_role("heading", name="Sua Jornada")).to_be_visible()

    # Verify bookmark is hidden on mobile if we set it to hidden md:block
    # In LearningTimeline.tsx: className="... hidden md:block" for the Bookmark Ribbon
    expect(page.locator(".lucide-bookmark")).not_to_be_visible()

    # But "Agora" badge should still be visible
    expect(page.get_by_text("Agora")).to_be_visible()
