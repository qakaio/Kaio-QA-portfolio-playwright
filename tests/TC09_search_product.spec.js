const { skipIfCloudflareBlocked } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC09 - Search product by name', async ({ page }) => {
  await page.goto(baseURL + '/products');
  await test.step("Verifica Cloudflare", async () => {
    await skipIfCloudflareBlocked(page, test.info().title);
  });
  await page.locator('#search_product').type('Tshirt');
  await page.locator('#submit_search').scrollIntoViewIfNeeded();
  await page.locator('#submit_search').click();
  await page.waitForSelector('.features_items');
  const count = await page.locator('.productinfo').count();
  expect(count).toBeGreaterThan(0);
});