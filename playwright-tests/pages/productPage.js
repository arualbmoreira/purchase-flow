import { expect } from "@playwright/test"

export class ProductPage {
  constructor(page) {
    this.page = page
    this.productFilter = page.locator('[data-test="product-sort-container"]')
    this.optionsFilter = page.locator(
      '[data-test="product-sort-container"]',
      "lohi"
    )
    this.firstProduct = page
      .locator('[data-test="inventory-item-description"]')
      .first()
    this.firstProductName = page.locator('[data-test="item-2-title-link"]')
    this.firstProductPrice = page
      .locator('[data-test="inventory-item-price"]')
      .first()
    this.firstProductDescription = page
      .locator('[data-test="inventory-item-desc"]')
      .first()
      this.closeMenuButton = page.locator('xpath=//*[@id="react-burger-cross-btn"]')
      this.menuButton = page.locator('xpath=//*[@id="react-burger-menu-btn"]')
  }

  async sortByProducts(filter) {
    await this.productFilter.selectOption(filter)
  }

  async checkProduct() {
    await expect(this.firstProduct).toBeVisible()
    await expect(this.firstProductName).toBeVisible()
    await expect(this.firstProductPrice).toBeVisible()
    await expect(this.firstProductDescription).toBeVisible()
  }

  async validateProduct(name, price, description) {
    await expect(this.firstProductName).toHaveText(name)
    await expect(this.firstProductPrice).toHaveText(price)
    await expect(this.firstProductDescription).toContainText(description)
  }

  async accessMenu() {
    await expect(this.menuButton).toBeVisible()
    await this.menuButton.click()
  }

  async searchProduct() {
    if ((await this.page.locator("#search").count()) > 0) {
      await this.page.locator("#search").fill("Backpack")
    } else {
      // fallback – sort by price
      await this.closeMenuButton.click()
      await expect(this.productFilter).toBeVisible()
      await this.productFilter.selectOption("Price (low to high)")  
    }
  }
}
