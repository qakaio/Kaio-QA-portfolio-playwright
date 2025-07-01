const { test, expect } = require('@playwright/test');

test('TC03 - Login with invalid credentials', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', 'wrong@email.com');
  await page.fill('input[data-qa="login-password"]', 'wrongpass');
  await page.click('button[data-qa="login-button"]');
  await expect(page.locator('p:has-text("incorrect")')).toBeVisible();
});