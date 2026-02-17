from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 1200})

        print("Navigating to dashboard...")
        page.goto("http://localhost:5173")

        print("Waiting for content...")
        # Wait for the main header to ensure hydration
        page.wait_for_selector('h1:has-text("Sua História")', timeout=30000)

        # Scroll a bit to trigger any lazy loading animations
        page.evaluate("window.scrollBy(0, 500)")
        time.sleep(2) # Wait for animations

        print("Taking desktop screenshot...")
        page.screenshot(path="verification/timeline_desktop.png")

        # Mobile view
        print("Switching to mobile...")
        page.set_viewport_size({'width': 375, 'height': 800})
        # Reload to ensure mobile layout logic triggers correctly if it depends on initial load
        page.reload()
        page.wait_for_selector('h1:has-text("Sua História")', timeout=30000)
        time.sleep(2)

        print("Taking mobile screenshot...")
        page.screenshot(path="verification/timeline_mobile.png")

        browser.close()
        print("Done.")

if __name__ == "__main__":
    run()
