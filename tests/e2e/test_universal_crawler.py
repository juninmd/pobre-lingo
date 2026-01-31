import re
import json
from playwright.sync_api import sync_playwright, expect

def test_crawl_curriculum():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Starting Curriculum Crawler...")

        # 1. Load Dashboard to scrape links
        page.goto("http://localhost:5173/")

        # Wait for the greeting or any stable element
        page.wait_for_selector("text=Vamos aprender algo novo hoje!", timeout=20000)

        # Find all lesson links
        links = page.evaluate("""() => {
            const anchors = Array.from(document.querySelectorAll('a[href*="module="]'));
            return anchors.map(a => a.getAttribute('href'));
        }""")

        print(f"Found {len(links)} lesson links on the dashboard.")

        visited_count = 0
        errors = []

        # Remove duplicates
        unique_links = sorted(list(set(links)))

        for link in unique_links:
            # We skip 'rules' for now if they are modal-based or external, but getLessonLink returns /rules...
            full_url = f"http://localhost:5173{link}"
            print(f"Checking: {link}")

            try:
                page.goto(full_url)

                # Check for common elements
                if "/games/" in link:
                    page.wait_for_selector("button", timeout=5000)
                elif "/exercises/conversation" in link:
                    page.wait_for_selector("text=Conversação", timeout=5000)
                elif "/exercises/" in link:
                    # news-comprehension has h2 or h1
                    page.wait_for_selector("h1, h2, .card", timeout=5000)
                elif "/vocabulary/" in link:
                    page.wait_for_selector("button", timeout=5000)
                elif "/quiz/" in link:
                    page.wait_for_selector("text=Quiz", timeout=5000)
                elif "/rules" in link:
                    # Some rule pages might show "Regras" or title
                    page.wait_for_selector("h1, h2, button", timeout=5000)

                visited_count += 1

            except Exception as e:
                print(f"FAILED: {link} - {e}")
                errors.append(link)

        print(f"Crawler finished. Visited: {visited_count}/{len(unique_links)}")
        if len(errors) > 0:
            print("Errors found in:", errors)
            exit(1)
        else:
            print("All links reachable!")
            exit(0)

if __name__ == "__main__":
    test_crawl_curriculum()
