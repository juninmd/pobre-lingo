from playwright.sync_api import sync_playwright

def verify_timeline_scroll():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate generic mobile
        context = browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()

        try:
            print("Navigating to home (Mobile)...")
            page.goto("http://localhost:5173", timeout=30000)

            page.wait_for_selector("text=Sua Jornada")

            # Check scrollWidth vs clientWidth for main body or timeline container
            scroll_width = page.evaluate("document.documentElement.scrollWidth")
            client_width = page.evaluate("document.documentElement.clientWidth")

            print(f"Scroll Width: {scroll_width}, Client Width: {client_width}")

            if scroll_width > client_width:
                 print("WARNING: Horizontal scroll detected on document level.")
            else:
                 print("PASS: No document horizontal scroll detected.")

            page.screenshot(path="verification_timeline_mobile_scroll_check.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_timeline_scroll()
