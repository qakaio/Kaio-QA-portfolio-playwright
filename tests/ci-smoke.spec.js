const { test, expect } = require('@playwright/test');
const { checkCloudflare } = require('../utils/cloudflareHelper');

const BASE_URL = 'https://automationexercise.com';

async function gotoAndCheck(page, path, testName) {
  const response = await page.goto(`${BASE_URL}${path}`, { 
    waitUntil: 'domcontentloaded',
    timeout: 60000 
  });
  
  // Check response status
  if (response && [403, 503].includes(response.status())) {
    return { blocked: true, reason: `HTTP Status ${response.status()}` };
  }
  
  // Check for Cloudflare
  const cfResult = await checkCloudflare(page);
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
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    await expect(page.locator('html')).toContainText('Home', { timeout: 10000 });
  });

  test('GET /products returns products page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/products', 'Products page');
    if (result.blocked) {
      console.log(`⚠️ [Products page] SKIPPED: ${result.reason}`);
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    await expect(page.locator('.features_items')).toBeVisible({ timeout: 10000 });
  });

  test('GET /login returns login page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/login', 'Login page');
    if (result.blocked) {
      console.log(`⚠️ [Login page] SKIPPED: ${result.reason}`);
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    await expect(page.locator('input[data-qa="login-email"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /signup returns signup page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/signup', 'Signup page');
    if (result.blocked) {
      console.log(`⚠️ [Signup page] SKIPPED: ${result.reason}`);
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /contact_us returns contact page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/contact_us', 'Contact page');
    if (result.blocked) {
      console.log(`⚠️ [Contact page] SKIPPED: ${result.reason}`);
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    await expect(page.locator('input[data-qa="name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /test_cases returns test cases page', async ({ page }) => {
    const result = await gotoAndCheck(page, '/test_cases', 'Test cases page');
    if (result.blocked) {
      console.log(`⚠️ [Test cases page] SKIPPED: ${result.reason}`);
      test.skip(true, `Blocked by CloudFlare: ${result.reason}`);
    }
    await expect(page.locator('body')).toContainText('Test Cases', { timeout: 10000 });
  });
});