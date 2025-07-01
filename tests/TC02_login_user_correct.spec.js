const { test, expect } = require('@playwright/test');

test('TC02 - Login with valid credentials', async ({ page }) => {
  await page.goto('https://www.automationexercise.com');
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('input[data-qa="login-password"]', 'Password123');
  await page.click('button[data-qa="login-button"]');
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
});