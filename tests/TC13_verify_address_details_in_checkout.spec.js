const { test, expect } = require('@playwright/test');

test('TC13 - Verify address details in checkout after login', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('input[data-qa="login-password"]', 'Password123');
  await page.click('button[data-qa="login-button"]');
  await page.goto('https://www.automationexercise.com/products');
  await page.click('a[data-product-id="1"]');
  await page.click('u:has-text("View Cart")');
  await page.click('a[class="btn btn-default check_out"]');
  await expect(page.locator('#address_delivery')).toBeVisible();
});