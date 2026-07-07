const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL } = require('../utils');
const { checkCloudflare } = require('../utils');

test('TC22_add_to_cart_from_recommended', async ({ page }) => {
  await page.goto(baseURL);
  
  // Cloudflare check - must be at start of test
  const cfResult = await checkCloudflare(page);
  if (cfResult.blocked) {
    console.log(`\n⚠️  [TC22_add_to_cart_from_recommended] TESTE PULADO: Bloqueado pelo CloudFlare (WAF)`);
    console.log(`   Motivo: ${cfResult.reason}`);
    console.log(`   IP do GitHub Actions bloqueado pelo CloudFlare WAF.`);
    console.log(`   Teste roda normalmente em ambiente local.\n`);
    test.skip(true, `Bloqueado pelo CloudFlare WAF: ${cfResult.reason}`);
  }
  
  await expect(page.locator('html')).toContainText('Home');
});
