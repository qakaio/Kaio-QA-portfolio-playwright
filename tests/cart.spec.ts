import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('Add product to cart and proceed to checkout', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await products.addFirstProductToCart();
  await products.goToCart();
  await cart.proceedToCheckout();
  await expect(page).toHaveURL(/checkout-step-one/);
});
