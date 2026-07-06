const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC26 - Scroll up using arrow button and verify', async ({ page }) => {
  await page.goto(baseURL);
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
  await page.click('#scrollUp');
  await expect(page.locator('body')).toContainText('Full-Fledged');
});