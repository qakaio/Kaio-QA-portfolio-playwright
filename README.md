# 🧪 AutomationExercise Test Suite (Playwright + JavaScript)

This project contains a complete automated test suite using [Playwright](https://playwright.dev/) with JavaScript, covering all **26 official Test Cases** from the [AutomationExercise](https://www.automationexercise.com/) website.

Built by [Kaio Garcia](https://github.com/qakaio) as part of my QA Automation portfolio.

---

## 🚀 Tech Stack

- [Playwright](https://playwright.dev/) (JavaScript)
- Node.js (v18+ recommended)
- VSCode + ESLint (optional)

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

| ID    | Test Case Description                                    |
|-------|----------------------------------------------------------|
| TC01  | Register User                                            |
| TC02  | Login User                                               |
| TC03  | Login with incorrect credentials                         |
| TC04  | Logout User                                              |
| TC05  | Register with existing email                             |
| TC06  | Contact Us Form                                          |
| TC07  | Test Cases Page                                          |
| TC08  | Products Page                                            |
| TC09  | Search Product                                           |
| TC10  | Verify Product Details                                   |
| TC11  | Add Product to Cart                                      |
| TC12  | Add Product and Proceed to Checkout                      |
| TC13  | Verify Address Details in Checkout Page                 |
| TC14  | Register while Checkout                                  |
| TC15  | Login before Checkout                                    |
| TC16  | Download Invoice after Order                             |
| TC17  | Remove Products from Cart                                |
| TC18  | View Category Products                                   |
| TC19  | View & Cart Brand Products                               |
| TC20  | Search Products and Verify Cart                          |
| TC21  | Add Review on Product                                    |
| TC22  | Add to Cart from Recommended Items                       |
| TC23  | Verify Address and Invoice Details After Order           |
| TC24  | Download Invoice After Purchase                          |
| TC25  | Scroll Down and Verify Subscription Section              |
| TC26  | Scroll Up Using Arrow Button and Verify Home Visibility  |

---

## 🛠 How to Run Locally

1. **Clone this repo:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
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
- Ideal for showcasing QA Automation skills

---

Feel free to fork or contribute. QA is love, QA is life. 💙
