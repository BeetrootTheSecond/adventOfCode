import fs from "fs";

let testData = false;

let fileLocation: string = "2021/3/input.txt";
if (testData) {
  fileLocation = "2021/3/testData.txt";
}

//load Data
let data: Array<string> = fs.readFileSync(fileLocation).toString().split("\n");

let gammaRateBinary: string = "";
let epsilonRateBinary: string = "";

let gammaRate: number = 0;
let epsilonRate: number = 0;
interface counter {
  Zero: number;
  One: number;
}

//One Star

let reorganisedData: Array<Array<String>> = [];

for (let k = 0; k < data[0].length; k++) {
  reorganisedData.push([]);
}

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    reorganisedData[j][i] = data[i][j];
  }
}

//console.log(reorganisedData);

let countedData: Array<counter> = reorganisedData.map((column) => {
  let Zero = column.filter((r) => r == "0").length;
  let One = column.length - Zero;
  return { Zero, One };
});

//console.log([countedData]);

for (let i = 0; i < countedData.length; i++) {
  let Zeros = countedData[i].Zero;
  let Ones = countedData[i].One;
  if (Zeros > Ones) {
    gammaRateBinary = gammaRateBinary + "0";
    epsilonRateBinary = epsilonRateBinary + "1";
  }
  if (Zeros < Ones) {
    gammaRateBinary = gammaRateBinary + "1";
    epsilonRateBinary = epsilonRateBinary + "0";
  }
}

//console.log([gammaRateBinary, epsilonRateBinary]);
gammaRate = parseInt(gammaRateBinary, 2);
epsilonRate = parseInt(epsilonRateBinary, 2);
//console.log([gammaRate, epsilonRate]);

console.log(["One Star", gammaRate * epsilonRate]);

//Two Star

//find positions of most popular bit return those numbers repeat;
let oxygenGeneratorString: string = "";
let CO2Scrubber: string = "";

//raw data
reorganisedData;

const mostPopular = (
  currentBitIndex: number,
  MostData: Array<string>
): string[] => {
  let ZeroCount = MostData.map((r) => r[currentBitIndex]).filter(
    (r) => r == "0"
  ).length;

  let OneCount = MostData.length - ZeroCount;
  let mostPopularCount = OneCount >= ZeroCount ? "1" : "0";

  //console.log(mostPopularCount);

  let filterList = MostData.filter(
    (r) => r[currentBitIndex] == mostPopularCount
  );
  //console.log(filterList);
  if (filterList.length > 1) {
    return mostPopular(currentBitIndex + 1, filterList);
  }
  return filterList;
};

const leastPopular = (
  currentBitIndex: number,
  LeastData: Array<string>
): string[] => {
  let ZeroCount = LeastData.map((r) => r[currentBitIndex]).filter(
    (r) => r == "0"
  ).length;

  let OneCount = LeastData.length - ZeroCount;
  let leastPopularCount = ZeroCount <= OneCount ? "0" : "1";

  //console.log(leastPopularCount);

  let filterList = LeastData.filter(
    (r) => r[currentBitIndex] == leastPopularCount
  );
  //console.log(filterList);
  if (filterList.length > 1) {
    return leastPopular(currentBitIndex + 1, filterList);
  }
  return filterList;
};

let mostPopularBinary: string[] = mostPopular(0, data);
let mostPopularNumber = parseInt(mostPopularBinary[0], 2);
//console.log(mostPopularNumber);

let leastPopularBinary: string[] = leastPopular(0, data);
let leastPopularNumber = parseInt(leastPopularBinary[0], 2);
//console.log(leastPopularNumber);

console.log(["Two Star", mostPopularNumber * leastPopularNumber]);
