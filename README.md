# Mock-azhou76-mding16
# Project details
Project name: Mock <br>
Team members: mding16, azhou76  <br>
Time took: 16 hours  <br>
Repo link: https://github.com/cs0320-f23/mock-azhou76-mding16.git 


# Design choices
- The top level of our app is App.tsx 
- Within the app is a REPL that contains two main components (REPLInput and REPLHistory) that share a history state. 
- We do all the processing of commands in the REPLInput and the outputting of command history in REPLHistory. REPLInput has two child components LoadStatus and ModeStatus that take in props on the current status and return JSX elements that share this with the user. 

General Structure:
REPL: <br>
1. REPLInput (processing all user commands and adding it to history)  <br>
1.1 Mode Status (showing whether you are in brief or verbose mode) <br>
1.2 Load Status (showing which file (if any) is currently loaded)  <br>

2. REPLHistory (returning the history of commands, stored as an array of JSX elements) <br>
2.1 Left side shows the list of valid commands for better user accessibility <br>
2.2 Right side shows command history <br>

# Tests
- We used playwright for our tests. We mocked csv json objects to test our load, view, and search. 
- We wrote several different csv objects (using an array of string arrays) that reflected various shapes/sizes. 
- We created a hashmap that maps filenames to the csv object so we can mock load/view/search
- We created a hashmap that maps search queries to the search result (also in an array of string arrays) so we can mock search 
- Invalid searches/invalid filenames are entries that do not exist in these maps -> so will produce an error that we consider on the frontend
- To see a list of all our tests: run command: npx playwright test --list

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
