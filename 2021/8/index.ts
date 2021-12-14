import fs from "fs";

let testData = false;

let fileLocation: string = "2021/8/input.txt";
if (testData) {
  fileLocation = "2021/8/testData.txt";
}

//load Data
let data = fs
  .readFileSync(fileLocation)
  .toString()
  .split("\n")
  .map((row) => row.split("|").map((cells) => cells.split(" ")));

console.log(data);

const starOneOutput = data
  .map((row) =>
    row[1].filter(
      (display) =>
        display.length == 2 ||
        display.length == 3 ||
        display.length == 4 ||
        display.length == 7
    )
  )
  .flat(2).length;

console.log(["Star One", starOneOutput]);
