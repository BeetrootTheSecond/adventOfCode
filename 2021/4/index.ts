import { BlobOptions } from "buffer";
import fs from "fs";

let testData = false;

let fileLocation: string = "2021/4/input.txt";
if (testData) {
  fileLocation = "2021/4/testData.txt";
}

//load Data
let data: string[] = fs.readFileSync(fileLocation).toString().split("\n");

console.log(data);

//One Star
const bingoNumbers: number[] = data[0]
  .split(",")
  .map((bingoCall) => parseInt(bingoCall));

console.log(bingoNumbers);

function chunk(_data: Array<string>, chunkSize: number) {
  var R = [];
  for (var i = 0; i < _data.length; i += chunkSize)
    R.push(_data.slice(i, i + chunkSize));
  return R;
}

let bingoCardString = data;
bingoCardString.splice(0, 2);
bingoCardString = bingoCardString.filter((cardRow) => cardRow);
//console.log(bingoCardString);

let bingoCards: number[][][] = chunk(bingoCardString, 5).map(
  (cardRows: any[]) =>
    cardRows.map((row) =>
      row
        .trim()
        .replace(/(  )/gm, " ")
        .split(" ")
        .map((cell: any) => parseInt(cell))
    )
);
console.log(bingoCards[0]);
let StarOneFound = false;

bingoNumbers.map((CallNumber) => {
  console.log(CallNumber);
  bingoCards.map((Card, cardID) => {
    Card.map((row) => {
      let foundCall = row.findIndex((e, i) => e == CallNumber);
      if (foundCall != -1) {
        //console.log(["found", foundCall]);
        row[foundCall] = -1;
        //check for line
        const sum = row.reduce((partial_sum, a) => partial_sum + a, 0);
        if (sum == -5) {
          //console.log(["ROW", cardID]);
          let sumOfUnmarked = calculateUnmarkedSum(Card);
          if (StarOneFound == false) {
            console.log(["One Star", sumOfUnmarked * CallNumber]);
            StarOneFound = true;
          }
        }
      }
    });

    for (let i = 0; i < 5; i++) {
      //check for column
      const sum = Card.reduce(
        (partial_sum: number, a) => partial_sum + a[i],
        0
      );
      if (sum == -5) {
        //console.log(["Column", cardID]);
        let sumOfUnmarked = calculateUnmarkedSum(Card);
        if (StarOneFound == false) {
          console.log(["One Star", sumOfUnmarked * CallNumber]);
          StarOneFound = true;
        }
      }
    }
  });
});

function calculateUnmarkedSum(BingoCard: number[][]) {
  let card = BingoCard.reduce((acc, val) => acc.concat(val), [])
    .filter((cell) => cell > 0)
    .reduce((partial_sum: number, a: number) => partial_sum + a, 0);
  return card;
}
