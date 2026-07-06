const { test, expect } = require('./fixtures');
const { baseURL, skipIfCloudflareBlocked } = require('../utils');

test('TC01 - Home page is visible', async ({ page }) => {
  await page.goto(baseURL + '/', { waitUntil: 'domcontentloaded', timeout: 6000 });
  // Se Cloudflare bloquear, pula o teste com mensagem explicativa
  await test.step('Verifica Cloudflare', async () => {
    const { skipIfCloudflareBlocked } = require('../utils');
    await skipIfCloudflareBlocked(page, 'TC01 - Home page visible');
  });
  
  await expect(page.locator('html')).toContainText('Home', { timeout: 30000 });
});