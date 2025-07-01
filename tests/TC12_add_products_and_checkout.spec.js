const { test, expect } = require('@playwright/test');

test('TC12 - Add product and proceed to checkout', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');
  await page.hover('.productinfo.text-center >> nth=0');
  await page.click('a[data-product-id="1"]');
  await page.click('u:has-text("View Cart")');
  await page.click('a[class="btn btn-default check_out"]');
  await expect(page.locator('.modal-content')).toContainText('Register / Login account to proceed on checkout.');

});