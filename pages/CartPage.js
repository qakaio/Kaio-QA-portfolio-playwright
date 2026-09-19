const { baseURL } = require('../utils/testFixtures');

class CartPage {
  constructor(page) {
    this.page = page;
    this.viewCartLink = page.locator('a[href="/view_cart"]').filter({ hasText: 'View Cart' }).first();
    this.cartHeaderLink = page.getByRole('link', { name: 'Cart' }).first();
    this.blueTopRow = page.locator('tr:has-text("Blue Top")');
  }

  async open() {
    await this.page.goto(baseURL + '/view_cart', { waitUntil: 'domcontentloaded' });
  }

  async goToCart() {
    await this.page.goto(baseURL + '/view_cart', { waitUntil: 'domcontentloaded' });
  }

  async expectProduct(productName = 'Blue Top') {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    await row.waitFor({ state: 'visible', timeout: 15000 });
    return row;
  }
}

module.exports = { CartPage };
