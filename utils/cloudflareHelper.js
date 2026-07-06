// utils/cloudflareHelper.js
// Helper para detectar e lidar com bloqueio do Cloudflare no CI/CD

const CLOUDFLARE_INDICATORS = [
  'Access denied',
  'Checking your browser',
  'Just a moment',
  'Cloudflare Ray ID',
  'cf-browser-verification',
  'challenge-platform',
  'cf-mitigated',
  'Attention Required! | Cloudflare',
];

/**
 * Verifica se a página atual foi bloqueada pelo Cloudflare
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<boolean>}
 */
async function isCloudflareBlocked(page) {
  try {
    // Verifica indicadores visuais
    for (const indicator of CLOUDFLARE_INDICATORS) {
      const isVisible = await page.locator(`text=${indicator}`).first().isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) return true;
    }

    // Verifica status code 403/503 via resposta de navegação
    const response = await page.mainFrame().waitForNavigation({ timeout: 5000 }).catch(() => null);
    if (response && [403, 503].includes(response.status())) {
      return true;
    }

    // Verifica title da página
    const title = await page.title().catch(() => '');
    if (title.includes('Cloudflare') || title.includes('Access denied') || title.includes('Just a moment')) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Skip do teste com mensagem explicativa se Cloudflare bloquear
 * @param {import('@playwright/test').Page} page
 * @param {string} testName - Nome do teste para log
 */
async function skipIfCloudflareBlocked(page, testName) {
  const isBlocked = await isCloudflareBlocked(page);
  
  if (isBlocked) {
    console.log(`\n⚠️  [${testName}] TESTE PULADO: Bloqueado pelo CloudFlare (WAF)`);
    console.log(`   IP do GitHub Actions bloqueado pelo CloudFlare WAF.`);
    console.log(`   Teste roda normalmente em ambiente local.\n`);
    // Usa test.skip() do Playwright - marca como "skipped" no relatório
    throw { name: 'PlaywrightSkip', message: 'Bloqueado pelo CloudFlare WAF - IP do GitHub Actions bloqueado' };
  }
}

module.exports = { isCloudflareBlocked, skipIfCloudflareBlocked, CLOUDFLARE_INDICATORS };