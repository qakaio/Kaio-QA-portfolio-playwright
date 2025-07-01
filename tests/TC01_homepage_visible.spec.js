const { test, expect } = require('@playwright/test');

test('TC01 - Home page is visible', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  await expect(page.locator('html')).toContainText('Home');
});