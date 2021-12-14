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

//console.log(data);

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

//star Two
export interface letterCounts {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  g: number;
}

export interface segmentMatches {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
}

interface segmentLookup {
  abcefg: number;
  cf: number;
  acdeg: number;
  acdfg: number;
  bcdf: number;
  abdfg: number;
  abdefg: number;
  acf: number;
  abcdefg: number;
  abcdfg: number;
}

const solveDisplay = (display: string[][]) => {
  let counts: letterCounts = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 };
  let matches: segmentMatches = {
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
  };
  let segmentLookup = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
  };

  display[0]
    .join("")
    .split("")
    .map((letter) => {
      counts[letter as keyof letterCounts]
        ? (counts[letter as keyof letterCounts] += 1)
        : (counts[letter as keyof letterCounts] = 1);
    });

  //console.log(["letterCounts", counts]);
  /*default character lookup 
a: 8
b: 6 *
c: 8
d: 7
e: 4 *
f: 9 *
g: 7
*/
  for (let key in counts) {
    //find b match letter count 6
    if (counts[key as keyof letterCounts] == 6) {
      matches["b"] = key;
    }
    //find e match letter count 4
    else if (counts[key as keyof letterCounts] == 4) {
      matches["e"] = key;
    }
    //find f match letter count 9
    else if (counts[key as keyof letterCounts] == 9) {
      matches["f"] = key;
    }
  }

  //find c
  let numberOne = display[0].filter((output) => output.length == 2)[0];
  matches.c = numberOne.replace(matches.f, "");
  //console.log(["one", numberOne]);

  //find a
  let numberSeven = display[0].filter((output) => output.length == 3)[0];
  matches.a = numberSeven.replace(matches.f, "").replace(matches.c, "");
  //console.log(["seven", numberSeven]);

  //find g
  let numberZero = display[0]
    .filter((output) => output.length == 6)
    .filter((output) => {
      //console.log([matches.c, output]);
      return output.includes(matches.e) && output.includes(matches.c);
    })[0];
  //console.log(["zero", numberZero, matches]);
  matches.g = numberZero
    .replace(matches.a, "")
    .replace(matches.b, "")
    .replace(matches.c, "")
    .replace(matches.e, "")
    .replace(matches.f, "");

  //console.log(["zero", numberZero]);
  //find d
  let numberFour = display[0].filter((output) => output.length == 4)[0];
  matches.d = numberFour
    .replace(matches.b, "")
    .replace(matches.c, "")
    .replace(matches.f, "");
  //console.log(["four", numberFour]);

  //console.log(["segmentMatches", matches]);

  let mixedSegments: segmentMatches = {
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
  };
  for (let key in matches) {
    mixedSegments[
      matches[key as keyof segmentMatches] as keyof segmentMatches
    ] = key;
  }
  //console.log(["segmentMatches", mixedSegments]);

  //convert orgins to default
  let finalOutputs = display[1]
    .map((output) => {
      let chars = output.split("");
      let newOutput = chars
        .map((char) => mixedSegments[char as keyof segmentMatches])
        .sort()
        .join("");

      let numberlookup = segmentLookup[newOutput as keyof segmentLookup];
      //console.log([output, newOutput, numberlookup]);
      return numberlookup;
    })
    .join("");
  //console.log([parseInt(finalOutputs)]);
  return parseInt(finalOutputs);
};

let displayAnswers = data.map((display) => solveDisplay(display));
let starTwo = displayAnswers.reduce((a, b) => a + b, 0);
console.log(["Star Two", starTwo]);

/* 0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    cmixedSegments
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg */

/*default character lookup 
a: 8
b: 6
c: 8
d: 7
e: 4
f: 9
g: 7


dddd
e    .
e    .
 ffff
.    b
.    b
 cccc


 aaaa 
 b    .
 b    .
  dddd 
 .    f
 .    f
  gggg 
*/
