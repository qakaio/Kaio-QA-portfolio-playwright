const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL } = require('../utils');

test('TC04 - Logout user', async ({ page }) => {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  const user = getTestUser();
  const loginHelper = new LoginHelper(page);
  await page.click('a[href="/login"]');
  await loginHelper.login(user.email, user.password);
  await page.click('a[href="/logout"]');
  await expect(page).toHaveURL(/\/login/);
});