const { test, expect } = require('@playwright/test');

test('TC24 - Download invoice with new user', async ({ page, browserName, context }) => {
  await page.goto('https://www.automationexercise.com/signup');
  const email = `kaioqa+${Date.now()}@test.com`;

  await page.fill('input[data-qa="signup-name"]', 'Kaio QA');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');

  await page.waitForSelector('input[data-qa="password"]', { state: 'visible', timeout: 30000 });
  await page.fill('input[data-qa="password"]', 'Password123');
  await page.fill('input[data-qa="first_name"]', 'Kaio');
  await page.fill('input[data-qa="last_name"]', 'QA');

  const addressInput = page.locator('input[placeholder*="Street address"], input[name="address1"]');
  await addressInput.waitFor({ state: 'visible', timeout: 30000 });
  await addressInput.fill('123 Test Street');

  await page.selectOption('select[data-qa="country"]', { label: 'India' });
  await page.fill('input[data-qa="state"]', 'State');
  await page.fill('input[data-qa="city"]', 'City');
  await page.fill('input[data-qa="zipcode"]', '12345');
  await page.fill('input[data-qa="mobile_number"]', '11999999999');
  await page.click('button[data-qa="create-account"]');

  await page.waitForSelector('text=Account Created!', { timeout: 10000 });

  const continueBtn = await page.$('a[data-qa="continue-button"]');
  if (continueBtn) await continueBtn.click();

  await page.waitForSelector('a[href="/logout"]', { timeout: 30000 });

  await page.goto('https://www.automationexercise.com/products');
  await page.click('a[href="/product_details/1"]');
  await page.click('button.cart');

  await page.waitForSelector('#cartModal', { state: 'visible', timeout: 10000 });
  await page.click('button.close-modal');

  await page.click('a[href="/view_cart"]');
  await page.waitForSelector('text=Blue Top', { timeout: 10000 });

  const checkoutBtn = await page.getByText('Proceed To Checkout', { exact: true });
  await checkoutBtn.waitFor({ state: 'visible', timeout: 30000 });
  await checkoutBtn.click();

  const nameInput = await page.$('input[data-qa="name"]');
  if (nameInput) {
    await page.fill('input[data-qa="name"]', 'Kaio');
    await page.fill('input[data-qa="address"]', '123 Test Street');
    await page.fill('input[data-qa="city"]', 'City');
    await page.fill('input[data-qa="state"]', 'State');
    await page.fill('input[data-qa="zipcode"]', '12345');
    await page.fill('input[data-qa="mobile_number"]', '11999999999');
    await page.click('button[data-qa="pay-button"]');
  } else {
    await page.click('text=Place Order');
  }

  await page.fill('input[name="name_on_card"]', 'Kaio QA');
  await page.fill('input[name="card_number"]', '4111111111111111');
  await page.fill('input[name="cvc"]', '123');
  await page.fill('input[name="expiry_month"]', '12');
  await page.fill('input[name="expiry_year"]', '2028');
  await page.click('button:has-text("Pay and Confirm Order")');

  await page.waitForSelector('text=Congratulations! Your order has been confirmed!', { timeout: 15000 });

  // Captura do link da fatura
  let downloadLink = null;
  for (let i = 0; i < 4; i++) {
    downloadLink = await page.$('a:has-text("Download Invoice")');
    if (downloadLink) break;
    await page.waitForTimeout(5000);
  }
  if (!downloadLink) {
    const content = await page.content();
    console.log('Download Invoice link não encontrado. Conteúdo da página:', content);
    throw new Error('No Download Invoice link found after waiting.');
  }

  if (browserName === 'webkit') {
    // WebKit
    const href = await downloadLink.getAttribute('href');
    const absoluteUrl = new URL(href, page.url()).toString();
    const response = await page.request.get(absoluteUrl);
    const text = await response.text();
    expect(text).toContain('Your total purchase amount is 500');
  } else {
    // Chromium/Firefox
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      downloadLink.click()
    ]);
    const path = await download.path();
    expect(path).toBeTruthy();
  }
});
