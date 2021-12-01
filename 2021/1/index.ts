import fs from "fs";

let fileTestLocation: string = "2021/1/testData.txt";
let fileLocation: string = "2021/1/input.txt";

const countIncrease = (d: number[]) => {
  let increaseCount: number = 0;

  for (let i = 0; i <= d.length - 1; i++) {
    //console.log([data[i], data[i - 1]]);
    if (d[i] > d[i - 1]) {
      increaseCount++;
    }
  }

  return increaseCount;
};

//load Data
let data: number[] = fs
  .readFileSync(fileLocation)
  .toString()
  .split("\n")
  .map((row) => parseInt(row));

//Star One
//How many measurements are larger than the previous measurement?
console.log(["Answer Star-One", countIncrease(data), data.length]);

//Star Two

//create arrays of three-measurement windows
//[[1,2,3].[2,3,4]...]
let threeMeasurementWindows: Array<Array<number>>;

threeMeasurementWindows = data
  .map((data, index, source) => {
    if (index < source.length - 2)
      return [source[index], source[index + 1], source[index + 2]];
    return [];
  })
  .filter((row) => row.length > 0);

console.log([threeMeasurementWindows]);
let threeMeasurementWindowsSUM: Array<number>;

threeMeasurementWindowsSUM = threeMeasurementWindows.map((window) =>
  window.reduce((a, b) => {
    return a + b;
  }, 0)
);

console.log([threeMeasurementWindowsSUM]);

console.log([
  "Answer Star-Two",
  countIncrease(threeMeasurementWindowsSUM),
  threeMeasurementWindowsSUM.length,
]);
