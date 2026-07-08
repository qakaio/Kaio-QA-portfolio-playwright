const { test, expect } = require('@playwright/test');
const { checkCloudflareWithRetry } = require('../utils/cloudflareHelper');

const BASE_URL = 'https://automationexercise.com';

/**
 * Decision matrix: When to skip vs when to fail
 * - SKIP: Public site with WAF (Cloudflare, Akamai, etc.) - CI runners blocked
 * - FAIL: Internal staging/production - WAF bypass configured or internal access
 * - FAIL: Critical smoke test that MUST run (configure via env)
 */
const SHOULD_SKIP_ON_CLOUDFLARE = process.env.CI_SKIP_CLOUDFLARE !== 'false';
const IS_CRITICAL_SMOKE = process.env.CRITICAL_SMOKE === 'true';

async function gotoAndCheck(page, path, testName) {
  const response = await page.goto(`${BASE_URL}${path}`, { 
    waitUntil: 'domcontentloaded',
    timeout: 60000 
  });
  
  // Check response status first
  if (response && [403, 503].includes(response.status())) {
    return { blocked: true, reason: `HTTP Status ${response.status()}` };
  }
  
  // Check for Cloudflare with retry (challenge may appear after initial load)
  const cfResult = await checkCloudflareWithRetry(page, 3, 2000);
  if (cfResult.blocked) {
    return { blocked: true, reason: cfResult.reason };
  }
  
  return { blocked: false, reason: '' };
}

test.describe('CI Smoke Tests - automationexercise.com', () => {
  test('GET / returns HTML content', async ({ page }) => {
    const result = await gotoAndCheck(page, '/', 'Home page');
    if (result.blocked) {
      console.log(`⚠️ [Home page] SKIPPED: ${result.reason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${result.reason}`);
      }
    }
    await expect(page.locator('html')).toContainText('Home', { timeout: 10000 });
  });

  test('GET /products returns products page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/products', 'Products page');
    if (result.blocked) {
      console.log(`⚠️ [Products page] SKIPPED: ${result.reason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${result.reason}`);
      }
    }
    await expect(page.locator('.features_items')).toBeVisible({ timeout: 10000 });
  });

  test('GET /login returns login page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/login', 'Login page');
    if (result.blocked) {
      console.log(`⚠️ [Login page] SKIPPED: ${result.reason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${result.reason}`);
      }
    }
    await expect(page.locator('input[data-qa="login-email"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /signup returns signup page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/signup', 'Signup page');
    if (result.blocked) {
      console.log(`⚠️ [Signup page] SKIPPED: ${result.reason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${result.reason}`);
      }
    }
    await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /contact_us returns contact page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/contact_us', 'Contact page');
    if (result.blocked) {
      console.log(`⚠️ [Contact page] SKIPPED: ${result.reason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${result.reason}`);
      }
    }
    await expect(page.locator('input[data-qa="name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /test_cases returns test cases page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/test_cases', 'Test cases page');
    if (result.blocked) {
      console.log(`⚠️ [Test cases page] SKIPPED: ${result.reason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${result.reason}`);
      }
    }
    await expect(page.locator('body')).toContainText('Test Cases', { timeout: 10000 });
  });
});