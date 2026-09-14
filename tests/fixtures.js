// tests/fixtures.js
const base = require('@playwright/test').test;
const expect = require('@playwright/test').expect;
const { LoginHelper, getTestUser } = require('../utils');

// Extend base test with login fixture
const test = base.extend({
  login: async ({ page }, use) => {
    const user = getTestUser();
    const loginHelper = new LoginHelper(page);
    await loginHelper.login(user.email, user.password);
    await use(user);
  },
});

module.exports = { test, expect };