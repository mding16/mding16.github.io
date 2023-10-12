import { test, expect } from "@playwright/test";

test.beforeEach(() => {});

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

test("after loading valid CSV and submitting, we receive the success message in brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "successfully loaded csv"
  );
});

test("after loading invalid CSV and submitting, we receive the error message in brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("load_file asfgnafldknalk");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "failed to load csv"
  );
});

test("after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csv"
  );
});

test("after switching to verbose and loading invalid CSV and submitting, we receive the error message in verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("load_file asfgnafldknalk");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file asfgnafldknalkOutput: failed to load csv"
  );
});

test("after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after switching to brief and loading a different valid CSV and submitting, we receive the success message in brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csv"
  );

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV2.csv");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csvsuccessfully loaded csv"
  );
});

test("after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after loading a different valid CSV and submitting, we receive the success message in verbose mode still", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csv"
  );

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV2.csv");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csvCommand: load_file ./data/mock/exampleCSV2.csvOutput: successfully loaded csv"
  );
});
