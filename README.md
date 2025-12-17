# 🧪 AutomationExercise Test Suite (Playwright + JavaScript)

This project contains a complete automated test suite using [Playwright](https://playwright.dev/) with JavaScript, covering **26 Test Cases** from the [AutomationExercise](https://www.automationexercise.com/) website.

Built by [Kaio Garcia](https://github.com/qakaio) as part of my QA Automation portfolio.

This repository uses GitHub Actions CI/CD, running daily at 09:00 and 21:00 UTC

After each execution, an HTML test report is generated and automatically published via GitHub Pages:

https://qakaio.github.io/Kaio-QA-portfolio-playwright/index.html


Status:

![Playwright CI/CD](https://github.com/qakaio/Kaio-QA-portfolio-playwright/actions/workflows/playwright.yml/badge.svg)

---

## 🚀 Tech Stack

- [Playwright](https://playwright.dev/) (JavaScript)
- Node.js (v18+ recommended)
- VSCode (optional)
- GitHub Actions (CI/CD)

---

## 📁 Project Structure

```
📂 tests
 ├── TC01_register_user.spec.js
 ├── TC02_login_user.spec.js
 ├── ...
 └── TC26_verify_scrollup_using_arrow.spec.js
📄 playwright.config.js
📄 package.json
📄 README.md
```

Each `.spec.js` file represents a **standalone test case**, following best practices for automation.

---

## ✅ Automated Test Cases

These tests are based on the official [Test Cases](https://www.automationexercise.com/test_cases):

| ID    | Test Case Description                                      |
|-------|------------------------------------------------------------|
| TC01  | Verify Home Page is Visible                                |
| TC02  | Login User with Correct Credentials                        |
| TC03  | Login User with Incorrect Credentials                      |
| TC04  | Logout User                                                |
| TC05  | Register User with Existing Email                          |
| TC06  | Submit Contact Us Form                                     |
| TC07  | Verify Test Cases Page                                     |
| TC08  | Verify Products Page                                       |
| TC09  | Search Product                                             |
| TC10  | Verify Product Detail Page                                 |
| TC11  | Add Product to Cart                                        |
| TC12  | Add Products and Proceed to Checkout                       |
| TC13  | Verify Address Details in Checkout Page                    |
| TC14  | Register While Checkout                                    |
| TC15  | Login Before Checkout                                      |
| TC16  | Verify Product Quantity in Cart                            |
| TC17  | Remove Products from Cart                                  |
| TC18  | View Category Products                                     |
| TC19  | View Brand Products                                        |
| TC20  | Search Products and Add to Cart After Login                |
| TC21  | Add Review on Product                                      |
| TC22  | Add to Cart from Recommended Items                         |
| TC23  | Verify Address and Invoice Details After Order             |
| TC24  | Download Invoice and Verify Details After Purchase         |
| TC25  | Scroll Down and Verify Subscription Section                |
| TC26  | Scroll Up Using Arrow Button and Verify Home Visibility    |


---

## 🛠 How to Run Locally

1. **Clone this repo:**
   ```bash
   git clone https://github.com/qakaio/Kaio-QA-portfolio-playwright.git
   cd Kaio-QA-portfolio-playwright
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npx playwright install
   ```

3. **Run all tests:**
   ```bash
   npx playwright test
   ```

4. **Run a specific test:**
   ```bash
   npx playwright test tests/TC01_register_user.spec.js
   ```

5. **View test report:**
   ```bash
   npx playwright show-report
   ```

---

## 🌐 Cross-Browser Support

This suite runs on:

- ✅ Chromium (Chrome / Edge)
- ✅ Firefox
- ✅ WebKit (Safari)

Use the `--project` flag to run tests on a specific browser.

---

## ✨ Highlights

- Full coverage of 26 test cases
- Clean, isolated scripts for each scenario
- Page content and UI verification
- Subscription, cart, invoice, and form interactions


