const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC08 - All products page is visible', async ({ page }) => {
  await page.goto(baseURL);
  await page.locator('a[href="/products"]').scrollIntoViewIfNeeded();
  await page.click('a[href="/products"]');
  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('.features_items')).toBeVisible();
});