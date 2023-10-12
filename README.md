# Mock-azhou76-mding16
# Project details
Project name: Mock
Team members: mding16, azhou76
Time took: 16 hours
Repo link: https://github.com/cs0320-f23/mock-azhou76-mding16.git 


# Design choices
- The top level of our app is App.tsx
- Within the app is a REPL that contains two main components (REPLInput and REPLHistory) that share a history state. 
- We do all the processing of commands in the REPLInput and the outputting of command history in REPLHistory. REPLInput has two child components LoadStatus and ModeStatus that take in props on the current status and return JSX elements that share this with the user. 

General Structure:
REPL:
1. REPLInput (processing all user commands and adding it to history)
1.1 Mode Status (showing whether you are in brief or verbose mode)
1.2 Load Status (showing which file (if any) is currently loaded)

2. REPLHistory (returning the history of commands, stored as an array of JSX elements)
2.1 Left side shows the list of valid commands for better user accessibility
2.2 Right side shows command history

# Tests
- We used playwright for our tests. We mocked csv json objects to test our load, view, and search. 
- We wrote several different csv objects (using an array of string arrays) that reflected various shapes/sizes. 
- We created a hashmap that maps filenames to the csv object so we can mock load/view/search
- We created a hashmap that maps search queries to the search result (also in an array of string arrays) so we can mock search 
- Invalid searches/invalid filenames are entries that do not exist in these maps -> so will produce an error that we consider on the frontend 

