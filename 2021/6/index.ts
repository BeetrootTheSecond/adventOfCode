import fs from "fs";

let testData = false;

let fileLocation: string = "2021/6/input.txt";
if (testData) {
  fileLocation = "2021/6/testData.txt";
}

//load Data
let data = fs
  .readFileSync(fileLocation)
  .toString()
  .split("\n")[0]
  .split(",")
  .map((fish) => parseInt(fish));

const anotherDay = (fishes: number[]) => {
  return fishes
    .map((fish: number) => {
      if (fish == 0) {
        return [6, 8];
      }
      return fish - 1;
    })
    .flat();
};

console.log(["Day 0", data]);

let starOneFish: number[] = data;
for (let i = 0; i < 80; i++) {
  starOneFish = anotherDay(starOneFish);
  console.log([`Day ${i}`, starOneFish.length]);
}
