const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC11 - Add product to cart', async ({ page }) => {
  await page.goto(baseURL + '/products');
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.hover('.productinfo.text-center >> nth=0');
  await page.click('a[data-product-id="1"]');
  await page.click('u:has-text("View Cart")');
  await expect(page.locator('.cart_info')).toContainText('Blue Top');
});