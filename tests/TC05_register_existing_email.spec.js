const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC05 - Register with existing email', async ({ page }) => {
  await page.goto(baseURL + '/login', { waitUntil: 'domcontentloaded' });
  await page.fill('[data-qa="signup-name"]', 'Kaio');
  await page.fill('[data-qa="signup-email"]', 'kaioqa@test.com');
  await page.click('[data-qa="signup-button"]');
  await expect(page.locator('p:has-text("Email Address already exist")')).toBeVisible();
});