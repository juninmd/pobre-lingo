import pytest
import re
from playwright.sync_api import Page, expect

def bypass_onboarding(page: Page):
    page.add_init_script("""
        window.localStorage.setItem('pobrelingo_onboarded', 'true');
    """)

def test_timeline_structure(page: Page):
    bypass_onboarding(page)
    page.goto("http://localhost:5173/")
    expect(page.get_by_text("Sua Jornada", exact=True).first).to_be_visible()

def test_timeline_interaction(page: Page):
    bypass_onboarding(page)
    page.goto("http://localhost:5173/")
    lesson_link = page.locator("a").filter(has_text="Alfabeto e Pronúncia")
    expect(lesson_link).to_be_visible()
    lesson_link.click()
    expect(page).to_have_url(re.compile(r"/vocabulary/foundations/alphabet-pronunciation"))

def test_responsive_layout(page: Page):
    bypass_onboarding(page)
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:5173/")

    # We check if Sidebar is visible, which usually has role 'complementary' or tag aside or sidebar class
    expect(page.get_by_role("complementary")).to_be_visible()

    page.set_viewport_size({"width": 375, "height": 667})
    # In mobile, complementary might be hidden. Note that shadcn sidebar uses offcanvas for mobile.
    # It might be in the DOM but hidden. Let's just check that it's hidden or not fully visible if we can't easily do it.
    expect(page.get_by_role("complementary").first).not_to_be_visible()
    expect(page.get_by_text("Sua Jornada", exact=True).first).to_be_visible()
