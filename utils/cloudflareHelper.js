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
 * @returns {Promise<{blocked: boolean, reason: string}>}
 */
async function checkCloudflare(page) {
  try {
    // Verifica indicadores visuais
    for (const indicator of CLOUDFLARE_INDICATORS) {
      const isVisible = await page.locator(`text=${indicator}`).first().isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        return { blocked: true, reason: `Texto visível: "${indicator}"` };
      }
    }

    // Verifica status code 403/503 via resposta de navegação
    const response = await page.mainFrame().waitForNavigation({ timeout: 5000 }).catch(() => null);
    if (response && [403, 503].includes(response.status())) {
      return { blocked: true, reason: `HTTP Status ${response.status()}` };
    }

    // Verifica title da página
    const title = await page.title().catch(() => '');
    if (title.includes('Cloudflare') || title.includes('Access denied') || title.includes('Just a moment')) {
      return { blocked: true, reason: `Title: "${title}"` };
    }

    // Verifica se há challenge do Cloudflare no body
    const bodyText = await page.locator('body').innerText().catch(() => '');
    if (bodyText.includes('Cloudflare') && (bodyText.includes('challenge') || bodyText.includes('Ray ID'))) {
      return { blocked: true, reason: 'Texto do body contém challenge Cloudflare' };
    }

    // Verifica headers de resposta Cloudflare
    const cfRay = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="cf-ray"]');
      return meta ? meta.content : null;
    }).catch(() => null);
    if (cfRay) {
      return { blocked: true, reason: `Cloudflare Ray ID detectado: ${cfRay}` };
    }

    return { blocked: false, reason: '' };
  } catch (error) {
    return { blocked: false, reason: `Erro na verificação: ${error.message}` };
  }
}

/**
 * Verifica Cloudflare e retorna se deve skip
 * O TESTE deve chamar test.skip() se retornar true
 * @param {import('@playwright/test').Page} page
 * @param {string} testName - Nome do teste para log
 * @returns {Promise<{shouldSkip: boolean, reason: string}>}
 */
async function shouldSkipCloudflare(page, testName) {
  const result = await checkCloudflare(page);
  
  if (result.blocked) {
    console.log(`\n⚠️  [${testName}] TESTE PULADO: Bloqueado pelo CloudFlare (WAF)`);
    console.log(`   Motivo: ${result.reason}`);
    console.log(`   IP do GitHub Actions bloqueado pelo CloudFlare WAF.`);
    console.log(`   Teste roda normalmente em ambiente local.\n`);
    return { shouldSkip: true, reason: result.reason };
  }
  return { shouldSkip: false, reason: '' };
}

module.exports = { checkCloudflare, shouldSkipCloudflare, CLOUDFLARE_INDICATORS };