const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC01 - Home page is visible', async ({ page }) => {
  // Handle potential Cloudflare challenge
  await page.goto(baseURL + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  
  // Wait for Cloudflare challenge if present
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  
  // Check for Cloudflare challenge
  const challengeSelector = 'text=Checking your browser';
  const hasChallenge = await page.locator(challengeSelector).isVisible({ timeout: 5000 }).catch(() => false);
  
  if (hasChallenge) {
    // Wait for challenge to complete
    await page.waitForFunction(() => !document.body.innerText.includes('Checking your browser'), { timeout: 120000 });
  }
  
  // Verify home page loaded
  await expect(page.locator('html')).toContainText('Home', { timeout: 30000 });
});