const exampleCSV1 = [
  ["1", "2", "3", "4", "5"],
  ["The", "song", "remains", "the", "same."],
];

const exampleCSV2 = [
  ["The", "song", "remains", "the", "same."],
  ["It", "really", "does", "stay", "constant."],
];

export const filepathToParsedCSVMap = new Map([
  ["./data/mock/exampleCSV1.csv", exampleCSV1],
  ["./data/mock/exampleCSV2.csv", exampleCSV2],
]);

const exampleCSV3 = [
  ["1", "2", "3", "4", "5"],
  ["The", "song", "remains", "the", "same."],
];

const exampleCSV4 = [
  ["The", "song", "remains", "the", "same."],
  ["It", "really", "does", "stay", "constant."],
];

// if not in this map, we return an error message in replinput
export const queryToSearchedCSVMap = new Map([
  ["7 Women", exampleCSV3],
  ["columnname query", exampleCSV4],
]);