Here is a list of our tests & considered edge cases:
  [chromium] › App.spec.ts:5:1 › on page load, i see a command
  [chromium] › App.spec.ts:10:1 › after I type into the input box, its text changes
  [chromium] › App.spec.ts:20:1 › on page load, i see a button
  [chromium] › App.spec.ts:25:1 › after I click the button, its label increments
  [chromium] › App.spec.ts:36:1 › after loading valid CSV and submitting, we receive the success message in brief mode
  [chromium] › App.spec.ts:51:1 › after loading invalid CSV and submitting, we receive the error message in brief mode
  [chromium] › App.spec.ts:64:1 › after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode
  [chromium] › App.spec.ts:82:1 › after switching to verbose and loading invalid CSV and submitting, we receive the error message in verbose mode
  [chromium] › App.spec.ts:98:1 › after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after switching to brief and loading a different valid CSV and submitting, we receive the success message in brief mode
  [chromium] › App.spec.ts:128:1 › after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after loading a different valid CSV and submitting, we receive the success message in verbose mode still
  [chromium] › App.spec.ts:157:1 › after loading valid CSV and submitting and then viewing, we see the result in brief mode
  [chromium] › App.spec.ts:175:1 › switching to verbose, viewing in verbose; switching to brief, viewing in brief
  [chromium] › App.spec.ts:202:1 › after switching to verbose and loading valid CSV and submitting and then viewing, we see the result in verbose mode
  [chromium] › App.spec.ts:223:1 › after switching to verbose and loading valid CSV and viewing and then loading a different valid CSV and viewing, we get the correct tables for both views
  [chromium] › App.spec.ts:256:1 › viewing without first loading a valid CSV; viewing without loading a valid CSV
  [chromium] › App.spec.ts:279:1 › after loading valid CSV and submitting and then doing valid search by column index, we see the result in brief mode
  [chromium] › App.spec.ts:297:1 › after loading valid CSV and submitting and then doing valid search by column name, we see the result in brief mode
  [chromium] › App.spec.ts:315:1 › after loading valid CSV and submitting and then doing invalid search without enough arguments, we see the error result in brief mode
  [chromium] › App.spec.ts:333:1 › when searching without loaded data, we see the error result in brief mode
  [chromium] › App.spec.ts:344:1 › after loading valid CSV and submitting and then doing search but query doesn't exist in specified column, we see the error result in brief mode
  [chromium] › App.spec.ts:362:1 › after switching to verbose, loading valid CSV, and submitting and then doing valid search by column index, we see the result in verbose mode
  [chromium] › App.spec.ts:383:1 › after switching to verbose, loading valid CSV, and submitting and then doing valid search by column name, we see the result in verbose mode
  [chromium] › App.spec.ts:404:1 › after switching to verbose, loading valid CSV, and submitting and then doing invalid search without enough arguments, we see the error result in verbose mode
  [chromium] › App.spec.ts:425:1 › after switching to verbose, when searching without loaded data, we see the error result in verbose mode
  [chromium] › App.spec.ts:441:1 › after switching to verbose, loading valid CSV, and submitting and then doing search but query doesn't exist in specified column, we see the error result in verbose mode
  [chromium] › App.spec.ts:464:1 › load, view, and search valid CSV in brief; then switch to verbose and load new CSV, search, and view (all valid searches)
  [chromium] › App.spec.ts:501:1 › not giving one of the listed commands
  [chromium] › App.spec.ts:512:1 › giving one of the listed commands but without the required arguments (i.e. no filepath for load)
  [chromium] › App.spec.ts:525:1 › giving one of the listed commands but without the required arguments (i.e. no column ID or query for search)
  [chromium] › App.spec.ts:538:1 › not giving one of the listed commands in verbose
  [chromium] › App.spec.ts:552:1 › giving one of the listed commands but without the required arguments (i.e. no filepath for load) in verbose
  [chromium] › App.spec.ts:568:1 › giving one of the listed commands but without the required arguments (i.e. no column ID or query for search) in verbose
  [chromium] › App.spec.ts:584:1 › after loading valid CSV and submitting and then doing search but returning empty search result
  [chromium] › pw-default-example.spec.ts:6:1 › has title
  [chromium] › pw-default-example.spec.ts:13:1 › get started link
  [firefox] › App.spec.ts:5:1 › on page load, i see a command
  [firefox] › App.spec.ts:10:1 › after I type into the input box, its text changes
  [firefox] › App.spec.ts:20:1 › on page load, i see a button
  [firefox] › App.spec.ts:25:1 › after I click the button, its label increments
  [firefox] › App.spec.ts:36:1 › after loading valid CSV and submitting, we receive the success message in brief mode
  [firefox] › App.spec.ts:51:1 › after loading invalid CSV and submitting, we receive the error message in brief mode
  [firefox] › App.spec.ts:64:1 › after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode
  [firefox] › App.spec.ts:82:1 › after switching to verbose and loading invalid CSV and submitting, we receive the error message in verbose mode
  [firefox] › App.spec.ts:98:1 › after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after switching to brief and loading a different valid CSV and submitting, we receive the success message in brief mode
  [firefox] › App.spec.ts:128:1 › after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after loading a different valid CSV and submitting, we receive the success message in verbose mode still
  [firefox] › App.spec.ts:157:1 › after loading valid CSV and submitting and then viewing, we see the result in brief mode
  [firefox] › App.spec.ts:175:1 › switching to verbose, viewing in verbose; switching to brief, viewing in brief
  [firefox] › App.spec.ts:202:1 › after switching to verbose and loading valid CSV and submitting and then viewing, we see the result in verbose mode
  [firefox] › App.spec.ts:223:1 › after switching to verbose and loading valid CSV and viewing and then loading a different valid CSV and viewing, we get the correct tables for both views
  [firefox] › App.spec.ts:256:1 › viewing without first loading a valid CSV; viewing without loading a valid CSV
  [firefox] › App.spec.ts:279:1 › after loading valid CSV and submitting and then doing valid search by column index, we see the result in brief mode
  [firefox] › App.spec.ts:297:1 › after loading valid CSV and submitting and then doing valid search by column name, we see the result in brief mode
  [firefox] › App.spec.ts:315:1 › after loading valid CSV and submitting and then doing invalid search without enough arguments, we see the error result in brief mode
  [firefox] › App.spec.ts:333:1 › when searching without loaded data, we see the error result in brief mode
  [firefox] › App.spec.ts:344:1 › after loading valid CSV and submitting and then doing search but query doesn't exist in specified column, we see the error result in brief mode
  [firefox] › App.spec.ts:362:1 › after switching to verbose, loading valid CSV, and submitting and then doing valid search by column index, we see the result in verbose mode
  [firefox] › App.spec.ts:383:1 › after switching to verbose, loading valid CSV, and submitting and then doing valid search by column name, we see the result in verbose mode
  [firefox] › App.spec.ts:404:1 › after switching to verbose, loading valid CSV, and submitting and then doing invalid search without enough arguments, we see the error result in verbose mode
  [firefox] › App.spec.ts:425:1 › after switching to verbose, when searching without loaded data, we see the error result in verbose mode
  [firefox] › App.spec.ts:441:1 › after switching to verbose, loading valid CSV, and submitting and then doing search but query doesn't exist in specified column, we see the error result in verbose mode
  [firefox] › App.spec.ts:464:1 › load, view, and search valid CSV in brief; then switch to verbose and load new CSV, search, and view (all valid searches)
  [firefox] › App.spec.ts:501:1 › not giving one of the listed commands
  [firefox] › App.spec.ts:512:1 › giving one of the listed commands but without the required arguments (i.e. no filepath for load)
  [firefox] › App.spec.ts:525:1 › giving one of the listed commands but without the required arguments (i.e. no column ID or query for search)
  [firefox] › App.spec.ts:538:1 › not giving one of the listed commands in verbose
  [firefox] › App.spec.ts:552:1 › giving one of the listed commands but without the required arguments (i.e. no filepath for load) in verbose
  [firefox] › App.spec.ts:568:1 › giving one of the listed commands but without the required arguments (i.e. no column ID or query for search) in verbose
  [firefox] › App.spec.ts:584:1 › after loading valid CSV and submitting and then doing search but returning empty search result
  [firefox] › pw-default-example.spec.ts:6:1 › has title
  [firefox] › pw-default-example.spec.ts:13:1 › get started link
  [webkit] › App.spec.ts:5:1 › on page load, i see a command
  [webkit] › App.spec.ts:10:1 › after I type into the input box, its text changes
  [webkit] › App.spec.ts:20:1 › on page load, i see a button
  [webkit] › App.spec.ts:25:1 › after I click the button, its label increments
  [webkit] › App.spec.ts:36:1 › after loading valid CSV and submitting, we receive the success message in brief mode
  [webkit] › App.spec.ts:51:1 › after loading invalid CSV and submitting, we receive the error message in brief mode
  [webkit] › App.spec.ts:64:1 › after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode
  [webkit] › App.spec.ts:82:1 › after switching to verbose and loading invalid CSV and submitting, we receive the error message in verbose mode
  [webkit] › App.spec.ts:98:1 › after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after switching to brief and loading a different valid CSV and submitting, we receive the success message in brief mode
  [webkit] › App.spec.ts:128:1 › after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after loading a different valid CSV and submitting, we receive the success message in verbose mode still
  [webkit] › App.spec.ts:157:1 › after loading valid CSV and submitting and then viewing, we see the result in brief mode
  [webkit] › App.spec.ts:175:1 › switching to verbose, viewing in verbose; switching to brief, viewing in brief
  [webkit] › App.spec.ts:202:1 › after switching to verbose and loading valid CSV and submitting and then viewing, we see the result in verbose mode
  [webkit] › App.spec.ts:223:1 › after switching to verbose and loading valid CSV and viewing and then loading a different valid CSV and viewing, we get the correct tables for both views
  [webkit] › App.spec.ts:256:1 › viewing without first loading a valid CSV; viewing without loading a valid CSV
  [webkit] › App.spec.ts:279:1 › after loading valid CSV and submitting and then doing valid search by column index, we see the result in brief mode
  [webkit] › App.spec.ts:297:1 › after loading valid CSV and submitting and then doing valid search by column name, we see the result in brief mode
  [webkit] › App.spec.ts:315:1 › after loading valid CSV and submitting and then doing invalid search without enough arguments, we see the error result in brief mode
  [webkit] › App.spec.ts:333:1 › when searching without loaded data, we see the error result in brief mode
  [webkit] › App.spec.ts:344:1 › after loading valid CSV and submitting and then doing search but query doesn't exist in specified column, we see the error result in brief mode
  [webkit] › App.spec.ts:362:1 › after switching to verbose, loading valid CSV, and submitting and then doing valid search by column index, we see the result in verbose mode
  [webkit] › App.spec.ts:383:1 › after switching to verbose, loading valid CSV, and submitting and then doing valid search by column name, we see the result in verbose mode
  [webkit] › App.spec.ts:404:1 › after switching to verbose, loading valid CSV, and submitting and then doing invalid search without enough arguments, we see the error result in verbose mode
  [webkit] › App.spec.ts:425:1 › after switching to verbose, when searching without loaded data, we see the error result in verbose mode
  [webkit] › App.spec.ts:441:1 › after switching to verbose, loading valid CSV, and submitting and then doing search but query doesn't exist in specified column, we see the error result in verbose mode
  [webkit] › App.spec.ts:464:1 › load, view, and search valid CSV in brief; then switch to verbose and load new CSV, search, and view (all valid searches)
  [webkit] › App.spec.ts:501:1 › not giving one of the listed commands
  [webkit] › App.spec.ts:512:1 › giving one of the listed commands but without the required arguments (i.e. no filepath for load)
  [webkit] › App.spec.ts:525:1 › giving one of the listed commands but without the required arguments (i.e. no column ID or query for search)
  [webkit] › App.spec.ts:538:1 › not giving one of the listed commands in verbose
  [webkit] › App.spec.ts:552:1 › giving one of the listed commands but without the required arguments (i.e. no filepath for load) in verbose
  [webkit] › App.spec.ts:568:1 › giving one of the listed commands but without the required arguments (i.e. no column ID or query for search) in verbose
  [webkit] › App.spec.ts:584:1 › after loading valid CSV and submitting and then doing search but returning empty search result
  [webkit] › pw-default-example.spec.ts:6:1 › has title
  [webkit] › pw-default-example.spec.ts:13:1 › get started link

# How To:
## RUN TESTS:
Command: npx playwright test

## VALID COMMANDS:
load_file "filepath"
view
search "identifier" "tosearch"
mode

## RUN PROGRAM:
Command: npm start

# CITED RESOURCES
For TS/React/HTML/CSS
- https://www.typescriptlang.org/docs/handbook/2/narrowing.html 
- https://www.youtube.com/watch?v=d56mG7DezGs 
- https://www.youtube.com/watch?v=W6NZfCO5SIk&t=2566s 

For Playwright
- https://www.youtube.com/watch?v=dLj0U6BgWuw 
- https://www.youtube.com/watch?v=tpfYf0sJoP0
- https://www.youtube.com/watch?v=Xz6lhEzgI5I
- https://playwrightsolutions.com/is-there-a-way-to-list-all-the-playwright-tests-without-running-them/ 
- https://playwright.dev/docs/locators 