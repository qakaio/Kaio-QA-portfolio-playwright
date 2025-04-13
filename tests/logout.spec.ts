import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Logout from app', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('/');
});
