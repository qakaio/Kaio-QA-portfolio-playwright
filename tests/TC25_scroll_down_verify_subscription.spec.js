const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC25 - Scroll down and verify subscription', async ({ page }) => {
  await page.goto(baseURL + '/', { waitUntil: 'domcontentloaded' });
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();
  await page.click('#scrollUp');
  await expect(page.locator('#slider-carousel .item.active img').first()).toBeVisible();
});
