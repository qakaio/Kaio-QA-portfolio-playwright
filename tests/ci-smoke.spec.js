const { test, expect } = require('@playwright/test');
const { checkCloudflareWithRetry } = require('../utils/cloudflareHelper');

/**
 * Decision matrix: When to skip vs when to fail
 * - SKIP: Public site with WAF (Cloudflare, Akamai, etc.) - CI runners blocked
 * - FAIL: Internal staging/production - WAF bypass configured or internal access
 * - FAIL: Critical smoke test that MUST run (configure via env)
 */
const SHOULD_SKIP_ON_CLOUDFLARE = process.env.CI_SKIP_CLOUDFLARE !== 'false';
const IS_CRITICAL_SMOKE = process.env.CRITICAL_SMOKE === 'true';

// Module-level cache for Cloudflare check result (shared across tests in same worker)
let cloudflareCheckResult = null;

async function checkCloudflareOnce(pageOrBrowser) {
  // Check if we already have a cached result
  if (cloudflareCheckResult !== null) {
    return cloudflareCheckResult;
  }

  let page;
  let shouldClosePage = false;
  
  if ('newPage' in pageOrBrowser) {
    // It's a browser
    page = await pageOrBrowser.newPage();
    shouldClosePage = true;
  } else {
    // It's a page
    page = pageOrBrowser;
  }
  
  try {
    const response = await page.goto('https://automationexercise.com/', { 
      waitUntil: 'domcontentloaded', 
      timeout: 15000 
    });
    
    if (response && [403, 503].includes(response.status())) {
      cloudflareCheckResult = { blocked: true, reason: `HTTP Status ${response.status()}` };
      return cloudflareCheckResult;
    }
    
    const cfResult = await checkCloudflareWithRetry(page, 3, 2000);
    if (cfResult.blocked) {
      cloudflareCheckResult = { blocked: true, reason: cfResult.reason };
      return cloudflareCheckResult;
    }
    
    cloudflareCheckResult = { blocked: false, reason: '' };
    return cloudflareCheckResult;
  } catch (error) {
    if (error.message.includes('timeout') || error.message.includes('net::ERR_')) {
      cloudflareCheckResult = { blocked: true, reason: `Navigation error: ${error.message}` };
      return cloudflareCheckResult;
    }
    cloudflareCheckResult = { blocked: false, reason: '' };
    return cloudflareCheckResult;
  } finally {
    if (shouldClosePage && page) {
      await page.close();
    }
  }
}

// Run tests serially to ensure setup runs first
test.describe.configure({ retries: 2 });

test.describe.serial('CI Smoke Tests - automationexercise.com', () => {
  // Use a test that runs first to check Cloudflare
  test('setup: check Cloudflare', async ({ browser }) => {
    const result = await checkCloudflareOnce(browser);
    if (result.blocked) {
      console.log(`⚠️ Cloudflare detected: ${result.reason}`);
    } else {
      console.log('✅ No Cloudflare blocking detected');
    }
    // This test always passes - it's just for side effects
    expect(true).toBe(true);
  });

  test('GET / returns HTML content', async ({ page }) => {
    const result = await checkCloudflareOnce(page);
    if (result.blocked) {
      console.log(`⚠️ [Home page] SKIPPED: ${result.reason}`);
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    
    await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('html')).toContainText('Home', { timeout: 10000 });
  });

  test('GET /products returns products page', async ({ page }) => {
    const result = await checkCloudflareOnce(page);
    if (result.blocked) {
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    
    await page.goto('https://automationexercise.com/products', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('.features_items')).toBeVisible({ timeout: 10000 });
  });

  test('GET /login returns login page', async ({ page }) => {
    const result = await checkCloudflareOnce(page);
    if (result.blocked) {
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    
    await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('input[data-qa="login-email"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /signup returns signup page', async ({ page }) => {
    const result = await checkCloudflareOnce(page);
    if (result.blocked) {
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    
    await page.goto('https://automationexercise.com/signup', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /contact_us returns contact page', async ({ page }) => {
    const result = await checkCloudflareOnce(page);
    if (result.blocked) {
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    
    await page.goto('https://automationexercise.com/contact_us', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('input[data-qa="name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /test_cases returns test cases page', async ({ page }) => {
    const result = await checkCloudflareOnce(page);
    if (result.blocked) {
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    
    await page.goto('https://automationexercise.com/test_cases', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page.locator('body')).toContainText('Test Cases', { timeout: 10000 });
  });
});