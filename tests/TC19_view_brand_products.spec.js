const { test, expect } = require('@playwright/test');

test('TC19 - View brand products', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');
  await page.click('a[href="/brand_products/Polo"]');
  await expect(page.locator('.features_items')).toContainText('Polo');
});