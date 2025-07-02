const { test, expect } = require('@playwright/test');

test('TC04 - Logout user', async ({ page }) => {
  await page.goto('https://www.automationexercise.com', { waitUntil: 'domcontentloaded' });
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('input[data-qa="login-password"]', 'Password123');
  await page.click('button[data-qa="login-button"]');
  await page.click('a[href="/logout"]');
  await expect(page).toHaveURL(/\/login/);
});