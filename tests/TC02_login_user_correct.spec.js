const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL } = require('../utils');
const { checkCloudflare } = require('../utils');

test('TC02 - Login with valid credentials', async ({ page }) => {
  await page.goto(baseURL);
  
  // Cloudflare check - must be at start of test
  const cfResult = await checkCloudflare(page);
  if (cfResult.blocked) {
    console.log(`\n⚠️  [TC02 - Login with valid credentials] TESTE PULADO: Bloqueado pelo CloudFlare (WAF)`);
    console.log(`   Motivo: ${cfResult.reason}`);
    console.log(`   IP do GitHub Actions bloqueado pelo CloudFlare WAF.`);
    console.log(`   Teste roda normalmente em ambiente local.\n`);
    test.skip(true, `Bloqueado pelo CloudFlare WAF: ${cfResult.reason}`);
  }
  
  const user = getTestUser();
  const loginHelper = new LoginHelper(page);
  await page.click('a[href="/login"]');
  await loginHelper.login(user.email, user.password);
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
});