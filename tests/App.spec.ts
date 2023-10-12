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

// load tests

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

// view tests

test("after loading valid CSV and submitting and then viewing, we see the result in brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "successfully loaded csvblueberrypineapplebanana123thissongremains"
  );
});

test("switching to verbose, viewing in verbose; switching to brief, viewing in brief", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "successfully loaded csvCommand: viewOutput:blueberrypineapplebanana123thissongremainsblueberrypineapplebanana123thissongremains"
  );
});

test("after switching to verbose and loading valid CSV and submitting and then viewing, we see the result in verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csvCommand: viewOutput:blueberrypineapplebanana123thissongremains"
  );
});

test("after switching to verbose and loading valid CSV and viewing and then loading a different valid CSV and viewing, we get the correct tables for both views", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csvCommand: viewOutput:blueberrypineapplebanana123thissongremains"
  );

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV2.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csvCommand: viewOutput:blueberrypineapplebanana123thissongremainsCommand: load_file ./data/mock/exampleCSV2.csvOutput: successfully loaded csvCommand: viewOutput:TheSongsremainthesame.Itreallydoesstayconstant.Songsarereallythevibe."
  );
});

test("viewing without first loading a valid CSV; viewing without loading a valid CSV", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText("data not loaded");

  await page.getByLabel("Command input").fill("load_file sdgsangalkng");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "data not loadedfailed to load csvdata not loaded"
  );
});

// search tests

test("after loading valid CSV and submitting and then doing valid search by column index, we see the result in brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search 2 remains");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "successfully loaded csvthissongremains"
  );
});

test("after loading valid CSV and submitting and then doing valid search by column name, we see the result in brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search blueberry 1");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "successfully loaded csv123"
  );
});

test("after loading valid CSV and submitting and then doing invalid search without enough arguments, we see the error result in brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search blueberry");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "successfully loaded csvinvalid number of arguments"
  );
});

test("when searching without loaded data, we see the error result in brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("search blueberry 1");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText("data not loaded");
});

test("after loading valid CSV and submitting and then doing search but query doesn't exist in specified column, we see the error result in brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search blueberry remains");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "successfully loaded csvquery not found in given column"
  );
});

test("after switching to verbose, loading valid CSV, and submitting and then doing valid search by column index, we see the result in verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search 2 remains");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csvCommand: search 2 remainsOutput:thissongremains"
  );
});

test("after switching to verbose, loading valid CSV, and submitting and then doing valid search by column name, we see the result in verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search blueberry 1");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csvCommand: search blueberry 1Output:123"
  );
});

test("after switching to verbose, loading valid CSV, and submitting and then doing invalid search without enough arguments, we see the error result in verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search blueberry");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csvCommand: search blueberryOutput: invalid number of arguments"
  );
});

test("after switching to verbose, when searching without loaded data, we see the error result in verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search blueberry 1");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: search blueberry 1Output: data not loaded"
  );
});

test("after switching to verbose, loading valid CSV, and submitting and then doing search but query doesn't exist in specified column, we see the error result in verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search blueberry remains");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_file ./data/mock/exampleCSV1.csvOutput: successfully loaded csvCommand: search blueberry remainsOutput: query not found in given column"
  );
});

// fully integrated test

test("load, view, and search valid CSV in brief; then switch to verbose and load new CSV, search, and view (all valid searches)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search 2 remains");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV2.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search the the");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("view");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "successfully loaded csvblueberrypineapplebanana123thissongremainsthissongremainsCommand: load_file ./data/mock/exampleCSV2.csvOutput: successfully loaded csvCommand: search the theOutput:TheSongsremainthesame.Songsarereallythevibe.Command: viewOutput:TheSongsremainthesame.Itreallydoesstayconstant.Songsarereallythevibe."
  );
});

// invalid command

test("not giving one of the listed commands", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("dslgnalkgnalkrgn");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "invalid command or arguments"
  );
});

test("giving one of the listed commands but without the required arguments (i.e. no filepath for load)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("load_file");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "invalid command or arguments"
  );
});

test("giving one of the listed commands but without the required arguments (i.e. no column ID or query for search)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("search");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "invalid command or arguments"
  );
});

test("not giving one of the listed commands in verbose", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("dslgnalkgnalkrgn");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: dslgnalkgnalkrgnOutput: invalid command or arguments"
  );
});

test("giving one of the listed commands but without the required arguments (i.e. no filepath for load) in verbose", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("load_file");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: load_fileOutput: invalid command or arguments"
  );
});

test("giving one of the listed commands but without the required arguments (i.e. no column ID or query for search) in verbose", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").fill("mode");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command: searchOutput: invalid command or arguments"
  );
});

test("after loading valid CSV and submitting and then doing search but returning empty search result", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page
    .getByLabel("Command input")
    .fill("load_file ./data/mock/exampleCSV1.csv");
  await page.locator("css=button").click();

  await page.getByLabel("Command input").fill("search 0 NoExist");
  await page.locator("css=button").click();

  await expect(page.getByTestId("repl-history")).toHaveText(
    "successfully loaded csv "
  );
});
