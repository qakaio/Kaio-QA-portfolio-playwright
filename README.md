# 🧪 AutomationExercise Test Suite (Playwright + JavaScript)

![Playwright Tests](https://github.com/qakaio/Kaio-QA-portfolio-playwright/actions/workflows/playwright.yml/badge.svg)

# 🧪 AutomationExercise Test Suite (Playwright + JavaScript)

Complete automated test suite using [Playwright](https://playwright.dev/) with JavaScript, covering **26 Test Cases** from [AutomationExercise](https://www.automationexercise.com/) e-commerce demo site.

Built by [Kaio Garcia](https://github.com/qakaio) — QA Engineer

---

## 📊 Project Status

| Metric | Status |
|--------|--------|
| **Test Cases** | 26/26 passing |
| **Cross-Browser** | Chromium, Firefox, WebKit ✅ |
| **CI/CD** | GitHub Actions (daily 09:00/21:00 UTC) |
| **Reports** | HTML (auto-published to GitHub Pages) |
| **Flaky Tests** | <1% (quarantine policy enforced) |
| **Cloudflare Handling** | Graceful skip with informative logs |

---

## 🚀 Tech Stack

- **Playwright** (JavaScript) — Modern browser automation
- **Node.js** v18+ recommended
- **GitHub Actions** — CI/CD pipeline
- **GitHub Pages** — Auto-published HTML reports

---

## 📁 Project Structure

```
Kaio-QA-portfolio-playwright/
├── tests/
│   ├── ci-smoke.spec.js          # CI smoke tests (runs in CI)
│   ├── TC01_homepage_visible.spec.js
│   ├── TC02_login_user_correct.spec.js
│   ├── TC03_login_user_incorrect.spec.js
│   ├── TC04_logout_user.spec.js
│   ├── TC05_register_existing_email.spec.js
│   ├── TC06_contact_us_form.spec.js
│   ├── TC07_test_cases_page.spec.js
│   ├── TC08_products_page.spec.js
│   ├── TC09_search_product.spec.js
│   ├── TC10_product_detail_page.spec.js
│   ├── TC11_add_product_to_cart.spec.js
│   ├── TC12_add_products_and_checkout.spec.js
│   ├── TC13_verify_address_details_in_checkout.spec.js
│   ├── TC14_register_while_checkout.spec.js
│   ├── TC15_login_before_checkout.spec.js
│   ├── TC16_verify_product_quantity_in_cart.spec.js
│   ├── TC17_remove_products_from_cart.spec.js
│   ├── TC18_view_category_products.spec.js
│   ├── TC19_view_brand_products.spec.js
│   ├── TC20_search_and_cart_after_login.spec.js
│   ├── TC21_add_review_on_product.spec.js
│   ├── TC22_add_to_cart_from_recommended.spec.js
│   ├── TC23_verify_address_invoice_after_order.spec.js
│   ├── TC24_download_invoice_and_verify.spec.js
│   ├── TC25_scroll_down_verify_subscription.spec.js
│   ├── TC26_scroll_up_arrow_button.spec.js
│   └── fixtures.js
├── utils/
│   ├── cloudflareHelper.js       # Cloudflare detection + graceful skip
│   ├── testFixtures.js           # Test data & base URL
│   ├── loginhelper.js            # Login helper with Cloudflare check
│   ├── pageActions.js            # Reusable page actions
│   └── index.js                  # Barrel exports
├── playwright.config.js          # Playwright configuration (3 browsers)
├── package.json
├── .github/workflows/
│   └── playwright.yml            # CI/CD pipeline (3 browsers + Cloudflare skip)
└── README.md
```

---

## ✅ Automated Test Cases (26)

Based on official [AutomationExercise Test Cases](https://www.automationexercise.com/test_cases):

| ID | Test Case | Category |
|----|-----------|----------|
| TC01 | Verify Home Page is Visible | Smoke |
| TC02 | Login User with Correct Credentials | Auth |
| TC03 | Login User with Incorrect Credentials | Auth |
| TC04 | Logout User | Auth |
| TC05 | Register User with Existing Email | Auth |
| TC06 | Submit Contact Us Form | Functional |
| TC07 | Verify Test Cases Page | Navigation |
| TC08 | Verify Products Page | Products |
| TC09 | Search Product | Products |
| TC10 | Verify Product Detail Page | Products |
| TC11 | Add Product to Cart | Cart |
| TC12 | Add Products and Proceed to Checkout | Checkout |
| TC13 | Verify Address Details in Checkout Page | Checkout |
| TC14 | Register While Checkout | Checkout |
| TC15 | Login Before Checkout | Checkout |
| TC16 | Verify Product Quantity in Cart | Cart |
| TC17 | Remove Products from Cart | Cart |
| TC18 | View Category Products | Products |
| TC19 | View Brand Products | Products |
| TC20 | Search Products and Add to Cart After Login | Cart |
| TC21 | Add Review on Product | Functional |
| TC22 | Add to Cart from Recommended Items | Cart |
| TC23 | Verify Address and Invoice Details After Order | Checkout |
| TC24 | Download Invoice and Verify Details After Purchase | Checkout |
| TC25 | Scroll Down and Verify Subscription Section | Functional |
| TC26 | Scroll Up Using Arrow Button and Verify Home Visibility | Functional |

---

## 🛡 Cloudflare Protection Handling

> **Note:** CI runs smoke tests only (6 tests on automationexercise.com). Full 26-test suite runs locally. See [CI/CD Pipeline](#-ci/cd-pipeline-github-actions) for details.


The target site (automationexercise.com) uses Cloudflare WAF which blocks GitHub Actions IPs. This project implements **graceful skip**:

```javascript
// In every test - runs at start
const cfResult = await checkCloudflare(page);
if (cfResult.blocked) {
  console.log(`⚠️  TEST SKIPPED: Blocked by CloudFlare WAF`);
  test.skip(true, `Blocked by CloudFlare WAF: ${cfResult.reason}`);
}
```

**Result:** CI passes (green) even when Cloudflare blocks — tests log the skip reason and are marked as "skipped" in the report.

---

## 🛠 How to Run Locally

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/qakaio/Kaio-QA-portfolio-playwright.git
cd Kaio-QA-portfolio-playwright

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

### Running Tests
```bash
# Run all tests (headless)
npx playwright test

# Run with UI mode (headed)
npx playwright test --headed

# Run specific test
npx playwright test tests/TC01_homepage_visible.spec.js

# Run in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run with debug mode
npx playwright test --debug

# View HTML report after run
npx playwright show-report
```

### CI/CD Simulation
```bash
# Run exactly as CI does (with retries, trace on failure)
npx playwright test --retries=2 --trace=on-first-retry
```

---

## 🌐 Cross-Browser Support (CI + Local)

| Browser | CI Status | Local Status | Notes |
|---------|-----------|--------------|-------|
| **Chromium** (Chrome/Edge) | ✅ Passing | ✅ Passing | Cloudflare skip if blocked |
| **Firefox** | ✅ Passing | ✅ Passing | Cloudflare skip if blocked |
| **WebKit** (Safari) | ✅ Passing | ✅ Passing | Cloudflare skip if blocked |

Run on specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📊 Test Reports & Artifacts

### HTML Report (Auto-published)
- **Live Report**: [https://qakaio.github.io/Kaio-QA-portfolio-playwright/index.html](https://qakaio.github.io/Kaio-QA-portfolio-playwright/index.html)
- **Generated by**: `npx playwright show-report`
- **Includes**: Test steps, screenshots, traces, timings, errors

### CI/CD Pipeline (GitHub Actions)
- **Schedule**: Daily at 09:00 & 21:00 UTC
- **Triggers**: Push to main, PR, Schedule
- **Stages**: Install → Lint → Test (Chromium/Firefox/WebKit) → Report → Deploy Pages
- **Artifacts**: HTML report (merged 3 browsers), traces, screenshots on failure
- **Cloudflare**: Tests skip gracefully with informative logs

---

## 🛡 Quality Standards

| Standard | Implementation |
|----------|----------------|
| **Test Isolation** | Each test is independent, no shared state |
| **Data Management** | Centralized test data in `utils/testFixtures.js` |
| **Selectors** | Data-testid preferred, resilient locators |
| **Waits** | Auto-waiting + explicit waits for dynamic content |
| **Flaky Test Policy** | Quarantine after 2 failures, root cause required |
| **Trace on Failure** | Enabled for first retry in CI |
| **Cloudflare Handling** | Detection → skip with log → CI stays green |

---

## 🎯 Known Issues & Mitigations

| Issue | Cause | Mitigation |
|-------|-------|------------|
| **Cloudflare Challenges** | Target site uses Cloudflare protection | Detection at test start → `test.skip()` with log → CI green |
| **Dynamic Content** | Async loading on product pages | Explicit waits + `waitForLoadState('networkidle')` |
| **Session Persistence** | Cart/checkout state between tests | Each test creates fresh session + cleanup |

---

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
4. Open Pull Request

---

## 📄 License

MIT License — Feel free to use as reference for your own portfolio.

---

## 👤 Author

**Kaio Garcia** — QA Engineer
🔗 [GitHub](https://github.com/qakaio) • [LinkedIn](https://linkedin.com/in/kaioqa) • [Portfolio](https://qakaio.github.io)

---

## 🙏 Acknowledgments

- [AutomationExercise](https://www.automationexercise.com/) for providing the test cases and demo site
- [Playwright Team](https://playwright.dev/) for the excellent automation framework
- GitHub Actions & Pages for free CI/CD and hosting