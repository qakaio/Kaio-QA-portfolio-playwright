const { test, expect } = require('@playwright/test');

test('TC18 - View category products', async ({ page }) => {
  await page.goto('https://www.automationexercise.com');
  await page.click('a[href="#Women"]');
  await page.click('a[href="/category_products/1"]');
  await expect(page.locator('.features_items')).toBeVisible();
});