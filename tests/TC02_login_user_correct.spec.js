const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL, shouldSkipCloudflare } = require('../utils');

test('TC02 - Login with valid credentials', async ({ page }) => {
  await page.goto(baseURL);
  
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
  
  const user = getTestUser();
  const loginHelper = new LoginHelper(page);
  await page.click('a[href="/login"]');
  await loginHelper.login(user.email, user.password);
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
});