import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/loginPage"
import { ProductPage } from "../pages/productPage"
import { CartPage } from "../pages/cartPage"
import { CheckoutPage } from "../pages/checkoutPage"

//beforeEach is used to navigate to the login page before each test
test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("Doing the perfect purchase flow", async ({ page }) => {
  const validUser = process.env.VALID_USER
  const validPassword = process.env.VALID_PWD
  //step 1: Login
  await test.step("Doing the login on website", async () => {
    const loginPage = new LoginPage(page)

    //validate the login fields are visible
    await loginPage.validateVisibleLoginFields()

    //validate the login fields are empty
    await loginPage.validateEmptyLoginFields()

    //click the login button without credentials
    await loginPage.clickLoginWithoutCredentials()

    //validate the error message if being displayed
    await expect(loginPage.errorLocator()).toHaveText(
      "Epic sadface: Username is required"
    )

    //login with valid credentials
    await loginPage.login(validUser, validPassword)

    //validate the customer is redirected to the products page
    await expect(page).toHaveURL("/inventory.html")

    //validate if logo and products list are visible
    await expect(page.locator(".app_logo")).toBeVisible()
    await expect(page.locator(".inventory_list")).toBeVisible()
  })

  //step 2: Browser and searching for a product
  await test.step("Browsing the products list and searching for a product", async () => {
    const productPage = new ProductPage(page)

    //access the menu
    await productPage.accessMenu()

    //search for a product
    await productPage.searchProduct()
  })

  //step 3: Validating the product
  await test.step("Validating the product", async () => {
    const productPage = new ProductPage(page)

    //validate the product is visible
    await productPage.checkProduct()

    //validate the product name, price and description
    await productPage.validateProduct(
      "Sauce Labs Onesie",
      "$7.99",
      "Rib snap infant onesie"
    )

    //validate the product name, price and description
    await expect(productPage.firstProductName).toHaveText("Sauce Labs Onesie")
    await expect(productPage.firstProductPrice).toHaveText("$7.99")
    await expect(productPage.firstProductDescription).toContainText(
      "Rib snap infant onesie"
    )
  })

  //step 4: Adding the product to the cart
  await test.step("Adding the product to the cart", async () => {
    const cartPage = new CartPage(page)

    //add the product to the cart
    await cartPage.addProductToCart()

    //go to the cart
    await cartPage.goToCart()

    //validate the product is in the cart
    await cartPage.validateCart()
  })

  //step 5: Finalizing the purchase
  await test.step("Finalizing the purchase", async () => {
    const checkoutPage = new CheckoutPage(page)

    //go to the checkout page
    await checkoutPage.goToCheckout()

    //validate the checkout fields are visible
    await checkoutPage.validateCheckoutFields()

    //validate the checkout fields are empty
    await checkoutPage.checkCheckoutEmptyFields()

    //fill the checkout form
    await checkoutPage.fillCheckoutForm()

    //validate the payment information
    await checkoutPage.validatePaymentInformation()

    //validate the success purchase
    await checkoutPage.validateSucessPurchase()
  })
})
