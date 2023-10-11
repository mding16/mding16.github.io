import { test, expect } from "@playwright/test";

test.beforeEach(() => {
});

test("on page load, i see a command", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByText("Welcome to Mock!")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.locator("css=button")).toBeVisible();
});

test("after I click the button, its label increments", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.locator("css=button").click();
  await page.locator("css=button").click();
  await page.locator("css=button").click();
  await page.locator("css=button").click();
  await expect(page.locator("css=button")).toHaveText("Submitted 4 time(s)");
});
