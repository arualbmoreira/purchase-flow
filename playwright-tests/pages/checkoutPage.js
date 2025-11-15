import { expect } from '@playwright/test'

export class CheckoutPage {
    constructor(page) {
        this.page = page
        this.checkoutButton = page.locator('[data-test="checkout"]')
        this.firstNameInput = page.locator('[data-test="firstName"]')
        this.lastNameInput = page.locator('[data-test="lastName"]')
        this.zipCodeInput = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
        this.finishButton = page.locator('[data-test="finish"]')
    }

    async goToCheckout() {
        await this.checkoutButton.click()
        await expect(this.page).toHaveURL("/checkout-step-one.html")
    }

    async fillCheckoutForm() {
        const { faker } = await import('@faker-js/faker')

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const zipCode = faker.location.zipCode()

        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.zipCodeInput.fill(zipCode)

        await expect(this.continueButton).toBeVisible()
        await this.continueButton.click()
    }

    async validateCheckoutFields() {
        await expect(this.firstNameInput).toBeVisible()
        await expect(this.lastNameInput).toBeVisible()
        await expect(this.zipCodeInput).toBeVisible()
        await expect(this.continueButton).toBeVisible()
    }

    async checkCheckoutEmptyFields() {
        await expect(this.firstNameInput).toBeEmpty()
        await expect(this.lastNameInput).toBeEmpty()
        await expect(this.zipCodeInput).toBeEmpty()
    }

    async validatePaymentInformation() {
        await expect(this.page.locator('[data-test="cart-list"]')).toBeVisible()
        await expect(this.page.locator('[data-test="payment-info-label"]')).toBeVisible()
        await expect(this.page.locator('[data-test="shipping-info-label"]')).toBeVisible()
        await expect(this.page.locator('[data-test="total-info-label"]')).toBeVisible()
        await expect(this.page.locator('[data-test="tax-label"]')).toBeVisible()
        await expect(this.page.locator('[data-test="total-label"]')).toBeVisible()
        await expect(this.page.locator('[data-test="finish"]')).toBeVisible()

        await this.finishButton.click()
    }

    async validateSucessPurchase() {
        await expect(this.page.locator('[data-test="checkout-complete-container"]')).toBeVisible()
        await expect(this.page.locator('[data-test="complete-header"]')).toBeVisible()
        await expect(this.page.locator('[data-test="complete-text"]')).toBeVisible()
        await expect(this.page.locator('[data-test="back-to-products"]')).toBeVisible()
        await expect(this.page.locator('[data-test="back-to-products"]')).toBeVisible()
    }
} 
