const { test, expect } = require('@playwright/test');

test('TC08 - All products page is visible', async ({ page }) => {
  await page.goto('https://www.automationexercise.com');
  await page.locator('a[href="/products"]').scrollIntoViewIfNeeded();
  await page.click('a[href="/products"]');
  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('.features_items')).toBeVisible();
});