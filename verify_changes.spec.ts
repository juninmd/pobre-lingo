
import { test, expect } from '@playwright/test';

test('verify expanded curriculum, shop, and conversation', async ({ page }) => {
  // 1. Go to Home (Dashboard)
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('networkidle');

  // Verify Curriculum Update (Unit 2 should have "Conversações do Dia a Dia")
  // We look for text that was added
  await expect(page.getByText('Unidade 2: Conversas do Dia a Dia')).toBeVisible();

  // 2. Go to Shop
  await page.goto('http://localhost:5173/shop');
  await page.waitForSelector('text=Loja de Itens');

  // Verify Shop Items
  await expect(page.getByText('Recarregar Vidas')).toBeVisible();
  await expect(page.getByText('Congelar Ofensiva')).toBeVisible();

  // Screenshot Shop
  await page.screenshot({ path: 'shop_page.png' });

  // 3. Go to Conversation Exercise
  // We navigate directly since finding the specific bubble might be tricky without scrolling
  await page.goto('http://localhost:5173/exercises/conversation?module=daily-conversations&lesson=conversation-practice');

  // Verify Conversation UI
  await page.waitForSelector('text=Conversação');
  await expect(page.getByRole('button', { name: /Eu gostaria de um café/i })).toBeVisible();

  // Screenshot Conversation
  await page.screenshot({ path: 'conversation_page.png' });
});
