const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
const { LoginPage } = require("../../pageObjects/login.po");
const { DashboardPage } = require("../../pageObjects/dashboard.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(testData.validUser.username, testData.validUser.password);
  await login.verifyValidLogin();
});

// test.afterEach(async ({ page }) => {
//   const logout = new DashboardPage(page);
//   await logout.logoutOperation();
// });

test.describe("Dashboard CRUD", () => {
  test.describe.configure({ mode: "serial" });
  test("AddToCart CRUD", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.addToCart("View cart");
    await dashboard.removeQuantity();
  });

  test("Multiple Add", async ({ page }) => {
    const multipleAdd = new DashboardPage(page);
    await multipleAdd.addMultipleItem();
  });

  test("Search Items", async ({ page }) => {
    const search = new DashboardPage(page);
    await search.searchOperation("momo");
    await search.logoutOperation();
  });
});


