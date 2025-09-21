const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL } = require('../utils');

test('TC20 - Search product, add to cart, then login', async ({ page }) => {
  await page.goto(baseURL + '/products', { waitUntil: 'domcontentloaded' });
  await page.fill('input[name="search"]', 'Dress');
  await page.click('button[type="button"]');
  await page.click('a[data-product-id="3"]');
  await expect(page.locator('#cartModal a:has-text("View Cart")')).toBeVisible();
  await page.click('#cartModal a:has-text("View Cart")');
  await expect(page.locator('.cart_description').filter({ hasText: 'Sleeveless Dress' })).toBeVisible();
  await page.click('a[href="/login"]');
  const user = getTestUser();
  const loginHelper = new LoginHelper(page);
  await loginHelper.login(user.email, user.password);
  await page.click('a[href="/view_cart"]');
  await expect(page.locator('.cart_description').filter({ hasText: 'Sleeveless Dress' })).toBeVisible();
});