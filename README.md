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
│   ├── TC01_register_user.spec.js
│   ├── TC02_login_user.spec.js
│   ├── TC03_login_incorrect.spec.js
│   ├── TC04_logout.spec.js
│   ├── TC06_contact_us.spec.js
│   ├── TC07_test_cases_page.spec.js
│   ├── TC08_products_page.spec.js
│   ├── TC09_search_product.spec.js
│   ├── TC10_product_detail.spec.js
│   ├── TC11_add_to_cart.spec.js
│   ├── TC12_checkout.spec.js
│   ├── TC13_address_checkout.spec.js
│   ├── TC14_register_checkout.spec.js
│   ├── TC15_login_checkout.spec.js
│   ├── TC16_quantity_cart.spec.js
│   ├── TC17_remove_cart.spec.js
│   ├── TC18_category_products.spec.js
│   ├── TC19_brand_products.spec.js
│   ├── TC20_search_add_cart.spec.js
│   ├── TC21_add_review.spec.js
│   ├── TC22_add_cart_recommended.spec.js
│   ├── TC23_address_invoice.spec.js
│   ├── TC24_download_invoice.spec.js
│   ├── TC25_subscription.spec.js
│   └── TC26_scroll_up.spec.js
├── utils/
│   ├── test-data.js          # Centralized test data
│   └── helpers.js            # Reusable helper functions
├── playwright.config.js      # Playwright configuration
├── package.json
├── .github/workflows/
│   └── playwright.yml        # CI/CD pipeline
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
npx playwright test tests/TC01_register_user.spec.js

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

## 🌐 Cross-Browser Support

| Browser | Status | Notes |
|---------|--------|-------|
| **Chromium** (Chrome/Edge) | ✅ Passing | Primary target |
| **Firefox** | ✅ Passing | Full support |
| **WebKit** (Safari) | ✅ Passing | Full support |

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
- **Artifacts**: HTML report, traces, screenshots on failure

---

## 🛡 Quality Standards

| Standard | Implementation |
|----------|----------------|
| **Test Isolation** | Each test is independent, no shared state |
| **Data Management** | Centralized test data in `utils/test-data.js` |
| **Selectors** | Data-testid preferred, resilient locators |
| **Waits** | Auto-waiting + explicit waits for dynamic content |
| **Flaky Test Policy** | Quarantine after 2 failures, root cause required |
| **Trace on Failure** | Enabled for first retry in CI |

---

## 🎯 Known Issues & Mitigations

| Issue | Cause | Mitigation |
|-------|-------|------------|
| **Cloudflare Challenges** | Target site uses Cloudflare protection | Retries with exponential backoff; quarantine flaky tests |
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
