let assert = require('node:assert');
const fs = require('fs');

const YEAR = 2016;
const RACE_TYPE = "half";

function main() {

  const json_string = fs.readFileSync(`./data/json/${YEAR}_${RACE_TYPE}.json`, 'utf8');
  const json = JSON.parse(json_string);

  let csv_lines = [];

  for (let record of json) {

    let line = [];

    for (let k in record) {
      let valueOrDetails = record[k];

      if (typeof(valueOrDetails) === "object") {

        for (let detailsKey in valueOrDetails) {
          
          let detailsObject = valueOrDetails[detailsKey];

          for (let dok in detailsObject) {
            line.push( [`${detailsKey}_${dok}`, detailsObject[dok]] );

          }
        }

      } else {
        line.push( [k, valueOrDetails] );

      }
    }

    csv_lines.push(line);

  }

  let csv_data = [];
  csv_data.push( csv_lines[0].map( x => x[0] ) );

  for (let line of csv_lines) {
    csv_data.push( line.map( x => {
      if (x[1] === null) {
        return "null";
      } else {
        return x[1];
      }
    } ) );
  }

  csv_data = csv_data.map(x => x.join(",") + ",");

  fs.writeFileSync(`./data/csv/${YEAR}_${RACE_TYPE}.csv`, csv_data.join("\n"));

}

main();