const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
// const contactData = require("../../fixture/contact.json");
const { LoginPage } = require("../../pageObjects/login.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Valid Login tests", () => {
  test.only("valid login", async ({ page }) => {
    const login = new LoginPage(page);
    // await page.waitForTimeout(2000);
    await login.login(testData.validUser.username, testData.validUser.password);
    await login.verifyValidLogin();
  });
});

test.describe("Invalid Login Tests", () => {
  test.describe.configure({ mode: "serial" });
  test("Both Invalid Credientials", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.invalidUsername,
      testData.invalidUser.invalidPassword
    );
    // await page.waitForTimeout(2000);

    await login.invalidLogin(
      "Unknown email address. Check again or try your username."
    );
    await page.waitForTimeout(1000);
  });

  test("Valid username invalid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.username,
      testData.invalidUser.invalidPassword
    );
    // await page.waitForTimeout(2000);

    await login.invalidLogin(
      "Error: The password you entered for the email address manmzn9@gmail.com is incorrect. Lost your password?"
    );
    await page.waitForTimeout(1000);
  });

  test("Invalid username valid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.invalidUsername,
      testData.invalidUser.password
    );
    // await page.waitForTimeout(2000);

    await login.invalidLogin(
      "Unknown email address. Check again or try your username."
    );
    await page.waitForTimeout(1000);
  });

  test("Empty username and password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyUsername,
      testData.invalidUser.emptyPassword
    );
    // await page.waitForTimeout(2000);

    await login.invalidLogin("Error: Username is required.");
    await page.waitForTimeout(1000);
  });

  test("Empty password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.username,
      testData.invalidUser.emptyPassword
    );
    // await page.waitForTimeout(2000);

    await login.invalidLogin("Error: The password field is empty.");
    await page.waitForTimeout(1000);
  });
});
