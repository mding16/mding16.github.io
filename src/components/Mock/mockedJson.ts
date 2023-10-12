/**
 * Mocked JSON files 
 */
const exampleCSV1 = [
  ["blueberry", "pineapple", "banana"],
  ["1", "2", "3"],
  ["this", "song", "remains"],
];

const exampleCSV2 = [
  ["The", "Songs", "remain", "the", "same."],
  ["It", "really", "does", "stay", "constant."],
  ["Songs", "are", "really", "the", "vibe."],
];

const exampleCSV3 = [
  [
    "IPEDS Race",
    "ID Year",
    "Year",
    "ID University",
    "University",
    "Completions",
    "Slug University",
    "share",
    "Sex",
    "ID Sex",
  ],
  [
    "Asian",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "214",
    "brown-university",
    "0.069233258",
    "Men",
    "1",
  ],
  [
    "Black or African American",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "77",
    "brown-university",
    "0.024911032",
    "Men",
    "1",
  ],
  [
    "Native Hawaiian or Other Pacific Islanders",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "3",
    "brown-university",
    "0.00097056",
    "Men",
    "1",
  ],
  [
    "Hispanic or Latino",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "143",
    "brown-university",
    "0.046263345",
    "Men",
    "1",
  ],
  [
    "Two or More Races",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "58",
    "brown-university",
    "0.018764154",
    "Men",
    "1",
  ],
  [
    "American Indian or Alaska Native",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "4",
    "brown-university",
    "0.00129408",
    "Men",
    "1",
  ],
  [
    "Non-resident Alien",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "327",
    "brown-university",
    "0.105791006",
    "Men",
    "1",
  ],
  [
    "White",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "691",
    "brown-university",
    "0.223552248",
    "Men",
    "1",
  ],
  [
    "Asian",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "235",
    "brown-university",
    "0.076027176",
    "Women",
    "2",
  ],
  [
    "Black or African American",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "95",
    "brown-university",
    "0.03073439",
    "Women",
    "2",
  ],
  [
    "Native Hawaiian or Other Pacific Islanders",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "4",
    "brown-university",
    "0.00129408",
    "Women",
    "2",
  ],
  [
    "Hispanic or Latino",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "207",
    "brown-university",
    "0.066968619",
    "Women",
    "2",
  ],
  [
    "Two or More Races",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "85",
    "brown-university",
    "0.027499191",
    "Women",
    "2",
  ],
  [
    "American Indian or Alaska Native",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "7",
    "brown-university",
    "0.002264639",
    "Women",
    "2",
  ],
  [
    "Non-resident Alien",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "281",
    "brown-university",
    "0.090909091",
    "Women",
    "2",
  ],
  [
    "White",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "660",
    "brown-university",
    "0.213523132",
    "Women",
    "2",
  ],
];

export const filepathToParsedCSVMap = new Map([
  ["./data/mock/exampleCSV1.csv", exampleCSV1],
  ["./data/mock/exampleCSV2.csv", exampleCSV2],
  ["./data/mock/exampleCSV3.csv", exampleCSV3],
]);

const result0CSV1 = [["blueberry", "pineapple", "banana"]];
const result1CSV1 = [["1", "2", "3"]];
const result2CSV1 = [["this", "song", "remains"]];

const result0CSV2 = [["The", "Songs", "remain", "the", "same."]];
const result01CSV2 = [
  ["The", "Songs", "remain", "the", "same."],
  ["Songs", "are", "really", "the", "vibe."],
];
const result1CSV2 = [["It", "really", "does", "stay", "constant."]];
const result2CSV2 = [["Songs", "are", "really", "the", "vibe."]];

const resultCSV3 = [
  [
    "Asian",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "235",
    "brown-university",
    "0.076027176",
    "Women",
    "2",
  ],
  [
    "Black or African American",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "95",
    "brown-university",
    "0.03073439",
    "Women",
    "2",
  ],
  [
    "Native Hawaiian or Other Pacific Islanders",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "4",
    "brown-university",
    "0.00129408",
    "Women",
    "2",
  ],
  [
    "Hispanic or Latino",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "207",
    "brown-university",
    "0.066968619",
    "Women",
    "2",
  ],
  [
    "Two or More Races",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "85",
    "brown-university",
    "0.027499191",
    "Women",
    "2",
  ],
  [
    "American Indian or Alaska Native",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "7",
    "brown-university",
    "0.002264639",
    "Women",
    "2",
  ],
  [
    "Non-resident Alien",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "281",
    "brown-university",
    "0.090909091",
    "Women",
    "2",
  ],
  [
    "White",
    "2020",
    "2020",
    "217156",
    "Brown University",
    "660",
    "brown-university",
    "0.213523132",
    "Women",
    "2",
  ],
];

// if not in this map, we return an error message in replinput
export const queryToSearchedCSVMap = new Map([
  // valid searches for example CSV 1
  ["blueberry blueberry", result0CSV1],
  ["pineapple pineapple", result0CSV1],
  ["banana banana", result0CSV1],
  ["blueberry 1", result1CSV1],
  ["pineapple 2", result1CSV1],
  ["banana 3", result1CSV1],
  ["blueberry this", result2CSV1],
  ["pineapple song", result2CSV1],
  ["banana remains", result2CSV1],

  ["0 blueberry", result0CSV1],
  ["1 pineapple", result0CSV1],
  ["2 banana", result0CSV1],
  ["0 1", result1CSV1],
  ["1 2", result1CSV1],
  ["2 3", result1CSV1],
  ["0 this", result2CSV1],
  ["1 song", result2CSV1],
  ["2 remains", result2CSV1],

  // valid searches for example CSV 2
  ["The The", result0CSV2],
  ["Songs Songs", result0CSV2],
  ["remain remain", result0CSV2],
  ["the the", result01CSV2], // different
  ["same. same.", result0CSV2],
  ["The It", result1CSV2],
  ["Songs really", result1CSV2],
  ["remain does", result1CSV2],
  ["the stay", result1CSV2],
  ["same. constant.", result1CSV2],
  ["The Songs", result2CSV2],
  ["Songs are", result2CSV2],
  ["remain really", result2CSV2],
  ["the the", result01CSV2], // different
  ["same. vibe.", result2CSV2],

  ["0 The", result0CSV2],
  ["1 Songs", result0CSV2],
  ["2 remain", result0CSV2],
  ["3 the", result01CSV2], // different
  ["4 same.", result0CSV2],
  ["0 It", result1CSV2],
  ["1 really", result1CSV2],
  ["2 does", result1CSV2],
  ["3 stay", result1CSV2],
  ["4 constant.", result1CSV2],
  ["0 Songs", result2CSV2],
  ["1 are", result2CSV2],
  ["2 really", result2CSV2],
  ["3 the", result01CSV2], // different
  ["4 vibe.", result2CSV2],

  // an example valid search for example CSV 3
  ["8 Women", resultCSV3],
]);
