const { test, expect } = require('@playwright/test');

test('TC05 - Register with existing email', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login', { waitUntil: 'domcontentloaded' });
  await page.fill('[data-qa="signup-name"]', 'Kaio');
  await page.fill('[data-qa="signup-email"]', 'kaioqa@test.com');
  await page.click('[data-qa="signup-button"]');
  await expect(page.locator('p:has-text("Email Address already exist")')).toBeVisible();
});