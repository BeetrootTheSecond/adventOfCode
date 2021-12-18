import fs from "fs";

let testData = false;

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

//star two
export interface Point {
  indexH: number;
  indexV: number;
}

//find basin
const FindLowPoints = (points: string[]) => {
  return points
    .map((point) => {
      let newpoints = [point];
      let locations = point.split(",").map((a) => parseInt(a));
      let indexV = locations[0];
      let indexH = locations[1];
      //console.log(point);
      //left
      if (indexH - 1 >= 0) {
        if (data[indexV][indexH - 1] < 9) {
          newpoints.push(`${indexV},${indexH - 1}`);
        }
      }

      //right
      if (indexH + 1 < data[indexV].length) {
        if (data[indexV][indexH + 1] < 9) {
          newpoints.push(`${indexV},${indexH + 1}`);
        }
      }

      //top
      if (indexV - 1 >= 0) {
        if (data[indexV - 1][indexH] < 9) {
          newpoints.push(`${indexV - 1},${indexH}`);
        }
      }

      //bottom
      if (indexV + 1 < data.length) {
        if (data[indexV + 1][indexH] < 9) {
          newpoints.push(`${indexV + 1},${indexH}`);
        }
      }
      return newpoints;
    })
    .flat(2);
};

let basins = data
  .map((valveV, indexV) => {
    return valveV.map((valueH, indexH) => {
      let basinSize = 0;

      let left = indexH - 1 >= 0 ? valueH < data[indexV][indexH - 1] : true;
      let right =
        indexH + 1 < data[indexV].length
          ? valueH < data[indexV][indexH + 1]
          : true;
      let top = indexV - 1 >= 0 ? valueH < data[indexV - 1][indexH] : true;
      let bottom =
        indexV + 1 < data.length ? valueH < data[indexV + 1][indexH] : true;

      if (left && right && top && bottom) {
        // lowestPoint

        let lowPoints = [`${indexV},${indexH}`];
        let NotFoundBasin = true;
        while (NotFoundBasin) {
          lowPoints = [...new Set(FindLowPoints(lowPoints))];

          if (lowPoints.length == basinSize) {
            NotFoundBasin = false;
          }
          basinSize = lowPoints.length;
        }
      }
      //basinSize++;

      return basinSize;
    });
  })
  .flat(2)
  .filter((basin) => basin);

console.log({ basins });

basins = basins.sort((a, b) => b - a);
console.log({ basins });

let twoStarSum = basins[0] * basins[1] * basins[2];

console.log(["Two Star", twoStarSum]);
