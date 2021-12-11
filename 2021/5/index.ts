import * as fs from "fs";

let testData = true;

let fileLocation: string = "2021/5/input.txt";
if (testData) {
  fileLocation = "2021/5/testData.txt";
}

let grid: number[][];

const drawGrid = () => {
  for (let row of grid) {
    console.log(row.join(","));
  }
};

//load Data
let data = fs
  .readFileSync(fileLocation)
  .toString()
  .split("\n")
  .map((row) => row.split(" -> "))
  .map((row) =>
    row.map((cord) => cord.split(",").map((position) => parseInt(position)))
  )
  .map((line) => ({
    x1: line[0][0],
    y1: line[0][1],
    x2: line[1][0],
    y2: line[1][1],
  }))
  .flat(2);
//.map((line) => findLine(line));
console.log([data]);
const maxX = data.reduce(
  (previous, current) => Math.max(previous, current.x1, current.x2),
  0
);
const maxY = data.reduce(
  (previous, current) => Math.max(previous, current.y1, current.y2),
  0
);
console.log([maxX, maxY]);

//made maxX by maxY array of zero
grid = [...new Array(maxY + 1)].map(() =>
  [...new Array(maxX + 1)].map(() => 0)
);
//console.log(grid);
drawGrid();

// draw line on grid
data.map((line) => {
  console.log(line);
  if (line.x1 != line.x2 && line.y1 != line.y2) {
    console.log(["Diagonal", line]);
    return;
  }
  //grid[line.x1][line.y1] += 1;
  if (line.x1 != line.x2) {
    //x line
    let diff = Math.abs(line.x1 - line.x2);
    console.log(["diff", diff, line]);
    let minX = Math.min(line.x1, line.x2);
    for (let i = 0; i <= diff; i++) {
      grid[line.y1][minX + i] += 1;
    }
  } else if (line.y1 != line.y2) {
    //y line
    let diff = Math.abs(line.y1 - line.y2);
    console.log(["diff", diff, line]);
    let minY = Math.min(line.y1, line.y2);
    for (let i = 0; i <= diff; i++) {
      grid[minY + i][line.x1] += 1;
    }
  } else {
    console.log("FUCK!!!!");
  }

  drawGrid();
});

const oneStar = grid.flat(2).filter((cell) => cell >= 2).length;

console.log(["OneStar", oneStar]);
