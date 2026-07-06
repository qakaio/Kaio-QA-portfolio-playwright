const { shouldSkipCloudflare } = require('../utils');
const { test, expect } = require('./fixtures');
const { LoginHelper, getTestUser, baseURL } = require('../utils');

test('TC13 - Verify address details in checkout after login', async ({ page }) => {
  await page.goto(baseURL + '/login');
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  const user = getTestUser();
  const loginHelper = new LoginHelper(page);
  await loginHelper.login(user.email, user.password);
  await page.goto(baseURL + '/products');
  const { shouldSkip } = await shouldSkipCloudflare(page, test.info().title);
  if (shouldSkip) {
    test.skip(true, 'Bloqueado pelo CloudFlare WAF');
    return;
  }
      }
  });
  await page.click('a[data-product-id="1"]');
  await page.click('u:has-text("View Cart")');
  await page.click('a[class="btn btn-default check_out"]');
  await expect(page.locator('#address_delivery')).toBeVisible();
});