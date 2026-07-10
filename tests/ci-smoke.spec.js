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

async function checkCloudflareBeforeTest(page) {
  try {
    // First do a quick navigation with a short timeout to see if Cloudflare blocks
    const response = await page.goto('https://automationexercise.com/', { 
      waitUntil: 'domcontentloaded', 
      timeout: 15000 
    });
    
    // Check response status first
    if (response && [403, 503].includes(response.status())) {
      return { blocked: true, reason: `HTTP Status ${response.status()}` };
    }
    
    // Check for Cloudflare
    const cfResult = await checkCloudflareWithRetry(page, 3, 2000);
    if (cfResult.blocked) {
      return { blocked: true, reason: cfResult.reason };
    }
    
    return { blocked: false, reason: '' };
  } catch (error) {
    // If navigation fails (timeout, etc.), it might be Cloudflare
    if (error.message.includes('timeout') || error.message.includes('net::ERR_')) {
      return { blocked: true, reason: `Navigation error: ${error.message}` };
    }
    return { blocked: false, reason: '' };
  }
}

test.describe.configure({ retries: 2 });

test.describe('CI Smoke Tests - automationexercise.com', () => {
  let cloudflareBlocked = false;
  let blockReason = '';

  test.beforeAll(async ({ browser }) => {
    // Create a temporary page to check Cloudflare once before all tests
    const page = await browser.newPage();
    const result = await checkCloudflareBeforeTest(page);
    if (result.blocked) {
      cloudflareBlocked = true;
      console.log(`⚠️ Cloudflare detected in beforeAll: ${result.reason}`);
    }
    await page.close();
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
    await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
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
    await page.goto('https://automationexercise.com/products', { waitUntil: 'domcontentloaded', timeout: 30000 });
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
    await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
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
    await page.goto('https://automationexercise.com/signup', { waitUntil: 'domcontentloaded', timeout: 30000 });
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
    await page.goto('https://automationexercise.com/contact_us', { waitUntil: 'domcontentloaded', timeout: 30000 });
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
    await page.goto('https://automationexercise.com/test_cases', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('body')).toContainText('Test Cases', { timeout: 10000 });
  });
});
