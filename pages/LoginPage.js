const { baseURL } = require('../utils/testFixtures');
const { shouldSkipCloudflare } = require('../utils/cloudflareHelper');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loggedInUserLink = page.locator('a:has-text("Logged in as")');
    this.logoutLink = page.locator('a[href="/logout"]');
  }

  async open() {
    await this.page.goto(baseURL + '/login', { waitUntil: 'domcontentloaded' });
    const { shouldSkip, reason } = await shouldSkipCloudflare(this.page, 'LoginPage.open');
    if (shouldSkip) {
      throw { name: 'PlaywrightSkip', message: `Bloqueado pelo CloudFlare WAF: ${reason}` };
    }
  }

  async login(username, password) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.loggedInUserLink.waitFor({ state: 'visible', timeout: 15000 });
  }
}

module.exports = { LoginPage };
