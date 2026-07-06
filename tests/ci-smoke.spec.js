const { test, expect } = require('@playwright/test');

test.describe('CI Smoke Tests - httpbin.org', () => {
  test('GET /html returns HTML content', async ({ page }) => {
    await page.goto('https://httpbin.org/html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toContainText('Herman Melville');
  });

  test('GET /get returns JSON with args', async ({ page }) => {
    const response = await page.goto('https://httpbin.org/get?test=ci&value=123');
    const json = await response.json();
    expect(json.args.test).toBe('ci');
    expect(json.args.value).toBe('123');
  });

  test('POST /post echoes JSON body', async ({ page }) => {
    const response = await page.request.post('https://httpbin.org/post', {
      data: { test: 'playwright', timestamp: Date.now() },
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    expect(json.json.test).toBe('playwright');
  });

  test('GET /status/200 returns 200', async ({ page }) => {
    const response = await page.goto('https://httpbin.org/status/200');
    expect(response.status()).toBe(200);
  });

  test('GET /headers returns request headers', async ({ page }) => {
    const response = await page.request.get('https://httpbin.org/headers', {
      headers: { 'X-Custom-Header': 'playwright-ci-test' }
    });
    const json = await response.json();
    expect(json.headers['X-Custom-Header']).toBe('playwright-ci-test');
  });

  test('GET /user-agent returns user agent', async ({ page }) => {
    const response = await page.request.get('https://httpbin.org/user-agent');
    const json = await response.json();
    expect(json['user-agent']).toContain('Playwright');
  });
});