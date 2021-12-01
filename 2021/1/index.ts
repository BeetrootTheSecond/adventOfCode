import fs from "fs";

let fileTestLocation: string = "2021/1/testData.txt";
let fileLocation: string = "2021/1/input.txt";

//load Data
let data: number[] = fs
  .readFileSync(fileLocation)
  .toString()
  .split("\n")
  .map((row) => parseInt(row));

//Star One
//How many measurements are larger than the previous measurement?
let measureCount = 0;
for (let i = 0; i <= data.length - 1; i++) {
  //console.log([data[i], data[i - 1]]);
  if (data[i] > data[i - 1]) {
    measureCount++;
  }
}

console.log(["Answer Star-One", measureCount, data.length]);
