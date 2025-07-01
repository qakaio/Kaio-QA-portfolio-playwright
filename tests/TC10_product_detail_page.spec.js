const { test, expect } = require('@playwright/test');

test('TC10 - Product detail page', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');
  await page.click('a[href="/product_details/1"]');
  await expect(page.locator('.product-information')).toBeVisible();
});