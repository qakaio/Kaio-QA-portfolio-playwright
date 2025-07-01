const { test, expect } = require('@playwright/test');

test('TC20 - Search product, add to cart, then login', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');
  await page.fill('input[name="search"]', 'Dress');
  await page.click('button[type="button"]');
  await page.click('a[data-product-id="3"]');
  await expect(page.locator('#cartModal')).toBeVisible();
  await expect(page.locator('#cartModal a:has-text("View Cart")')).toBeVisible();
  await page.click('#cartModal a:has-text("View Cart")');
  await expect(page.locator('.cart_description').filter({ hasText: 'Sleeveless Dress' })).toBeVisible();
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('input[data-qa="login-password"]', 'Password123');
  await page.click('button[data-qa="login-button"]');
  await page.click('a[href="/view_cart"]');
  await expect(page.locator('.cart_description').filter({ hasText: 'Sleeveless Dress' })).toBeVisible();
});