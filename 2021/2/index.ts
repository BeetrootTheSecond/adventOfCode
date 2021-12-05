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
  switch (data[i][0]) {
    case "forward": {
      horizontal += parseInt(data[i][1]);
      break;
    }
    case "down": {
      depth += parseInt(data[i][1]);
      break;
    }
    case "up": {
      depth -= parseInt(data[i][1]);
      break;
    }
  }
}

console.log([depth, horizontal]);
console.log(["One Star", depth * horizontal]);

let horizontalTwoStar: number = 0;
let depthTwoStar: number = 0;
let aimTwoStar: number = 0;

for (let i = 0; i < data.length; i++) {
  //console.log([horizontalTwoStar, depthTwoStar, aimTwoStar]);
  //console.log([data[i][0], data[i]]);

  let value: number = parseInt(data[i][1]);
  switch (data[i][0]) {
    case "forward": {
      horizontalTwoStar += value;
      depthTwoStar += aimTwoStar * value;
      break;
    }
    case "down": {
      aimTwoStar += value;
      break;
    }
    case "up": {
      aimTwoStar -= value;
      break;
    }
  }
}

console.log([depthTwoStar, horizontalTwoStar]);
console.log(["Two Star", depthTwoStar * horizontalTwoStar]);
