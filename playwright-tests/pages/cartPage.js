import { expect } from '@playwright/test'

export class CartPage {
    constructor(page) {
        this.page = page
        this.addCartButton = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]')
        this.cartIcon = page.locator('[class="shopping_cart_link"]')
        this.cartItem = page.locator('[data-test="cart-list"]')
    }

    async addProductToCart() {
        await this.addCartButton.click()
    }

    async goToCart() {
        await this.cartIcon.click()
        await expect(this.page).toHaveURL("/cart.html")
    }

    async validateCart() {
        await expect(this.cartItem).toBeVisible()
    }
} 
