

# 🛒 Playwright – Perfect Purchase Flow Automation

This project automates the complete purchase flow of an e-commerce website using **Playwright**, following the **Page Object Model (POM)** and best practices for UI test automation.

---

## 📌 About the Project

The goal of this project is to validate the full end-to-end purchase flow on the **Swag Labs (saucedemo.com)** website, ensuring:

* The login process works correctly
* The products page loads as expected
* A product can be browsed, searched, and validated
* The item can be added to the cart
* The checkout flow behaves properly
* The purchase is successfully completed

---

## 🚀 Technologies Used

* Node.js
* Playwright Test Runner
* JavaScript / TypeScript
* Page Object Model (POM)

---

## 📁 Project Structure

```
project/
│── pages/
│   ├── loginPage.js
│   ├── productPage.js
│   ├── cartPage.js
│   └── checkoutPage.js
│
│── tests/
│   └── purchaseFlow.spec.js
│
└── playwright.config.js
```
---

## 🧪 Automated Test: Perfect Purchase Flow

The automated test covers **5 main steps**:

### 1️⃣ Login

* Validate login field visibility
* Check for empty fields
* Attempt login without credentials
* Validate error message
* Login with valid credentials
* Confirm redirection to products page

### 2️⃣ Browsing and Searching

* Open the menu
* Search for a product

### 3️⃣ Product Validation

* Ensure the product is visible
* Validate product name, price, and description
* Cross-check displayed information

### 4️⃣ Adding to Cart

* Add the selected product to the cart
* Navigate to the cart
* Validate the product inside the cart

### 5️⃣ Finalizing the Purchase

* Navigate to checkout
* Validate checkout fields
* Confirm fields start empty
* Fill user information
* Validate payment details
* Confirm purchase success

---

## 🏗️ Page Object Model (POM)

This project uses separate classes for each page:

* `LoginPage`
* `ProductPage`
* `CartPage`
* `CheckoutPage`

Benefits:

✔ Cleaner and more organized code
✔ Better test readability
✔ Easier maintenance
✔ Increased reusability

---

## 📦 Final Result

Running the test validates the entire purchase flow — from login to checkout — ensuring that the customer journey works smoothly end-to-end.

---

