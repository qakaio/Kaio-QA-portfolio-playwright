const { test, expect } = require('@playwright/test');

test('TC23 - Verify address details in checkout page', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');
  await page.fill('[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('[data-qa="login-password"]', 'Password123');
  await page.click('[data-qa="login-button"]');
  await page.goto('https://www.automationexercise.com/products');
  await page.locator('.product-image-wrapper').first().hover();
  await page.click('a[data-product-id="1"]');
  await expect(page.locator('#cartModal')).toBeVisible();
  await page.click('#cartModal a:has-text("View Cart")');
  await page.waitForSelector('a[class="btn btn-default check_out"]', { timeout: 10000 });
  await page.click('a[class="btn btn-default check_out"]');
  await expect(page.locator('#address_delivery')).toBeVisible();
  await expect(page.locator('#address_invoice')).toBeVisible();
});
