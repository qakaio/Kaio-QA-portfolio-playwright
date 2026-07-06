const { skipIfCloudflareBlocked } = require('../utils');
const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL } = require('../utils');

test('TC02 - Login with valid credentials', async ({ page }) => {
  await page.goto(baseURL);
  await test.step("Verifica Cloudflare", async () => {
    await skipIfCloudflareBlocked(page, test.info().title);
  });
  const user = getTestUser();
  const loginHelper = new LoginHelper(page);
  await page.click('a[href="/login"]');
  await loginHelper.login(user.email, user.password);
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
});