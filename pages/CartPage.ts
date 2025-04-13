export class CartPage {
  constructor(private page) {}

  async proceedToCheckout() {
    await this.page.click('[data-test="checkout"]');
  }
}
