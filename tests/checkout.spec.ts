import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Complete checkout process', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await products.addFirstProductToCart();
  await products.goToCart();
  await cart.proceedToCheckout();
  await checkout.fillInfo('Kaio', 'QA', '12345');
  await checkout.finishCheckout();
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
