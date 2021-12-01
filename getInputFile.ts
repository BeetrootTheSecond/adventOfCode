require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const fse = require("fs-extra");

//get agurments
const year: string | undefined = process.env.YEAR;
let day: string | undefined = process.env.DAY;

if (day == undefined) {
  day = new Date(Date.now()).getDate().toString();
}

const outputPath = `./${year}/${day}/input.txt`;

//get file
const cookie: string =
  "session=53616c7465645f5f060e7e5f2b95a95dbfbfe4d3fc56671ec29cfaae82f9090a7b194c987b024dcfba09c4ffc2c75820"; //set this from the login session

const getFile = async function (): Promise<void> {
  await axios
    .get(`https://adventofcode.com/${year}/day/${day}/input`, {
      headers: {
        Cookie: cookie,
      },
    })
    .then((response: any) => {
      fse.outputFileSync(`./${year}/${day}/input.txt`, response.data);
    })
    .catch((error: any) => {
      console.log(error);
    });
}; //();

(async () => {
  if (fs.existsSync(outputPath)) {
    //file exists
    console.log("File already exists");
  } else {
    await getFile();
  }
})();
