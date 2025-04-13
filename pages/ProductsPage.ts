export class ProductsPage {
  constructor(private page) {}

  async getTitle() {
    return await this.page.textContent('.title');
  }

  async addFirstProductToCart() {
    await this.page.click('.inventory_item button');
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
