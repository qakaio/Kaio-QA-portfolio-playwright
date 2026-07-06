const { test, expect } = require('@playwright/test');

test.describe('CI Smoke Tests - automationexercise.com', () => {
  test('GET / returns HTML content', async ({ page }) => {
    await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toContainText('Home');
  });

  test('GET /products returns products page', async ({ page }) => {
    await page.goto('https://automationexercise.com/products', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.features_items')).toBeVisible();
  });

  test('GET /login returns login page', async ({ page }) => {
    await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('input[data-qa="login-email"]')).toBeVisible();
  });

  test('GET /signup returns signup page', async ({ page }) => {
    await page.goto('https://automationexercise.com/signup', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible();
  });

  test('GET /contact_us returns contact page', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('input[data-qa="name"]')).toBeVisible();
  });

  test('GET /test_cases returns test cases page', async ({ page }) => {
    await page.goto('https://automationexercise.com/test_cases', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText('Test Cases');
  });
});