const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL } = require('../utils');

test('TC23 - Verify address details in checkout page', async ({ page }) => {
  await page.goto(baseURL + '/login', { waitUntil: 'domcontentloaded' });
  const user = getTestUser();
  const loginHelper = new LoginHelper(page);
  await loginHelper.login(user.email, user.password);
  await page.goto(baseURL + '/products', { waitUntil: 'domcontentloaded' });
  await page.locator('.product-image-wrapper').first().hover();
  await page.click('a[data-product-id="1"]');
  await expect(page.locator('#cartModal')).toBeVisible();
  await page.click('#cartModal a:has-text("View Cart")');
  await page.waitForSelector('a[class="btn btn-default check_out"]', { timeout: 10000 });
  await page.click('a[class="btn btn-default check_out"]');
  await expect(page.locator('#address_delivery')).toBeVisible();
  await expect(page.locator('#address_invoice')).toBeVisible();
});
