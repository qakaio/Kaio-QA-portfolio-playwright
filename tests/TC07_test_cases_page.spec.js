const { test, expect } = require('@playwright/test');

test('TC07 - Test Cases page is accessible', async ({ page }) => {
  await page.goto('https://www.automationexercise.com');
  await page.click('a[href="/test_cases"]');
  await expect(page).toHaveURL(/test_cases/);
  await expect(page.locator('body')).toContainText('Test Cases');
});