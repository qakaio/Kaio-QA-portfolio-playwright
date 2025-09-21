// utils/LoginHelper.js

const { baseURL } = require('./testFixtures');

class LoginHelper {
  constructor(page) {
    this.page = page;
  }

  async login(username = 'kaioqa@test.com', password = 'Password123') {
    await this.page.goto(baseURL + '/login');
    await this.page.fill('input[data-qa="login-email"]', username);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');
    await this.page.waitForSelector('a[href="/logout"]');
  }
}

module.exports = { LoginHelper };
