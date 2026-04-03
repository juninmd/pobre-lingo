import re
import json
from playwright.sync_api import Page, expect

def test_crawl_curriculum(page: Page):
    print("Starting Curriculum Crawler...")

    # 1. Load Dashboard to scrape links
    page.goto("http://localhost:5173/")

    # Wait for the timeline to load
    page.wait_for_selector("text=Cada lição é uma página virada", timeout=20000)

    # Find all lesson links (completed lessons also have links)
    links = page.evaluate("""() => {
        const anchors = Array.from(document.querySelectorAll('a[href*="/"]'));
        // Filter those that match lesson paths
        return anchors.map(a => a.getAttribute('href')).filter(h => h && (h.includes('vocabulary') || h.includes('quiz') || h.includes('exercises') || h.includes('games')));
    }""")

    print(f"Found {len(links)} lesson links on the dashboard.")

    visited_count = 0
    errors = []

    # Remove duplicates
    unique_links = sorted(list(set(links)))

    for link in unique_links:
        # Avoid full protocol if it's already a full URL, but getAttribute usually returns relative or full depending on usage.
        # Assuming Vite returns relative paths starting with /
        if not link.startswith('http'):
            full_url = f"http://localhost:5173{link}"
        else:
            full_url = link

        print(f"Checking: {full_url}")

        try:
            page.goto(full_url)

            # Check for common elements based on route
            if "/games/" in full_url:
                page.wait_for_selector("button", timeout=5000)
            elif "/exercises/conversation" in full_url:
                page.wait_for_selector("text=Conversação", timeout=5000)
            elif "/exercises/" in full_url:
                page.wait_for_selector("h1, h2, .card", timeout=5000)
            elif "/vocabulary/" in full_url:
                    page.wait_for_selector("text=Vocabulário", timeout=5000)
            elif "/quiz/" in full_url:
                page.wait_for_selector("text=Quiz", timeout=5000)

            visited_count += 1

        except Exception as e:
            print(f"FAILED: {full_url} - {e}")
            errors.append(full_url)

    print(f"Crawler finished. Visited: {visited_count}/{len(unique_links)}")

    assert len(errors) == 0, f"Errors found in: {errors}"
