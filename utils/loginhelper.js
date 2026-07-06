// utils/LoginHelper.js

const { baseURL } = require('./testFixtures');
const { skipIfCloudflareBlocked } = require('./cloudflareHelper');

class LoginHelper {
  constructor(page) {
    this.page = page;
  }

  async login(username = 'kaioqa@test.com', password = 'Password123') {
    await this.page.goto(baseURL + '/login');
    await test.step('Verifica Cloudflare', async () => {
      const { skipIfCloudflareBlocked } = require('../utils');
      await skipIfCloudflareBlocked(this.page, 'LoginHelper.login');
    });
    await this.page.fill('input[data-qa="login-email"]', username);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');
    await this.page.waitForSelector('a[href="/logout"]');
  }
}

module.exports = { LoginHelper };