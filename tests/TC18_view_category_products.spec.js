const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC18 - View category products', async ({ page }) => {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  await page.click('a[href="#Women"]');
  await page.click('a[href="/category_products/1"]');
  await expect(page.locator('.features_items')).toBeVisible();
});