const { test, expect } = require('./fixtures');
const { baseURL } = require('../utils');

test('TC01 - Home page is visible', async ({ page }) => {
  await page.goto(baseURL + '/');
  await expect(page.locator('html')).toContainText('Home');
});