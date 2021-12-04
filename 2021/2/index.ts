import fs from "fs";

let fileTestLocation: string = "2021/2/testData.txt";
let fileLocation: string = "2021/2/input.txt";

//load Data
let data: Array<Array<string>> = fs
  .readFileSync(fileLocation)
  .toString()
  .split("\n")
  .map((row) => row.split(" "));

let horizontal: number = 0;
let depth: number = 0;

for (let i = 0; i < data.length; i++) {
  //console.log([data[i][0], data[i]]);
  switch (data[i][0][0]) {
    case "f": {
      horizontal += parseInt(data[i][1]);
      break;
    }
    case "d": {
      depth += parseInt(data[i][1]);
      break;
    }
    case "u": {
      depth -= parseInt(data[i][1]);
      break;
    }
  }
}

console.log([depth, horizontal]);
console.log("One Star", depth * horizontal);
