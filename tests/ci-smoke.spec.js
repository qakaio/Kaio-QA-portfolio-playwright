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

async function checkCloudflare(page) {
  const cfResult = await checkCloudflareWithRetry(page, 3, 2000);
  return cfResult;
}

test.describe.configure({ retries: 2 });

test.describe('CI Smoke Tests - automationexercise.com', () => {
  let cloudflareBlocked = false;
  let blockReason = '';

  test.beforeEach(async ({ page }) => {
    // Navigate to home page first to check Cloudflare
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Check for Cloudflare challenge
    const cfResult = await checkCloudflare(page);
    if (cfResult.blocked) {
      cloudflareBlocked = true;
      blockReason = cfResult.reason;
      console.log(`⚠️ Cloudflare detected: ${blockReason}`);
    }
  });

  test('GET / returns HTML content', async ({ page }) => {
    if (cloudflareBlocked) {
      console.log(`⚠️ [Home page] SKIPPED: ${blockReason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${blockReason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${blockReason}`);
      }
    }
    await expect(page.locator('html')).toContainText('Home', { timeout: 10000 });
  });

  test('GET /products returns products page', async ({ page }) => {
    if (cloudflareBlocked) {
      console.log(`⚠️ [Products page] SKIPPED: ${blockReason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${blockReason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${blockReason}`);
      }
    }
    await page.goto(`${BASE_URL}/products`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('.features_items')).toBeVisible({ timeout: 10000 });
  });

  test('GET /login returns login page', async ({ page }) => {
    if (cloudflareBlocked) {
      console.log(`⚠️ [Login page] SKIPPED: ${blockReason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${blockReason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${blockReason}`);
      }
    }
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('input[data-qa="login-email"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /signup returns signup page', async ({ page }) => {
    if (cloudflareBlocked) {
      console.log(`⚠️ [Signup page] SKIPPED: ${blockReason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${blockReason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${blockReason}`);
      }
    }
    await page.goto(`${BASE_URL}/signup`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /contact_us returns contact page', async ({ page }) => {
    if (cloudflareBlocked) {
      console.log(`⚠️ [Contact page] SKIPPED: ${blockReason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${blockReason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${blockReason}`);
      }
    }
    await page.goto(`${BASE_URL}/contact_us`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('input[data-qa="name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /test_cases returns test cases page', async ({ page }) => {
    if (cloudflareBlocked) {
      console.log(`⚠️ [Test cases page] SKIPPED: ${blockReason}`);
      if (SHOULD_SKIP_ON_CLOUDFLARE && !IS_CRITICAL_SMOKE) {
        test.skip(true, `Blocked by CloudFlare: ${blockReason}`);
      } else {
        throw new Error(`Critical smoke test blocked by CloudFlare: ${blockReason}`);
      }
    }
    await page.goto(`${BASE_URL}/test_cases`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('body')).toContainText('Test Cases', { timeout: 10000 });
  });
});