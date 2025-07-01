const { test, expect } = require('@playwright/test');

test('TC22 - Add to cart from Recommended items', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
  await page.waitForSelector('.recommended_items');
  await page.click('.recommended_items .add-to-cart');
  await page.click('u:has-text("View Cart")');
  await expect(page.locator('.cart_info')).toBeVisible();
});