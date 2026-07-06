// utils/LoginHelper.js

const { baseURL } = require('./testFixtures');
const { shouldSkipCloudflare } = require('./cloudflareHelper');

class LoginHelper {
  constructor(page) {
    this.page = page;
  }

  async login(username = 'kaioqa@test.com', password = 'Password123') {
    await this.page.goto(baseURL + '/login');
    
    const { shouldSkip } = await shouldSkipCloudflare(this.page, 'LoginHelper.login');
    if (shouldSkip) {
      throw { name: 'PlaywrightSkip', message: 'Bloqueado pelo CloudFlare WAF' };
    }
    
    await this.page.fill('input[data-qa="login-email"]', username);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');
    await this.page.waitForSelector('a[href="/logout"]');
  }
}

module.exports = { LoginHelper };