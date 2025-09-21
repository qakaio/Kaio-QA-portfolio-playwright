const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL } = require('../utils');

test('TC15 - Login before checkout and place order', async ({ page }) => {
  await page.goto(baseURL + '/products', { waitUntil: 'domcontentloaded' });
  await page.click('a[href="/product_details/1"]');
  await page.click('button.cart');
  const addedModal = page.locator('text=Added!');
  await expect(addedModal).toBeVisible();
  const continueBtn = page.getByRole('button', { name: 'Continue Shopping' });
  if (await continueBtn.isVisible()) {
    await continueBtn.click();
    await addedModal.waitFor({ state: 'hidden', timeout: 5000 });
  }
  await page.click('a[href="/view_cart"]');
  await expect(page.locator('tr:has-text("Blue Top")')).toBeVisible();

  await page.goto(baseURL + '/login', { waitUntil: 'domcontentloaded' });
  const user = getTestUser();
  const loginHelper = new LoginHelper(page);
  await loginHelper.login(user.email, user.password);
  await page.click('a[href="/view_cart"]');
  await expect(page.locator('tr:has-text("Blue Top")')).toBeVisible();
});