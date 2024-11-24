const { expect } = require("@playwright/test");
const { text } = require("stream/consumers");

let count = 0;
let cross = 1;
exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;

    this.shop = '//*[@id="menu-item-792"]/a';
    this.itemSelect = '//*[@id="main"]/ul/li[1]/div/a[2]/h2';
    this.addButton = '//*[@id="product-3384"]/div[2]/form/button';
    this.viewCart = '//*[@id="main"]/div[1]/div/div/a';
    // this.increase =
    //   '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/ul/li/div[2]/div[2]/div/div/button[2]';
    this.remove = '//*[@id="main"]/div[2]/div/div[4]/div/div/div[2]/table/tbody/tr/td[2]/div/div[3]/button';
    this.emptyCart = '//*[@id="main"]/div[2]/div/div[4]/div/div/h2[1]';
    // this.crossButton = '//*[@id="btn-close-fly-cart"]';
    this.searchBtn =
      '//*[@id="header"]/div/div/div[3]/div[1]/button';
    this.searchItem =
      '//div[contains(@class,"aws-wrapper")]/input[1]';
    this.searchResult = '//*[@id="main"]/ul/li[1]/div/a[2]/h2';
    this.logoutDirect = '//*[@id="header"]/div/div/div[3]/a[1]';
    this.logout = '//*[@id="main"]/div[2]/div/nav/ul/li[6]';
    this.logoutMsg = '//*[@id="main"]/h1';
  }

  async addToCart(message) {
    await this.page.locator(this.shop).click();
    await this.page.locator(this.itemSelect).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.addButton).click();
    // await this.page.locator(this.increase).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator(this.viewCart)).toHaveText(message);
  }

  async removeQuantity() {
    await this.page.locator(this.viewCart).click();
    await this.page.locator(this.remove).click();
    await expect(this.page.locator(this.emptyCart)).toHaveText(
      "Your cart is currently empty!"
    );
    // await this.page.locator(this.crossButton).click();
  }

  async addMultipleItem() {
    await this.page.locator(this.shop).click();
    // await this.page.locator(this.itemSelect).click();
    await this.page.waitForTimeout(2000);
    for (let i = 1; i <= 3; i++) {
      await this.page.locator('//*[@id="main"]/ul/li['+i+']/a[2]').click();
      count++;
    }
    await this.page.waitForTimeout(2000);
    await this.page.locator('//*[@id="menu-item-791"]/a').click();
    await this.page.waitForTimeout(3000);
  }

  async searchOperation(item) {
    await this.page.locator(this.searchBtn).click();
    await this.page.locator(this.searchItem).fill(item);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.searchItem).press("Enter");
    await this.page.waitForTimeout(2000);

    const searchResultText = await this.page
      .locator(this.searchResult)
      .innerText();
    console.log("Search Result Text:", searchResultText);

    if (searchResultText.toLowerCase().includes(item.toLowerCase())) {
      console.log("Result found.");
    } else {
      console("Error!");
    }
  }

  async logoutOperation() {
    await this.page.locator(this.logoutDirect).click();
    await this.page.locator(this.logout).click();
    await expect(this.page.locator(this.logoutMsg)).toHaveText("My account");
  }
};
