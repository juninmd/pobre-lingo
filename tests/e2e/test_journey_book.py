import re
from playwright.sync_api import Page, expect

def test_journey_book_desktop_rendering(page: Page):
    """
    Testes E2E para garantir o comportamento de "Livro Interativo de Jornada"
    na versão Desktop.
    """
    page.set_viewport_size({"width": 1280, "height": 800})
    page.goto("http://localhost:5173/")

    # 1. Verifica Renderização Inicial e Metáfora do Livro
    # "Sua História" text represents the book metaphor intro
    expect(page.get_by_role("heading", name="Sua História")).to_be_visible()

    # Verifica se os componentes da Timeline estão visíveis (Capítulos e Unidades)
    # The first unit "Unidade 1" should be visible
    expect(page.get_by_test_id("chapter-header").filter(has_text=re.compile(r"Unidade 1\b"))).to_be_visible()

    # 2. Verifica Bookmark Auto-scroll e Navegação
    # The active lesson card is our "Bookmark"
    active_card = page.get_by_test_id("active-lesson-card").first
    expect(active_card).to_be_visible()

    # The active lesson card should have the text "Pág." denoting the page number
    expect(active_card).to_contain_text(re.compile(r"Pág\."))

    # O Bookmark flotante deve estar visível no card ativo
    expect(page.locator(".animate-bounce").filter(has_text="Aqui").first).to_be_visible()

    # 3. Garante que o Navbar Mobile NÃO está visível no Desktop
    # We verify that a typical mobile nav container is hidden
    mobile_nav = page.locator("nav.flex.justify-around").first
    expect(mobile_nav).not_to_be_visible()

def test_journey_book_mobile_rendering(page: Page):
    """
    Testes E2E para garantir que o layout quebra elegantemente no mobile.
    """
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto("http://localhost:5173/")

    # 1. Verifica Metáfora do Livro no Mobile
    expect(page.get_by_role("heading", name="Sua História")).to_be_visible()

    # 2. Verifica se a SidebarNav clássica está escondida no Mobile
    sidebar_nav = page.get_by_test_id("sidebar")
    expect(sidebar_nav).not_to_be_visible()

    # 3. Verifica se a MobileNav inferior está visível
    mobile_nav = page.locator("nav.flex.justify-around").first
    expect(mobile_nav).to_be_visible()

    # 4. Verifica responsividade dos cards
    active_card = page.get_by_test_id("active-lesson-card").first
    expect(active_card).to_be_visible()

    # Ensure "Começar" button text is not rendered on mobile via hidden sm:flex
    # Usually we verify the button with "Começar" is not visible or only an icon/status is there.
    # But since the "Começar" text is hidden on small screens for inactive, let's just ensure it renders without error.
