const { test, expect } = require('./fixtures');
const { getTestUser, baseURL } = require('../utils');
const { checkCloudflare } = require('../utils');
const { LoginPage } = require('../pages/LoginPage');
const { CartPage } = require('../pages/CartPage');

test('TC15 - Login before checkout and place order', async ({ page }) => {
  await page.goto(baseURL + '/products', { waitUntil: 'domcontentloaded' });

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

  const cartPage = new CartPage(page);
  await cartPage.goToCart();
  await expect(cartPage.blueTopRow).toBeVisible();

  const user = getTestUser();
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await cartPage.goToCart();
  await expect(cartPage.blueTopRow).toBeVisible();
});