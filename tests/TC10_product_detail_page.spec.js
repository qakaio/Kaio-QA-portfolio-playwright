const { skipIfCloudflareBlocked } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC10 - Product detail page', async ({ page }) => {
  await page.goto(baseURL + '/products');
  await test.step("Verifica Cloudflare", async () => {
    await skipIfCloudflareBlocked(page, test.info().title);
  });
  await page.click('a[href="/product_details/1"]');
  await expect(page.locator('.product-information')).toBeVisible();
});