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
  //console.log([`Day ${i}`, starOneFish.length]);
}

console.log([`Star One`, starOneFish.length]);
// let starTwoFish: number[] = data;
// for (let i = 0; i < 256; i++) {
//   starTwoFish = anotherDay(starTwoFish);
//   console.log([`Day ${i}`, starTwoFish.length]);
// }
export interface fishTracker {
  zero: number;
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
  seven: number;
  eight: number;
}

const anotherDayPart2 = (fishes: fishTracker) => {
  return {
    zero: fishes.one,
    one: fishes.two,
    two: fishes.three,
    three: fishes.four,
    four: fishes.five,
    five: fishes.six,
    six: fishes.seven + fishes.zero,
    seven: fishes.eight,
    eight: fishes.zero,
  };
};

const fishtrackerSum = (fishes: fishTracker) => {
  let result = 0;
  for (let fish in fishes) {
    result += fishes[fish as keyof fishTracker];
    //console.log(fish);
  }
  return result;
};
let starTwoFish: fishTracker = {
  zero: 0,
  one: 0,
  two: 0,
  three: 0,
  four: 0,
  five: 0,
  six: 0,
  seven: 0,
  eight: 0,
};

data.map((fish) => {
  switch (fish) {
    case 0: {
      starTwoFish.zero += 1;
      break;
    }
    case 1: {
      starTwoFish.one += 1;
      break;
    }
    case 2: {
      starTwoFish.two += 1;
      break;
    }
    case 3: {
      starTwoFish.three += 1;
      break;
    }
    case 4: {
      starTwoFish.four += 1;
      break;
    }
    case 5: {
      starTwoFish.five += 1;
      break;
    }
    case 6: {
      starTwoFish.six += 1;
      break;
    }
  }
});

//console.log(starTwoFish);
for (let i = 0; i < 256; i++) {
  starTwoFish = anotherDayPart2(starTwoFish);
  //console.log([`Day ${i}`, starTwoFish]);
}
console.log([`Star Two`, fishtrackerSum(starTwoFish)]);
