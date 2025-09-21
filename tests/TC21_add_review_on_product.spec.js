const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC21 - Add review on product', async ({ page }) => {
  await page.goto(baseURL + '/product_details/1');
  await page.fill('#name', 'Kaio');
  await page.fill('#email', 'kaioqa@test.com');
  await page.fill('#review', 'This is a great product!');
  await page.click('#button-review');
  await expect(page.locator('span:has-text("Thank you for your review.")')).toBeVisible();
});