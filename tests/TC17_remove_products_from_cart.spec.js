const { test, expect } = require('@playwright/test');

test('TC17 - Remove product from cart', async ({ page }) => {
  await page.goto('https://www.automationexercise.com');
  await page.click('a[href="/products"]');
  await page.click('a[data-product-id="1"]');
  await page.click('u:has-text("View Cart")');
  await page.click('.cart_quantity_delete');
  await expect(page.locator('.cart_info')).not.toContainText('Blue Top');
});