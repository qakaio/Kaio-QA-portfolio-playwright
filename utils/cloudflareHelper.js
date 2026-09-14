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
    // 1. Verifica indicadores visuais
    for (const indicator of CLOUDFLARE_INDICATORS) {
      const isVisible = await page.locator(`text=${indicator}`).first().isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        return { blocked: true, reason: `Texto visível: "${indicator}"` };
      }
    }

    // 2. Verifica title da página
    const title = await page.title().catch(() => '');
    if (title.includes('Cloudflare') || title.includes('Access denied') || title.includes('Just a moment')) {
      return { blocked: true, reason: `Title: "${title}"` };
    }

    // 3. Verifica se há challenge do Cloudflare no body
    const bodyText = await page.locator('body').innerText().catch(() => '');
    if (bodyText.includes('Cloudflare') && (bodyText.includes('challenge') || bodyText.includes('Ray ID'))) {
      return { blocked: true, reason: 'Texto do body contém challenge Cloudflare' };
    }

    // 4. Verifica headers de resposta Cloudflare via meta tag
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
 * Verifica Cloudflare com retry para desafios tardios
 * @param {import('@playwright/test').Page} page
 * @param {number} maxRetries - Número máximo de tentativas
 * @param {number} retryDelay - Delay entre tentativas (ms)
 * @returns {Promise<{blocked: boolean, reason: string}>}
 */
async function checkCloudflareWithRetry(page, maxRetries = 3, retryDelay = 2000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const result = await checkCloudflare(page);
    if (result.blocked) {
      return result;
    }
    if (attempt < maxRetries) {
      await page.waitForTimeout(retryDelay);
    }
  }
  return { blocked: false, reason: '' };
}

module.exports = { checkCloudflare, checkCloudflareWithRetry, CLOUDFLARE_INDICATORS };