const { test, expect } = require('@playwright/test');

test('TC09 - Search product by name', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');
  await page.locator('#search_product').type('Tshirt');
  await page.locator('#submit_search').scrollIntoViewIfNeeded();
  await page.locator('#submit_search').click();
  await page.waitForSelector('.features_items');
  const count = await page.locator('.productinfo').count();
  expect(count).toBeGreaterThan(0);
});