const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC07 - Test Cases page is accessible', async ({ page }) => {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.click('a[href="/test_cases"]');
  await expect(page).toHaveURL(/test_cases/);
  await expect(page.locator('body')).toContainText('Test Cases');
});