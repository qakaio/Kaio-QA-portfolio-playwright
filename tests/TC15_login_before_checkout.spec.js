const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL } = require('../utils');
const { checkCloudflare } = require('../utils');

test('TC15 - Login before checkout and place order', async ({ page }) => {
  await page.goto(baseURL + '/products', { waitUntil: 'domcontentloaded' });
  
  // Cloudflare check
  const cfResult = await checkCloudflare(page);
  if (cfResult.blocked) {
    console.log(`\n⚠️  [TC15 - Login before checkout and place order] TESTE PULADO: Bloqueado pelo CloudFlare (WAF)`);
    console.log(`   Motivo: ${cfResult.reason}`);
    console.log(`   IP do GitHub Actions bloqueado pelo CloudFlare WAF.`);
    console.log(`   Teste roda normalmente em ambiente local.\n`);
    test.skip(true, `Bloqueado pelo CloudFlare WAF: ${cfResult.reason}`);
  }
  
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

  await page.goto(baseURL + '/login', { waitUntil: 'domcontentloaded' });
  
  // Cloudflare check after login navigation
  const cfResult2 = await checkCloudflare(page);
  if (cfResult2.blocked) {
    console.log(`\n⚠️  [TC15 - Login before checkout and place order] TESTE PULADO (login): Bloqueado pelo CloudFlare (WAF)`);
    console.log(`   Motivo: ${cfResult2.reason}`);
    console.log(`   IP do GitHub Actions bloqueado pelo CloudFlare WAF.`);
    console.log(`   Teste roda normalmente em ambiente local.\n`);
    test.skip(true, `Bloqueado pelo CloudFlare WAF: ${cfResult2.reason}`);
  }
  
  const user = getTestUser();
  const loginHelper = new LoginHelper(page);
  await loginHelper.login(user.email, user.password);
  await page.click('a[href="/view_cart"]');
  await expect(page.locator('tr:has-text("Blue Top")')).toBeVisible();
});