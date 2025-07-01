const { test, expect } = require('@playwright/test');

test('TC14 - Register while checkout then place order', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');
  await page.click('a[data-product-id="1"]');
  await page.click('u:has-text("View Cart")');
  await page.click('a[class="btn btn-default check_out"]');
  await expect(page.locator('.modal-content')).toContainText('Register / Login account to proceed on checkout.');
});