const fs = require('fs');
let assert = require('node:assert');

function main() {

    try {
        const json_data = fs.readFileSync('./data/json/2022_full.json', 'utf8');
        let json = JSON.parse(json_data);

        let times = [];

        for (let item of json) {
            let finish_time = item.details.at_42_2.time_of_day; 
            if (finish_time !== null) {
                times.push(finish_time);
            }
        }

        times[times.length - 1] += ",";

        fs.writeFileSync('./data/finish_times/2022_full_finish.csv', times.join(",\n"));

      } catch (err) {
        console.error(err);
      }

}

main();