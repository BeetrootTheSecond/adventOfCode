import fs from "fs";

let testData = true;

let fileLocation: string = "2021/9/input.txt";
if (testData) {
  fileLocation = "2021/9/testData.txt";
}

//load Data
let data: number[][] = fs
  .readFileSync(fileLocation)
  .toString()
  .split("\n")
  .map((a) => [...a].map((a) => parseInt(a)));
console.log({ data });

let starOneSum = 0;

let filteredData = data
  .map((valueV, indexV) => {
    return valueV.filter((valueH, indexH, hData) => {
      //console.log({ valueH });

      let left = indexH - 1 >= 0 ? valueH < hData[indexH - 1] : true;
      let right = indexH + 1 < hData.length ? valueH < hData[indexH + 1] : true;
      let top = indexV - 1 >= 0 ? valueH < data[indexV - 1][indexH] : true;
      let bottom =
        indexV + 1 < data.length ? valueH < data[indexV + 1][indexH] : true;

      // console.log({
      //   indexV,
      //   indexH,
      //   left,
      //   right,
      //   top,
      //   bottom,
      //   answer: left && right && top && bottom,
      // });
      return left && right && top && bottom;
    });
  })
  .flat(2)
  .map((risk) => risk + 1);

starOneSum = filteredData.reduce((a, b) => a + b, 0);
console.log(["One Star", starOneSum]);
