const { test, expect } = require('@playwright/test');

test('TC15 - Login before checkout and place order', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('input[data-qa="login-password"]', 'Password123');
  await page.click('button[data-qa="login-button"]');
  await page.goto('https://www.automationexercise.com/view_cart');
  await page.click('a[class="btn btn-default check_out"]');
  await expect(page.locator('#address_delivery')).toBeVisible();
});