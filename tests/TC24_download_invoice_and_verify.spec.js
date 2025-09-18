const { test, expect } = require('@playwright/test');

test('TC24 - Download invoice and verify order', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('input[data-qa="login-password"]', 'Password123');
  await page.click('button[data-qa="login-button"]');

  await page.goto('https://www.automationexercise.com/products');

  const firstProductAddButton = page.locator('.productinfo.text-center >> nth=0 >> a.add-to-cart');
  await firstProductAddButton.click();

  const modal = page.locator('.modal-content');
  await expect(modal).toBeVisible();

  await modal.locator('a:has-text("View Cart")').click();

  await page.click('a.btn.btn-default.check_out');

  await expect(page.locator('h2:has-text("Address Details")')).toBeVisible();
  await expect(page.locator('h2:has-text("Review Your Order")')).toBeVisible();

  await page.fill('textarea[name="message"]', 'Please deliver ASAP');
  await page.click('a:has-text("Place Order")');
  await page.fill('[name="name_on_card"]', 'Kaio Rampz');
  await page.fill('[name="card_number"]', '4111111111111111');
  await page.fill('[name="cvc"]', '123');
  await page.fill('[name="expiry_month"]', '12');
  await page.fill('[name="expiry_year"]', '2026');
  await page.click('#submit');

  await expect(page.locator('p:has-text("Congratulations! Your order has been confirmed!")')).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('a:has-text("Download Invoice")')
  ]);
  const path = await download.path();
  console.log('Invoice downloaded at:', path);
});
