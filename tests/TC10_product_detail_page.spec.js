const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC10 - Product detail page', async ({ page }) => {
  await page.goto(baseURL + '/products');
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.click('a[href="/product_details/1"]');
  await expect(page.locator('.product-information')).toBeVisible();
});