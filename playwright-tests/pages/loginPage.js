import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async validateVisibleLoginFields() {
    await expect(this.usernameInput).toBeVisible()
    await expect(this.passwordInput).toBeVisible()
    await expect(this.loginButton).toBeVisible()
  }
  async validateEmptyLoginFields() {
    await expect(this.usernameInput).toBeEmpty()
    await expect(this.passwordInput).toBeEmpty()
  }

  async clickLoginWithoutCredentials() {
    await this.loginButton.click();
  }

  errorLocator() {
    return this.errorMessage;
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
