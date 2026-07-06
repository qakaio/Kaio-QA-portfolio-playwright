const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC18 - View category products', async ({ page }) => {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.click('a[href="#Women"]');
  await page.click('a[href="/category_products/1"]');
  await expect(page.locator('.features_items')).toBeVisible();
});