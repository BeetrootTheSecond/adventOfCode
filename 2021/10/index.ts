import fs from "fs";
import { isOptionalTypeNode } from "typescript";

let testData = false;

let fileLocation: string = "2021/10/input.txt";
if (testData) {
  fileLocation = "2021/10/testData.txt";
}

//load Data
let data = fs
  .readFileSync(fileLocation)
  .toString()
  .split("\n")
  .map((row) => [...row]);

//console.log(data);

export interface symbolLookup {
  Open: string;
  Close: string;
  value: number;
}

let symbols = [
  { Open: "(", Close: ")", Value: 3 },
  { Open: "[", Close: "]", Value: 57 },
  { Open: "{", Close: "}", Value: 1197 },
  { Open: "<", Close: ">", Value: 25137 },
];

const closed = (symbol: string) => {
  return symbol == ")" || symbol == "]" || symbol == "}" || symbol == ">";
};

let oneStarSum = 0;

export interface mismaked {
  ")": number;
  "]": number;
  "}": number;
  ">": number;
}
let mismakedCount = { ")": 0, "]": 0, "}": 0, ">": 0 };

data.map((row) => {
  let chunks: string[] = [];
  for (let symbol of row) {
    //console.log(["chunk", chunks]);
    let previousSymbol = chunks.pop() || "";

    switch (previousSymbol) {
      case "(": {
        if (symbol == ")") {
          //matched
        } else if (closed(symbol)) {
          //Error mismatched
          //oneStarSum += 3;
          mismakedCount[symbol as keyof mismaked]++;
        } else {
          chunks.push(previousSymbol);

          chunks.push(symbol);
        }

        break;
      }
      case "[": {
        if (symbol == "]") {
          //matched
        } else if (closed(symbol)) {
          //Error mismatched
          //oneStarSum += 57;
          mismakedCount[symbol as keyof mismaked]++;
        } else {
          chunks.push(previousSymbol);

          chunks.push(symbol);
        }
        break;
      }
      case "{": {
        if (symbol == "}") {
          //matched
        } else if (closed(symbol)) {
          //Error mismatched
          //oneStarSum += 1197;
          mismakedCount[symbol as keyof mismaked]++;
        } else {
          chunks.push(previousSymbol);

          chunks.push(symbol);
        }
        break;
      }
      case "<": {
        if (symbol == ">") {
          //matched
        } else if (closed(symbol)) {
          //Error mismatched
          //oneStarSum += 25137;
          mismakedCount[symbol as keyof mismaked]++;
        } else {
          chunks.push(previousSymbol);

          chunks.push(symbol);
        }
        break;
      }
      default: {
        if (previousSymbol != "") {
          chunks.push(previousSymbol);
        }
        chunks.push(symbol);
      }
    }
  }
});

oneStarSum += mismakedCount[")"] * 3;
oneStarSum += mismakedCount["]"] * 57;
oneStarSum += mismakedCount["}"] * 1197;
oneStarSum += mismakedCount[">"] * 25137;

console.log(["Star One", oneStarSum, mismakedCount]);
