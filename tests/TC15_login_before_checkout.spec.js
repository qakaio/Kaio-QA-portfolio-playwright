const { test, expect } = require('@playwright/test');

test('TC15 - Login before checkout and place order', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login', { waitUntil: 'domcontentloaded' });
  await page.fill('input[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('input[data-qa="login-password"]', 'Password123');
  await page.click('button[data-qa="login-button"]');
  await page.goto('https://www.automationexercise.com/products', { waitUntil: 'domcontentloaded' });
  await page.click('a[href="/product_details/1"]');
  await page.click('button.cart');
  await page.waitForSelector('#cartModal', { state: 'hidden' });
  await page.click('a[href="/view_cart"]');
  await page.click('a[class="btn btn-default check_out"]');
  await expect(page.locator('#address_delivery')).toBeVisible();
});