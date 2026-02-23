from playwright.sync_api import sync_playwright

def verify_timeline(page):
    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")

    # Take screenshot of the top
    page.screenshot(path="verification/timeline_top.png")

    # Wait for bookmark animation (600ms + scroll)
    page.wait_for_timeout(2000)

    # Find active card
    active_card = page.get_by_test_id("active-lesson-card")
    if active_card.count() > 0:
        active_card.scroll_into_view_if_needed()
        page.wait_for_timeout(500) # Wait for scroll settle
        page.screenshot(path="verification/timeline_active.png")
        print("Active card found and screenshotted.")
    else:
        print("Active card not found.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        verify_timeline(page)
        browser.close()
