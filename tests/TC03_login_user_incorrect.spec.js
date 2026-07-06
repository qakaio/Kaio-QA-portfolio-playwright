const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC03 - Login with invalid credentials', async ({ page }) => {
  await page.goto(baseURL + '/login');
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.fill('input[data-qa="login-email"]', 'wrong@email.com');
  await page.fill('input[data-qa="login-password"]', 'wrongpass');
  await page.click('button[data-qa="login-button"]');
  await expect(page.locator('p:has-text("incorrect")')).toBeVisible();
});