const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC19 - View brand products', async ({ page }) => {
  await page.goto(baseURL + '/products');
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.click('a[href="/brand_products/Polo"]');
  await expect(page.locator('.features_items')).toContainText('Polo');
});