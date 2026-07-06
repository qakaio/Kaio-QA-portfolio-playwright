const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC05 - Register with existing email', async ({ page }) => {
  await page.goto(baseURL + '/login', { waitUntil: 'domcontentloaded' });
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.fill('[data-qa="signup-name"]', 'Kaio');
  await page.fill('[data-qa="signup-email"]', 'kaioqa@test.com');
  await page.click('[data-qa="signup-button"]');
  await expect(page.locator('p:has-text("Email Address already exist")')).toBeVisible();
});