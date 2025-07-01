const { test, expect } = require('@playwright/test');

test('TC24 - Download invoice after purchase order', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login', { waitUntil: 'domcontentloaded' });
  await page.fill('[data-qa="login-email"]', 'kaioqa@test.com');
  await page.fill('[data-qa="login-password"]', 'Password123');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click('[data-qa="login-button"]'),
  ]);
  await page.goto('https://www.automationexercise.com/products', { waitUntil: 'domcontentloaded' });
  await page.locator('.product-image-wrapper').first().hover();
  await Promise.all([
    page.waitForSelector('#cartModal.show', { state: 'visible', timeout: 10000 }),
    page.click('a[data-product-id="1"]'),
  ]);
  await page.click('#cartModal a:has-text("View Cart")');
  await page.waitForSelector('a[class="btn btn-default check_out"]', { timeout: 10000 });
  await page.click('a[class="btn btn-default check_out"]');
  await page.click('a:has-text("Place Order")');
  await page.fill('[name="name_on_card"]', 'Kaio Rampz');
  await page.fill('[name="card_number"]', '4111111111111111');
  await page.fill('[name="cvc"]', '123');
  await page.fill('[name="expiry_month"]', '12');
  await page.fill('[name="expiry_year"]', '2026');
  await page.click('#submit');
  await expect(page.locator('h2[data-qa="order-placed"]')).toHaveText('Order Placed!');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('a:has-text("Download Invoice")'),
  ]);
  await download.path();
});
