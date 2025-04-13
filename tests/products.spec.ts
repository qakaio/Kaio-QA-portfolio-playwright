import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Check product listing', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await expect(products.getTitle()).resolves.toContain('Products');
});
