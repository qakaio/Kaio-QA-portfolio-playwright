const { skipIfCloudflareBlocked } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC03 - Login with invalid credentials', async ({ page }) => {
  await page.goto(baseURL + '/login');
  await test.step("Verifica Cloudflare", async () => {
    await skipIfCloudflareBlocked(page, test.info().title);
  });
  await page.fill('input[data-qa="login-email"]', 'wrong@email.com');
  await page.fill('input[data-qa="login-password"]', 'wrongpass');
  await page.click('button[data-qa="login-button"]');
  await expect(page.locator('p:has-text("incorrect")')).toBeVisible();
});