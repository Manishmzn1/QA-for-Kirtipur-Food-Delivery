const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    // this.cross = '//*[@id="rpressModal"]/div/div/button';
    this.loginClick = '//*[@id="header"]/div/div/div[3]/a[1]';
    this.usernameInput = '//*[@id="username"]';
    this.passwordInput = '//*[@id="password"]';
    this.loginButton = '//*[@id="customer_login"]/div[1]/form/p[3]/button';
    this.validLoginValidation = '//*[@id="main"]/div[2]/div/div/p[1]/strong[1]';
    this.errorMessage = '//*[@id="main"]/div[2]/div/div[1]/div/div';
    // this.successMessage = "";
  }

  async login(username, password) {
    // await this.page.locator(this.cross).click();
    await this.page.locator(this.loginClick).click();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }
  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "manmzn9"
    );
  }

  async invalidLogin(error) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(error);
  }
};
