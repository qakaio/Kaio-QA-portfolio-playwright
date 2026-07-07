const { test, expect } = require('@playwright/test');
const { shouldSkipCloudflare } = require('../utils/cloudflareHelper');

const BASE_URL = 'https://automationexercise.com';

async function navigateAndCheck(page, path, testName) {
  try {
    const response = await page.goto(`${BASE_URL}${path}`, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // Check if response indicates Cloudflare
    if (response && [403, 503].includes(response.status())) {
      const skipResult = await shouldSkipCloudflare(page, testName);
      if (skipResult.shouldSkip) {
        test.skip(true, `Blocked by CloudFlare: ${skipResult.reason}`);
      }
    }
  } catch (error) {
    // Navigation failed - check if it's Cloudflare
    const skipResult = await shouldSkipCloudflare(page, testName);
    if (skipResult.shouldSkip) {
      test.skip(true, `Blocked by CloudFlare: ${skipResult.reason}`);
    } else {
      throw error;
    }
  }
  
  // Final check after navigation
  const skipResult = await shouldSkipCloudflare(page, testName);
  if (skipResult.shouldSkip) {
    test.skip(true, `Blocked by CloudFlare: ${skipResult.reason}`);
  }
}

test.describe('CI Smoke Tests - automationexercise.com', () => {
  test('GET / returns HTML content', async ({ page }) => {
    await navigateAndCheck(page, '/', 'Home page');
    await expect(page.locator('html')).toContainText('Home', { timeout: 10000 });
  });

  test('GET /products returns products page', async ({ page }) => {
    await navigateAndCheck(page, '/products', 'Products page');
    await expect(page.locator('.features_items')).toBeVisible({ timeout: 10000 });
  });

  test('GET /login returns login page', async ({ page }) => {
    await navigateAndCheck(page, '/login', 'Login page');
    await expect(page.locator('input[data-qa="login-email"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /signup returns signup page', async ({ page }) => {
    await navigateAndCheck(page, '/signup', 'Signup page');
    await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /contact_us returns contact page', async ({ page }) => {
    await navigateAndCheck(page, '/contact_us', 'Contact page');
    await expect(page.locator('input[data-qa="name"]')).toBeVisible({ timeout: 10000 });
  });

  test('GET /test_cases returns test cases page', async ({ page }) => {
    await navigateAndCheck(page, '/test_cases', 'Test cases page');
    await expect(page.locator('body')).toContainText('Test Cases', { timeout: 10000 });
  });
});