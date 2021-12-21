import fs from "fs";
import { isConstructorDeclaration, isOptionalTypeNode } from "typescript";

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
  corruptedIndex: number[];
}
let mismakedCount = {
  ")": 0,
  "]": 0,
  "}": 0,
  ">": 0,
  corruptedIndex: new Array(),
};

data.map((row, index) => {
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
          mismakedCount.corruptedIndex.push(index);
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
          mismakedCount[symbol as keyof mismaked]++;
          mismakedCount.corruptedIndex.push(index);
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
          mismakedCount[symbol as keyof mismaked]++;
          mismakedCount.corruptedIndex.push(index);
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
          mismakedCount[symbol as keyof mismaked]++;
          mismakedCount.corruptedIndex.push(index);
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

let part2Data = data.filter(
  (row, index) => !mismakedCount.corruptedIndex.find((C) => C == index)
);

console.log({ part2Data: part2Data.length, Data: data.length });

let part2Chunks = part2Data.map((row, index) => {
  let chunks: string[] = [];
  for (let symbol of row) {
    //console.log(["chunk", chunks]);
    let previousSymbol = chunks.pop() || "";

    switch (previousSymbol) {
      case "(": {
        if (symbol == ")") {
          //matched
        } else {
          chunks.push(previousSymbol);

          chunks.push(symbol);
        }

        break;
      }
      case "[": {
        if (symbol == "]") {
          //matched
        } else {
          chunks.push(previousSymbol);

          chunks.push(symbol);
        }
        break;
      }
      case "{": {
        if (symbol == "}") {
          //matched
        } else {
          chunks.push(previousSymbol);

          chunks.push(symbol);
        }
        break;
      }
      case "<": {
        if (symbol == ">") {
          //matched
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
  return chunks;
});

//console.log({ part2Chunks });
const symbolLookup = (symbol: string) => {
  switch (symbol) {
    case "(": {
      return 1;
      break;
    }
    case "[": {
      return 2;
      break;
    }
    case "{": {
      return 3;
      break;
    }
    case "<": {
      return 4;
      break;
    }
    default: {
      console.log(["Error", symbol]);
      return -1;
    }
  }
};

let part2Score = part2Chunks.map((chunk) =>
  chunk.reverse().reduce((a, b) => a * 5 + symbolLookup(b), 0)
);

console.log({ part2Score });

part2Score = part2Score.sort((a, b) => a - b);

let middleElementPart2 = part2Score[Math.floor(part2Score.length / 2)];
console.log(["Two Star", middleElementPart2]);
