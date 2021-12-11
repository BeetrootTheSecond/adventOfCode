import fs from "fs";

let testData = false;

let fileLocation: string = "2021/7/input.txt";
if (testData) {
  fileLocation = "2021/7/testData.txt";
}

//load Data
let data: number[] = fs
  .readFileSync(fileLocation)
  .toString()
  .split("\n")[0]
  .split(",")
  .map((crab) => parseInt(crab));

let minH = Math.min(...data);
let maxH = Math.max(...data);

console.log(["min", minH, "max", maxH]);

let fuelCost = [...new Array(maxH - minH)].map((value, index) =>
  data
    .map((crab) => Math.abs(crab - index))
    .reduce((total, crab) => total + crab, 0)
);

//console.log(fuelCost);
let minFuelCost = Math.min(...fuelCost);

console.log(["Star One ", minFuelCost]);

//Star Two
let fuelCostPart2 = [...new Array(maxH - minH)].map((value, index) =>
  data
    .map((crab) => Math.abs(crab - index))
    .map((crab) => {
      let result = 0;
      while (crab > 0) {
        result += crab;
        crab -= 1;
      }
      return result;
    })
    .reduce((total, crab) => total + crab, 0)
);
//console.log(fuelCostPart2);
let minFuelCostpart2 = Math.min(...fuelCostPart2);
console.log(["Star Two ", minFuelCostpart2]);
