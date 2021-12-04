import fs from "fs";

let fileTestLocation: string = "2021/3/testData.txt";
let fileLocation: string = "2021/3/input.txt";

//load Data
let data: Array<string> = fs.readFileSync(fileLocation).toString().split("\n");
//.map((row) => parseInt(row));

let gammaRateBinary: string = "";
let epsilonRateBinary: string = "";

let gammaRate: number = 0;
let epsilonRate: number = 0;

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

console.log(reorganisedData);

interface counter {
  Zero: number;
  One: number;
}
let countedData: Array<counter> = reorganisedData.map((column) => {
  let Zero = column.filter((r) => r == "0").length;
  let One = column.length - Zero;
  return { Zero, One };
});

console.log([countedData]);

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

console.log([gammaRateBinary, epsilonRateBinary]);
gammaRate = parseInt(gammaRateBinary, 2);
epsilonRate = parseInt(epsilonRateBinary, 2);
console.log([gammaRate, epsilonRate]);

console.log(["One Star", gammaRate * epsilonRate]);
