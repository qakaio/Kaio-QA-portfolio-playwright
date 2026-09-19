const { test, expect } = require('./fixtures');
const { getTestUser, baseURL } = require('../utils');
const { checkCloudflare } = require('../utils');
const { LoginPage } = require('../pages/LoginPage');

test('TC02 - Login with valid credentials', async ({ page }) => {
  await page.goto(baseURL);
  
  const cfResult = await checkCloudflare(page);
  if (cfResult.blocked) {
    console.log(`\n⚠️  [TC02 - Login with valid credentials] TESTE PULADO: Bloqueado pelo CloudFlare (WAF)`);
    console.log(`   Motivo: ${cfResult.reason}`);
    console.log(`   IP do GitHub Actions bloqueado pelo CloudFlare WAF.`);
    console.log(`   Teste roda normalmente em ambiente local.\n`);
    test.skip(true, `Bloqueado pelo CloudFlare WAF: ${cfResult.reason}`);
  }
  
  const user = getTestUser();
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await expect(loginPage.loggedInUserLink).toBeVisible();
});