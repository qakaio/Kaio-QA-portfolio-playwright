// utils/pageActions.js

/**
 * Add a product to cart by product id
 * @param {import('@playwright/test').Page} page
 * @param {string|number} productId
 */
async function addProductToCart(page, productId) {
  await page.click(`a[data-product-id="${productId}"]`);
  await page.click('u:has-text("View Cart")');
}

/**
 * Remove a product from cart by selector
 * @param {import('@playwright/test').Page} page
 */
async function removeProductFromCart(page) {
  await page.click('.cart_quantity_delete');
}

module.exports = { addProductToCart, removeProductFromCart };