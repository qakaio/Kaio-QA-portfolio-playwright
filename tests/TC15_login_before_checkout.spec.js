const { test, expect } = require('@playwright/test');

test('TC15 - Login before checkout and place order', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products', { waitUntil: 'domcontentloaded' });
  await page.click('a[href="/product_details/1"]');
  await page.click('button.cart');
  const addedModal = page.locator('text=Added!');
  await expect(addedModal).toBeVisible();
  const continueBtn = page.getByRole('button', { name: 'Continue Shopping' });
  if (await continueBtn.isVisible()) {
    await continueBtn.click();
    await addedModal.waitFor({ state: 'hidden', timeout: 5000 });
  }
  await page.click('a[href="/view_cart"]');
  await expect(page.locator('tr:has-text("Blue Top")')).toBeVisible();

  await page.goto('https://www.automationexercise.com/login', { waitUntil: 'domcontentloaded' });
  await page.fill('input[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('input[data-qa="login-password"]', 'Password123');
  await page.click('button[data-qa="login-button"]');
  
  await page.click('a[href="/view_cart"]');
  await expect(page.locator('tr:has-text("Blue Top")')).toBeVisible();
});
